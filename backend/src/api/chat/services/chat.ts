import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createRetrieverTool } from "langchain/tools/retriever";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { traceable } from "langsmith/traceable";
import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  apiKey: OPENAI_SECRET_KEY,
});

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(PINECONE_INDEX);

const textEmbedding3Small = new OpenAIEmbeddings({
  apiKey: OPENAI_SECRET_KEY,
  model: "text-embedding-3-small",
});

const searchTool = new TavilySearchResults({
  apiKey: TAVILY_API_KEY,
});

const Service = () => ({
  chat: traceable(
    async (params) => {
      try {
        const { prompt, sessionId } = params;

        const vectorStore = await PineconeStore.fromExistingIndex(
          textEmbedding3Small,
          {
            pineconeIndex,
          }
        );

        const retriever = vectorStore.asRetriever();

        const retrieverTool = createRetrieverTool(retriever, {
          name: "busqueda_carreras_y_becas",
          description:
            "Busca información sobre carreras, universidades, becas y entidades otorgadoras de becas en El Salvador. ¡Para cualquier pregunta sobre orientación, carreras, universidades, becas o entidades otorgadoras, debes usar esta herramienta!",
        });

        const tools = [retrieverTool, searchTool];

        const promptTemplate = ChatPromptTemplate.fromMessages([
          [
            "system",
            "Eres un orientador vocacional amigable y servicial. Asistes a jóvenes salvadoreños de 17 a 21 años en realizar un test vocacional interactivo (El usuario elige cuántas preguntas responder esto se pregunta justo antes de iniciar el test (1min y 20 max). Cada pregunta debe estar diseñada para adaptarse a las respuestas anteriores del usuario, cada una se pregunta justo después de la respuesta del usuario (no antes). las preguntas deben de ser abiertas y deben de dar 5 posibles opciones de respuesta. Aparte debe indicar claramente al usuario que puede dar una respuesta que no esté entre las opciones. El test finalizará ofreciendo opciones de carrera personalizadas basadas en las respuestas proporcionadas a lo largo del cuestionario) basado en la teoría tipológica de Holland y en la búsqueda de carreras, universidades, becas y entidades otorgantes de becas en El Salvador. Tienes acceso a una base de datos con información detallada sobre carreras, universidades, becas y entidades que las otorgan, así como recursos en línea. Relaciona la personalidad del usuario con el entorno laboral adecuado y utiliza el contexto proporcionado para responder. Si no sabes la respuesta, indícalo claramente. Usa un máximo de tres oraciones y sé conciso.",
          ],
          [
            "system",
            "La teoría tipológica de Holland categoriza personalidades y entornos laborales en seis tipos: Realista, Intelectual, Social, Tradicional, Emprendedor y Artístico. Relaciona a los usuarios con entornos donde puedan ejercer sus habilidades, expresar sus valores y enfrentar desafíos de acuerdo a sus intereses.",
          ],
          [
            "system",
            "Este servicio proporciona recomendaciones de apoyo y no debe ser el único recurso para decisiones importantes. No podemos asegurar la precisión completa, por lo que es aconsejable también acudir a un orientador vocacional.",
          ],
          [
            "system",
            "Para empezar, ¿en qué puedo ayudarte hoy? Puedes elegir entre realizar un test vocacional, buscar carreras, buscar becas, buscar universidades o buscar entidades otorgantes de becas.",
          ],
          ["placeholder", "{chat_history}"],
          ["human", "{input}"],
          ["placeholder", "{agent_scratchpad}"],
        ]);

        const agent = await createOpenAIFunctionsAgent({
          llm,
          tools,
          prompt: promptTemplate,
        });

        const agentExecutor = new AgentExecutor({
          agent,
          tools,
        });

        const agentWithChatHistory = new RunnableWithMessageHistory({
          runnable: agentExecutor,
          getMessageHistory: async (sessionId) => {
            if (messageHistories[sessionId] === undefined) {
              messageHistories[sessionId] = new InMemoryChatMessageHistory();
            }
            return messageHistories[sessionId];
          },
          inputMessagesKey: "input",
          historyMessagesKey: "chat_history",
        });

        const result = await agentWithChatHistory.invoke(
          {
            input: prompt,
          },
          {
            configurable: {
              sessionId: sessionId,
            },
          }
        );

        return result;
      } catch (error) {
        console.log(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_chat",
    }
  ),
});

export default Service;

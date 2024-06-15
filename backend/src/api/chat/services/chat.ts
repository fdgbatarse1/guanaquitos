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
  temperature: 0.1,
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
            "Busca información sobre carreras y becas en El Salvador. ¡Para cualquier pregunta sobre orientación, carreras o becas, debes usar esta herramienta!",
        });

        const tools = [retrieverTool, searchTool];

        const promptTemplate = ChatPromptTemplate.fromMessages([
          [
            "system",
            "Eres un consejero de orientación vocacional y de becas. Tu objetivo es ayudar a los usuarios a encontrar carreras, universidades y becas en El Salvador basándote en la teoría tipológica de Holland. Tienes acceso a una base de datos con carreras, universidades, becas y entidades que proporcionan becas, así como recursos en línea. Tus respuestas deben coincidir el tipo de personalidad del usuario con el entorno laboral adecuado y ofrecer información relevante sobre las oportunidades disponibles.",
          ],
          [
            "system",
            "La teoría tipológica de Holland categoriza personalidades y entornos laborales en seis tipos: Realista, Intelectual, Social, Tradicional, Emprendedor y Artístico. Relaciona a los usuarios con entornos donde puedan ejercer mejor sus habilidades, expresar sus valores y enfrentar desafíos de acuerdo a sus intereses.",
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

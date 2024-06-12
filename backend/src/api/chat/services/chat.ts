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
          name: "careers_and_scholarships_search",
          description:
            "Search for information about careers and scholarships in El salvador. For any questions about orientation, careers or scholarships, you must use this tool!",
        });

        const tools = [searchTool, retrieverTool];

        const promptTemplate = ChatPromptTemplate.fromMessages([
          [
            "system",
            "You are a career and scholarship guidance counselor. Your goal is to help users find careers, universities, and scholarships in El Salvador based on Holland's typological theory. You have access to a database with careers, universities, scholarships, and entities that provide scholarships, as well as online resources. Your responses should match the user's personality type with the appropriate work environment and offer relevant information on available opportunities.",
          ],
          [
            "system",
            "Holland's typological theory categorizes personalities and work environments into six types: Realistic, Intellectual, Social, Traditional, Entrepreneurial, and Artistic. Match users to environments where they can best exercise their skills, express their values, and face challenges according to their interests.",
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

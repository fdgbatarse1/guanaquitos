import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore, PineconeTranslator } from "@langchain/pinecone";
import type { AttributeInfo } from "langchain/chains/query_constructor";
import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
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

// const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

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

// const attributeInfo: AttributeInfo[] = [
//   {
//     name: "name",
//     description: "The name of the career",
//     type: "string",
//   },
// ];

const Service = () => ({
  chat: traceable(
    async (params) => {
      try {
        const { prompt, sessionId } = params;

        //   strapi.log.debug(JSON.stringify(params));

        const vectorStore = await PineconeStore.fromExistingIndex(
          textEmbedding3Small,
          {
            pineconeIndex,
          }
        );
        // const documentContents = "Brief answer";

        const retriever = vectorStore.asRetriever();

        const retrieverTool = createRetrieverTool(retriever, {
          name: "careers_and_scholarships_search",
          description:
            "Search for information about careers and scholarships in El salvador. For any questions about orientation, careers or scholarships, you must use this tool!",
        });

        const tools = [searchTool, retrieverTool];

        // const selfQueryRetriever = SelfQueryRetriever.fromLLM({
        //   llm,
        //   vectorStore,
        //   documentContents,
        //   attributeInfo,
        //   structuredQueryTranslator: new PineconeTranslator(),
        // });

        //   const query = await selfQueryRetriever.invoke(prompt);

        // const systemTemplate = "Translate the following into {language}:";

        const promptTemplate = ChatPromptTemplate.fromMessages([
          ["system", "You are a helpful assistant"],
          ["placeholder", "{chat_history}"],
          ["human", "{input}"],
          ["placeholder", "{agent_scratchpad}"],
        ]);

        // const parser = new StringOutputParser();

        const chain = promptTemplate.pipe(llm);

        // const withMessageHistory = new RunnableWithMessageHistory({
        //   runnable: chain,
        //   getMessageHistory: async (sessionId) => {
        //     if (messageHistories[sessionId] === undefined) {
        //       messageHistories[sessionId] = new InMemoryChatMessageHistory();
        //     }
        //     return messageHistories[sessionId];
        //   },
        //   inputMessagesKey: "input",
        //   historyMessagesKey: "chat_history",
        // });

        // const config = {
        //   configurable: {
        //     sessionId: sessionId,
        //   },
        // };

        const agent = await createOpenAIFunctionsAgent({
          llm,
          tools,
          prompt: promptTemplate,
        });

        const agentExecutor = new AgentExecutor({
          agent,
          tools,
        });

        const result = await agentExecutor.invoke({
          input: prompt,
        });
        // const response = await withMessageHistory.invoke(
        //   {
        //     input: prompt,
        //   },
        //   config
        // );

        // const result = await llmWithTracing.invoke("Hello, world!");

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

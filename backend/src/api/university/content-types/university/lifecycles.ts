import { traceable } from "langsmith/traceable";

import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import {
  formatField,
  formatArrayField,
  formatAddressesArrayField,
} from "../../../utils";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(PINECONE_INDEX);

const textEmbedding3Small = new OpenAIEmbeddings({
  apiKey: OPENAI_SECRET_KEY,
  model: "text-embedding-3-small",
});

export default {
  afterUpdate: traceable(
    async (event) => {
      try {
        const { result } = event;
        const { id } = result;

        const university = await strapi.entityService.findOne(
          "api::university.university",
          id,
          {
            populate: ["careers"],
          }
        );

        if (result.publishedAt) {
          const universityMetadata = {
            id: `university-${result?.id}`,
            nombre: formatField(result?.name, "desconocido"),
            acronimo: formatField(result?.acronym, "desconocido"),
            direcciones: formatAddressesArrayField(
              result?.addresses,
              "desconocidas"
            ),
            telefonos: formatArrayField(result?.phones, "desconocidos"),
            correosElectronicos: formatArrayField(
              result?.emails,
              "desconocidos"
            ),
            sitiosWeb: formatArrayField(result?.websites, "desconocidos"),
            creadoEn: formatField(result?.createdAt, "desconocido"),
            actualizadoEn: formatField(result?.updatedAt, "desconocido"),
            publicadoEn: formatField(result?.publishedAt, "desconocido"),
            localizacion: formatField(result?.locale, "desconocida"),
            universityPageContent: `Esta página proporciona información detallada de la universidad '${formatField(
              result?.name || "desconocida"
            )}', incluyendo el acrónimo, direcciones, teléfonos, correos electrónicos, sitios web y el nombre de algunas de sus carreras`,
          };

          const universityPageContent = `Nombre de la universidad:'${formatField(
            result?.name || "Desconocido"
          )}'. Acrónimo de la universidad:'${formatField(
            result?.acronym || "Desconocido"
          )}'. Direcciones:'${formatAddressesArrayField(
            result?.addresses || "Desconocidas"
          )}'. Teléfonos:'${formatArrayField(
            result?.phones || "Desconocidos"
          )}'. Correos electrónicos:'${formatArrayField(
            result?.emails || "Desconocidos"
          )}'. Sitios webs:'${formatArrayField(
            result?.websites || "Desconocidos"
          )}'. Carreras:'${formatArrayField(
            university?.careers
              ? university.careers.map((career) => ({ text: career.name }))
              : [{ text: "Desconocidas" }]
          )}'.`;

          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 0,
          });

          const docOutput = await splitter.splitDocuments([
            new Document({
              pageContent: universityPageContent,
              metadata: universityMetadata,
            }),
          ]);

          const vectorStore = await PineconeStore.fromExistingIndex(
            textEmbedding3Small,
            {
              pineconeIndex,
              maxConcurrency: 5,
            }
          );

          const ids = docOutput.map(
            (_, index) => `university-${result?.id}-${index}`
          );

          vectorStore.addDocuments(docOutput, ids);
        } else {
          const pageOneList = await pineconeIndex.listPaginated({
            prefix: `university-${result?.id}`,
          });

          const pageOneVectorIds = pageOneList.vectors.map(
            (vector) => vector.id
          );

          await pineconeIndex.deleteMany(pageOneVectorIds);
        }
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_upsert_university",
    }
  ),
  afterDelete: traceable(
    async (event) => {
      try {
        const { result } = event;
        const pageOneList = await pineconeIndex.listPaginated({
          prefix: `university-${result?.id}`,
        });

        const pageOneVectorIds = pageOneList.vectors.map((vector) => vector.id);

        await pineconeIndex.deleteMany(pageOneVectorIds);
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_delete_university",
    }
  ),
};

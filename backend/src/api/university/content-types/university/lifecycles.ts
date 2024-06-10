import { traceable } from "langsmith/traceable";

import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";

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
            id: result?.id,
            name: result?.name,
            acronym: result?.acronym,
            addresses: result?.addresses
              ? JSON.stringify(result?.addresses)
              : undefined,
            phones: result?.phones ? JSON.stringify(result?.phones) : undefined,
            emails: result?.emails ? JSON.stringify(result?.emails) : undefined,
            websites: result?.websites
              ? JSON.stringify(result?.websites)
              : undefined,
            createdAt: result?.createdAt,
            updatedAt: result?.updatedAt,
            publishedAt: result?.publishedAt,
            locale: result?.locale,
          };

          const universityPageContent = `
            Nombre de la universidad: ${result?.name || "Desconocido"}.
            Acrónimo de la universidad: ${result?.acronym || "Desconocido"}.
            Direcciones: ${
              result?.addresses
                ? JSON.stringify(result?.addresses)
                : "Desconocidas"
            },
            Teléfonos: ${
              result?.phones ? JSON.stringify(result?.phones) : "Desconocidos"
            },
            Correos electrónicos: ${
              result?.emails ? JSON.stringify(result?.emails) : "Desconocidos"
            },
            Sitios webs: ${
              result?.websites
                ? JSON.stringify(result?.websites)
                : "Desconocidos"
            },
            Carreras: ${
              university?.careers
                ? JSON.stringify(
                    university?.careers.map((career) => career.name)
                  )
                : "Desconocida"
            }.
          `;

          strapi.log.debug(JSON.stringify(result));
          strapi.log.debug(JSON.stringify(university));
          strapi.log.debug(JSON.stringify(universityMetadata));
          strapi.log.debug(JSON.stringify(universityPageContent));

          const doc = new Document({
            pageContent: universityPageContent,
            metadata: universityMetadata,
          });

          const embeddings = await textEmbedding3Small.embedDocuments([
            JSON.stringify(doc),
          ]);

          await pineconeIndex.upsert([
            {
              id: `university-${result?.id}`,
              values: embeddings[0],
              metadata: universityMetadata,
            },
          ]);
        } else {
          await pineconeIndex.deleteOne(`university-${result?.id}`);
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
        const pinecone = new Pinecone({
          apiKey: PINECONE_API_KEY,
        });
        const pineconeIndex = pinecone.Index(PINECONE_INDEX);
        await pineconeIndex.deleteOne(`university-${result?.id}`);
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

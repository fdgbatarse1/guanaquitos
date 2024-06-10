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

        const entity = await strapi.entityService.findOne(
          "api::entity.entity",
          id,
          {
            populate: ["scholarships"],
          }
        );

        if (result.publishedAt) {
          const entityMetadata = {
            id: result?.id || "unknown",
            name: result?.name || "unknown",
            acronym: result?.acronym || "unknown",
            addresses: result?.addresses
              ? JSON.stringify(result?.addresses)
              : "unknown",
            phones: result?.phones ? JSON.stringify(result?.phones) : "unknown",
            emails: result?.emails ? JSON.stringify(result?.emails) : "unknown",
            websites: result?.websites
              ? JSON.stringify(result?.websites)
              : "unknown",
            createdAt: result?.createdAt || "unknown",
            updatedAt: result?.updatedAt || "unknown",
            publishedAt: result?.publishedAt || "unknown",
            locale: result?.locale || "unknown",
          };

          const entityPageContent = `
            Nombre de la entidad: ${result?.name || "Desconocido"}.
            Acrónimo de la entidad: ${result?.acronym || "Desconocido"}.
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
            Becas: ${
              entity?.scholarships
                ? JSON.stringify(
                    entity?.scholarships.map((scholarship) => scholarship.name)
                  )
                : "Desconocida"
            }.
          `;

          strapi.log.debug(JSON.stringify(result));
          strapi.log.debug(JSON.stringify(entity));
          strapi.log.debug(JSON.stringify(entityMetadata));
          strapi.log.debug(JSON.stringify(entityPageContent));

          const doc = new Document({
            pageContent: entityPageContent,
            metadata: entityMetadata,
          });

          const embeddings = await textEmbedding3Small.embedDocuments([
            JSON.stringify(doc),
          ]);

          await pineconeIndex.upsert([
            {
              id: `entity-${result?.id}`,
              values: embeddings[0],
              metadata: entityMetadata,
            },
          ]);
        } else {
          await pineconeIndex.deleteOne(`entity-${result?.id}`);
        }
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_upsert_entity",
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
        await pineconeIndex.deleteOne(`entity-${result?.id}`);
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_delete_entity",
    }
  ),
};

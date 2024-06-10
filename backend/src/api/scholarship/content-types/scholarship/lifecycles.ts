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
      const { id } = event.result;

      const scholarship = await strapi.entityService.findOne(
        "api::scholarship.scholarship",
        id,
        {
          populate: ["entities"],
        }
      );

      try {
        const { result } = event;

        if (result.publishedAt) {
          const scholarshipMetadata = {
            id: result?.id || "unknown",
            name: result?.name || "unknown",
            country: result?.country || "unknown",
            links: result?.links ? JSON.stringify(result?.links) : "unknown",
            createdAt: result?.createdAt || "unknown",
            updatedAt: result?.updatedAt || "unknown",
            publishedAt: result?.publishedAt || "unknown",
            locale: result?.locale || "unknown",
          };

          const scholarshipPageContent = `
            Nombre de la beca: ${result?.name || "Desconocido"}.
            País de la becas: ${result?.country || "Desconocido"}.
            Tipo de la beca: ${result?.type || "Desconocido"}.
            Categoría de la beca: ${result?.category || "Desconocida"}.
            Modalidad de la beca: ${result?.modality || "Desconocida"}.
            Fecha de inicio de aplicación de la beca: ${
              result?.application_start_date || "Desconocida"
            }.
            Fecha de fin de aplicación de la beca: ${
              result?.application_final_date || "Desconocida"
            }.
            Fecha de inicio de estudios de la beca: ${
              result?.studies_start_date || "Desconocida"
            }.
            Fecha de fin de estudios de la beca: ${
              result?.studies_final_date || "Desconocida"
            }.
            Descripción de la beca: ${
              result?.description
                ? JSON.stringify(result.description)
                : "Desconocida"
            }.
            Objetivos de la beca: ${
              result?.goals ? JSON.stringify(result.goals) : "Desconocidos"
            }.
            Áreas de estudio de la beca: ${
              result?.study_areas
                ? JSON.stringify(result.study_areas)
                : "Desconocidas"
            }.
            Beneficios de la beca: ${
              result?.benefits
                ? JSON.stringify(result.benefits)
                : "Desconocidos"
            }.
            Requisitos de la beca: ${
              result?.requirements
                ? JSON.stringify(result.requirements)
                : "Desconocidos"
            }.
            Condiciones de la beca: ${
              result?.conditions
                ? JSON.stringify(result.conditions)
                : "Desconocidas"
            }.
            Como aplicar a la beca: ${
              result?.how_to_apply
                ? JSON.stringify(result.how_to_apply)
                : "Desconocido"
            }.
            Documentos requeridos de la beca: ${
              result?.required_documents
                ? JSON.stringify(result.required_documents)
                : "Desconocidos"
            }.
            Criteria de selección de la beca: ${
              result?.selection_criteria
                ? JSON.stringify(result.selection_criteria)
                : "Desconocida"
            }.
            Links: ${
              result?.links ? JSON.stringify(result.links) : "Desconocidos"
            }.
            Entidades: ${
              scholarship?.entities
                ? JSON.stringify(
                    scholarship?.entities.map((entity) => entity.name)
                  )
                : "Desconocidas"
            }.
          `;

          const doc = new Document({
            pageContent: scholarshipPageContent,
            metadata: scholarshipMetadata,
          });

          const embeddings = await textEmbedding3Small.embedDocuments([
            JSON.stringify(doc),
          ]);

          await pineconeIndex.upsert([
            {
              id: `scholarship-${result?.id}`,
              values: embeddings[0],
              metadata: scholarshipMetadata,
            },
          ]);
        } else {
          await pineconeIndex.deleteOne(`scholarship-${result?.id}`);
        }
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_upsert_scholarship",
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
        await pineconeIndex.deleteOne(`scholarship-${result?.id}`);
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_delete_scholarship",
    }
  ),
};

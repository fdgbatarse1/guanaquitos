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

      const career = await strapi.entityService.findOne(
        "api::career.career",
        id,
        {
          populate: ["university"],
        }
      );

      try {
        const { result } = event;

        if (result.publishedAt) {
          const careerMetadata = {
            id: result?.id || "unknown",
            name: result?.name || "unknown",
            links: result?.links ? JSON.stringify(result?.links) : "unknown",
            createdAt: result?.createdAt || "unknown",
            updatedAt: result?.updatedAt || "unknown",
            publishedAt: result?.publishedAt || "unknown",
            locale: result?.locale || "unknown",
          };

          const careerPageContent = `
          Nombre de la carrera: ${result?.name || "Desconocido"}.
          Titulo que se obtiene: ${result?.title || "Desconocido"}.
          Grado académico: ${result?.academic_grade || "Desconocido"}.
          Campo educacional: ${result?.educational_field || "Desconocido"}.
          Modalidad: ${result?.modality || "Desconocida"}.
          Duración: ${result?.duration || "Desconocida"}.
          Descripción: ${
            result?.description
              ? JSON.stringify(result.description)
              : "Desconocida"
          }.
          Áreas de estudio: ${
            result?.study_areas
              ? JSON.stringify(result.study_areas)
              : "Desconocidas"
          }
          Áreas de desempeño laboral: ${
            result?.job_areas
              ? JSON.stringify(result.job_areas)
              : "Desconocidas"
          }
          Links: ${
            result?.links ? JSON.stringify(result.links) : "Desconocidos"
          }.
          Costos: ${
            result?.costs ? JSON.stringify(result.costs) : "Desconocidos"
          }.
          Descuentos: ${
            result?.discounts
              ? JSON.stringify(result.discounts)
              : "Desconocidos"
          }.
          Universidad: ${
            career?.university
              ? JSON.stringify(career.university)
              : "Desconocida"
          }.
        `;

          const doc = new Document({
            pageContent: careerPageContent,
            metadata: careerMetadata,
          });

          const embeddings = await textEmbedding3Small.embedDocuments([
            JSON.stringify(doc),
          ]);

          await pineconeIndex.upsert([
            {
              id: `career-${result?.id}`,
              values: embeddings[0],
              metadata: careerMetadata,
            },
          ]);
        } else {
          await pineconeIndex.deleteOne(`career-${result?.id}`);
        }
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_upsert_career",
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
        await pineconeIndex.deleteOne(`career-${result?.id}`);
      } catch (error) {
        strapi.log.error(error);
      } finally {
        await awaitAllCallbacks();
      }
    },
    {
      name: "guanaquitos_delete_career",
    }
  ),
};

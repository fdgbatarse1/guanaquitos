import { Pinecone } from "@pinecone-database/pinecone";

import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

export default {
  async afterUpdate(event) {
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

      const pinecone = new Pinecone({
        apiKey: PINECONE_API_KEY,
      });
      const pineconeIndex = pinecone.Index(PINECONE_INDEX);

      if (result.publishedAt) {
        const textEmbedding3Small = new OpenAIEmbeddings({
          apiKey: OPENAI_SECRET_KEY,
          model: "text-embedding-3-small",
        });
        strapi.log.debug("OPENAI_SECRET_KEY");

        const careerMetadata = {
          id: result?.id,
          name: result?.name,
          links: result?.links ? JSON.stringify(result?.links) : undefined,
          createdAt: result?.createdAt,
          updatedAt: result?.updatedAt,
          publishedAt: result?.publishedAt,
          locale: result?.locale,
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
        strapi.log.debug(JSON.stringify(doc));

        const embeddings = await textEmbedding3Small.embedDocuments([
          JSON.stringify(doc),
        ]);

        await pineconeIndex.upsert([
          {
            id: `${result?.id}`,
            values: embeddings[0],
            metadata: careerMetadata,
          },
        ]);
      } else {
        await pineconeIndex.deleteOne(`${result?.id}`);
      }
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async afterDelete(event) {
    try {
      const { result } = event;
      const pinecone = new Pinecone({
        apiKey: PINECONE_API_KEY,
      });
      const pineconeIndex = pinecone.Index(PINECONE_INDEX);
      await pineconeIndex.deleteOne(`${result?.id}`);
    } catch (error) {
      strapi.log.error(error);
    }
  },
};

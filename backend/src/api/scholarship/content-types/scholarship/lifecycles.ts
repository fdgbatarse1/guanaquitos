import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { traceable } from "langsmith/traceable";

import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

import { formatArrayField, formatField, formatRichText } from "../../../utils";

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
            id: `career-${result?.id}`,
            nombre: formatField(result?.name, "desconocido"),
            entidades: formatArrayField(
              scholarship?.entities
                ? scholarship.entities.map((entity) => ({ text: entity.name }))
                : [{ text: "Desconocidas" }]
            ),
            pais: formatField(result?.country, "desconocido"),
            enlaces: formatArrayField(result?.links, "desconocidos"),
            creadoEn: formatField(result?.createdAt, "desconocido"),
            actualizadoEn: formatField(result?.updatedAt, "desconocido"),
            publicadoEn: formatField(result?.publishedAt, "desconocido"),
            localizacion: formatField(result?.locale, "desconocida"),
            contenidoPagina: `Esta página proporciona información detallada de la beca '${formatField(
              result?.name || "Desconocida"
            )}' otorgada por las entidades: '${formatArrayField(
              scholarship?.entities
                ? scholarship.entities.map((entity) => ({ text: entity.name }))
                : [{ text: "Desconocidas" }]
            )}', incluyendo el país, tipo, categoría, modalidad, fechas de aplicación y estudio, descripción, objetivos, áreas de estudio, beneficios, requisitos, condiciones, cómo aplicar, documentos requeridos, criterios de selección, enlaces, y nombres de las entidades relacionadas.`,
          };

          const scholarshipPageContent = `Nombre de la beca:'${formatField(
            result?.name || "Desconocido"
          )}'. País de la beca:'${formatField(
            result?.country || "Desconocido"
          )}'. Tipo de la beca:'${formatField(
            result?.type || "Desconocido"
          )}'. Categoría de la beca:'${formatField(
            result?.category || "Desconocida"
          )}'. Modalidad de la beca:'${formatField(
            result?.modality || "Desconocida"
          )}'. Fecha de inicio de aplicación de la beca:'${formatField(
            result?.application_start_date || "Desconocida"
          )}'. Fecha de fin de aplicación de la beca:'${formatField(
            result?.application_final_date || "Desconocida"
          )}'. Fecha de inicio de estudios de la beca:'${formatField(
            result?.studies_start_date || "Desconocida"
          )}'. Fecha de fin de estudios de la beca:'${formatField(
            result?.studies_final_date || "Desconocida"
          )}'. Descripción de la beca:'${formatRichText(
            result?.description || "Desconocida"
          )}'. Objetivos de la beca:'${formatRichText(
            result?.goals || ["Desconocidos"]
          )}'. Áreas de estudio de la beca:'${formatArrayField(
            result?.study_areas || ["Desconocidas"]
          )}'. Beneficios de la beca:'${formatRichText(
            result?.benefits || ["Desconocidos"]
          )}'. Requisitos de la beca:'${formatRichText(
            result?.requirements || ["Desconocidos"]
          )}'. Condiciones de la beca:'${formatRichText(
            result?.conditions || ["Desconocidas"]
          )}'. Cómo aplicar a la beca:'${formatRichText(
            result?.how_to_apply || "Desconocido"
          )}'. Documentos requeridos de la beca:'${formatRichText(
            result?.required_documents || ["Desconocidos"]
          )}'. Criterios de selección de la beca:'${formatRichText(
            result?.selection_criteria || ["Desconocida"]
          )}'. Links:'${formatArrayField(
            result?.links || ["Desconocidos"]
          )}'. Entidades:'${formatArrayField(
            scholarship?.entities
              ? scholarship.entities.map((entity) => ({ text: entity.name }))
              : [{ text: "Desconocidas" }]
          )}'.`;
          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 0,
          });

          const docOutput = await splitter.splitDocuments([
            new Document({
              pageContent: scholarshipPageContent,
              metadata: scholarshipMetadata,
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
            (_, index) => `scholarship-${result?.id}-${index}`
          );

          vectorStore.addDocuments(docOutput, ids);
        } else {
          const pageOneList = await pineconeIndex.listPaginated({
            prefix: `scholarship-${result?.id}`,
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
      name: "guanaquitos_upsert_scholarship",
    }
  ),
  afterDelete: traceable(
    async (event) => {
      try {
        const { result } = event;
        const pageOneList = await pineconeIndex.listPaginated({
          prefix: `scholarship-${result?.id}`,
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
      name: "guanaquitos_delete_scholarship",
    }
  ),
};

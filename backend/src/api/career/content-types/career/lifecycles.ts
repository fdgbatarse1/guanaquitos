import { traceable } from "langsmith/traceable";

import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { formatRichText, formatField, formatArrayField } from "../../../utils";

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
            id: `career-${result?.id}`,
            nombre: formatField(result?.name, "desconocido"),
            universidad: formatField(
              career?.university ? career.university.name : "desconocida"
            ),
            enlaces: formatArrayField(result?.links, "desconocido"),
            creadoEn: formatField(result?.createdAt, "desconocido"),
            actualizadoEn: formatField(result?.updatedAt, "desconocido"),
            publicadoEn: formatField(result?.publishedAt, "desconocido"),
            localizacion: formatField(result?.locale, "desconocido"),
            contenidoPagina: `Esta página proporciona información detallada de la carrera de '${formatField(
              result?.name,
              "desconocida"
            )}' en la universidad '${formatField(
              career?.university ? career.university.name : "desconocida"
            )} (${formatField(
              career?.university ? career.university.acronym : "desconocida"
            )})', incluyendo el título obtenido, grado académico, campo educacional, modalidad, duración, descripción, áreas de estudio, áreas de desempeño laboral, enlaces, costos, descuentos y detalles de la universidad.`,
          };

          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 0,
          });

          const careerPageContent = `Nombre de la carrera:'${formatField(
            result?.name
          )}'. Titulo que se obtiene:'${formatField(
            result?.title
          )}'. Grado académico:'${formatField(
            result?.academic_grade
          )}'. Campo educacional:'${formatField(
            result?.educational_field
          )}'. Modalidad:'${formatField(
            result?.modality
          )}'. Duración:'${formatField(
            result?.duration
          )}'. Descripción:'${formatRichText(
            result?.description
          )}'. Áreas de estudio:'${formatArrayField(
            result?.study_areas
          )}'. Áreas de desempeño laboral:'${formatArrayField(
            result?.job_areas
          )}'. Enlaces:'${formatArrayField(
            result?.links
          )}'. Costos:'${formatRichText(
            result?.costs
          )}'. Descuentos:'${formatRichText(
            result?.discounts
          )}'. Universidad:'${formatField(
            career?.university ? career.university.name : "Desconocida"
          )}'.`;

          const docOutput = await splitter.splitDocuments([
            new Document({
              pageContent: careerPageContent,
              metadata: careerMetadata,
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
            (_, index) => `career-${result?.id}-${index}`
          );

          vectorStore.addDocuments(docOutput, ids);
        } else {
          const pageOneList = await pineconeIndex.listPaginated({
            prefix: `career-${result?.id}`,
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
      name: "guanaquitos_upsert_career",
    }
  ),
  afterDelete: traceable(
    async (event) => {
      try {
        const { result } = event;

        const pageOneList = await pineconeIndex.listPaginated({
          prefix: `career-${result?.id}`,
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
      name: "guanaquitos_delete_career",
    }
  ),
};

import { traceable } from "langsmith/traceable";

import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
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

const formatField = (field, defaultValue = "Desconocido") => {
  return field ? field : defaultValue;
};

const formatArrayField = (field, defaultValue = "Desconocido") => {
  return field && Array.isArray(field)
    ? field
        .map((item) =>
          typeof item === "object" ? item.text || JSON.stringify(item) : item
        )
        .join(", ")
    : defaultValue;
};

const formatRichText = (description) => {
  if (!description) return "Desconocida";
  return description
    .map((item) => item.children.map((child) => child.text).join(""))
    .join("\n\n");
};

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
          const careerMetadata = ({
            about,
            including = "",
          }: {
            about: string;
            including?: string;
          }) => ({
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
            contenidoPagina: `Esta página proporciona información detallada sobre ${about} de la carrera de '${formatField(
              result?.name,
              "desconocida"
            )}' en la universidad '${formatField(
              career?.university ? career.university.name : "desconocida"
            )} (${formatField(
              career?.university ? career.university.acronym : "desconocida"
            )})'${including}`,
          });

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
              pageContent: `Nombre de la carrera:'${formatField(
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
              )}. Enlaces Importantes:'${formatArrayField(
                result?.links
              )}'. Universidad:'${formatField(
                career?.university ? career.university.name : "Desconocida"
              )}'.`,
              metadata: careerMetadata({
                about: "Detalles básicos",
                including:
                  ", incluyendo el título obtenido, grado académico, campo educacional, modalidad, duración, enlaces importantes y universidad",
              }),
            }),
            new Document({
              pageContent: `Descripción:'${formatRichText(
                result?.description
              )}'.`,
              metadata: careerMetadata({
                about: "Descripción",
              }),
            }),
            new Document({
              pageContent: `Áreas de estudio:'${formatArrayField(
                result?.study_areas
              )}'.`,
              metadata: careerMetadata({
                about: "Áreas de estudio",
              }),
            }),
            new Document({
              pageContent: `Áreas de desempeño laboral:'${formatArrayField(
                result?.job_areas
              )}'.`,
              metadata: careerMetadata({
                about: "Áreas de desempeño laboral",
              }),
            }),
            new Document({
              pageContent: `Costos:'${formatRichText(result?.costs)}'.`,
              metadata: careerMetadata({
                about: "Costos",
              }),
            }),
            new Document({
              pageContent: `Descuentos:'${formatRichText(result?.discounts)}'.`,
              metadata: careerMetadata({
                about: "Descuentos",
              }),
            }),
          ]);

          strapi.log.debug(JSON.stringify(docOutput.length));
          strapi.log.debug(JSON.stringify(docOutput));

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
          const deleteResponse = await pineconeIndex.deleteMany(
            pageOneVectorIds
          );

          strapi.log.debug(JSON.stringify(deleteResponse));
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
        // const { result } = event;
        // const pinecone = new Pinecone({
        //   apiKey: PINECONE_API_KEY,
        // });
        // const pineconeIndex = pinecone.Index(PINECONE_INDEX);
        // await pineconeIndex.deleteOne(`career-${result?.id}`);
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

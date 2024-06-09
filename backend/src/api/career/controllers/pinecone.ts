import { sanitize, validate } from "@strapi/utils";

export default {
  async insertInPinecone(ctx) {
    const contentType = strapi.contentType("api::career.career");
    await validate.contentAPI.query(ctx.query, contentType);
    const sanitizedQueryParams = await sanitize.contentAPI.query(
      ctx.query,
      contentType
    );
    const { results, pagination } = await strapi
      .service("api::career.pinecone")
      .insertInPinecone(sanitizedQueryParams);
    const sanitizedResults = await sanitize.contentAPI.output(
      results,
      contentType
    );
    return {
      results: sanitizedResults,
      pagination,
    };
  },
};

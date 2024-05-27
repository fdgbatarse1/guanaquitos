import { sanitize, validate } from "@strapi/utils";

export default {
  async insertInPinecone(ctx) {
    const contentType = strapi.contentType("api::entity.entity");
    await validate.contentAPI.query(ctx.query, contentType);
    const sanitizedQueryParams = await sanitize.contentAPI.query(
      ctx.query,
      contentType
    );
    const { results, pagination } = await strapi
      .service("api::entity.pinecone")
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

export default {
  afterUpdate(event) {
    strapi.log.debug("afterUpdate career");
    strapi.log.debug(JSON.stringify(event));

    const { result, params } = event;

    if (result.publishedAt) {
      // TODO: Upsert career index from pinecone
    } else {
      // TODO: Delete career index from pinecone
    }
  },
};

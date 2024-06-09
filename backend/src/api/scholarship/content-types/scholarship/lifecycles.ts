export default {
  afterUpdate(event) {
    strapi.log.debug("afterUpdate scholarship");
    strapi.log.debug(JSON.stringify(event));

    const { result, params } = event;

    if (result.publishedAt) {
      // TODO: Upsert scholarship index from pinecone
    } else {
      // TODO: Delete scholarship index from pinecone
    }
  },
};

export default {
  afterUpdate(event) {
    strapi.log.debug("afterUpdate university");
    strapi.log.debug(JSON.stringify(event));

    const { result, params } = event;

    if (result.publishedAt) {
      // TODO: Upsert university index from pinecone
    } else {
      // TODO: Delete university index from pinecone
    }
  },
};

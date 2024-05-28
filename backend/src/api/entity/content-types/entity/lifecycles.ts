export default {
  afterUpdate(event) {
    strapi.log.debug("afterUpdate entity");
    strapi.log.debug(JSON.stringify(event));

    const { result, params } = event;

    if (result.publishedAt) {
      // TODO: Upsert entity index from pinecone
    } else {
      // TODO: Delete entity index from pinecone
    }
  },
};

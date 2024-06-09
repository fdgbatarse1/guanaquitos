export default () => ({
  async insertInPinecone(params) {
    const { results, pagination } = await strapi
      .service("api::entity.entity")
      .find(params);

    console.log("insert entities in pinecone");

    return { results, pagination };
  },
});

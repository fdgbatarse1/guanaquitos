export default () => ({
  async insertInPinecone(params) {
    const { results, pagination } = await strapi
      .service("api::scholarship.scholarship")
      .find(params);

    console.log("insert scholarships in pinecone");

    return { results, pagination };
  },
});

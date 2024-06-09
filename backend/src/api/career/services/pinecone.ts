export default () => ({
  async insertInPinecone(params) {
    const { results, pagination } = await strapi
      .service("api::career.career")
      .find(params);

    console.log("insert careers in pinecone");

    return { results, pagination };
  },
});

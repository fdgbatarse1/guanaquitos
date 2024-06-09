export default () => ({
  async insertInPinecone(params) {
    const { results, pagination } = await strapi
      .service("api::university.university")
      .find(params);

    console.log("insert universities in pinecone");

    return { results, pagination };
  },
});

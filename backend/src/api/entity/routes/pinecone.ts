export default {
  routes: [
    {
      method: "POST",
      path: "/pinecone/entities",
      handler: "pinecone.insertInPinecone",
    },
  ],
};

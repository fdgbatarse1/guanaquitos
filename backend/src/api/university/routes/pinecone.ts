export default {
  routes: [
    {
      method: "POST",
      path: "/pinecone/universities",
      handler: "pinecone.insertInPinecone",
    },
  ],
};

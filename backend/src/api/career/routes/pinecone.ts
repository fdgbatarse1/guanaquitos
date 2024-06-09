export default {
  routes: [
    {
      method: "POST",
      path: "/pinecone/careers",
      handler: "pinecone.insertInPinecone",
    },
  ],
};

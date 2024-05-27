export default {
  routes: [
    {
      method: "POST",
      path: "/pinecone/scholarships",
      handler: "pinecone.insertInPinecone",
    },
  ],
};

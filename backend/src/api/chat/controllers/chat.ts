const Controller = {
  async chat(ctx) {
    try {
      if (!ctx.request.body?.prompt) throw new Error("Missing prompt");
      if (!ctx.request.body?.sessionId) throw new Error("Missing sessionId");

      if (typeof ctx.request.body.prompt !== "string") {
        throw new Error("Prompt must be a string");
      }
      if (typeof ctx.request.body.sessionId !== "string") {
        throw new Error("SessionId must be a string");
      }

      if (Object.keys(ctx.request.body).length > 2) {
        throw new Error("Only prompt and sessionId are allowed");
      }

      const response = await strapi
        .service("api::chat.chat")
        .chat(ctx.request.body);

      return {
        response,
      };
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },
};

export default Controller;

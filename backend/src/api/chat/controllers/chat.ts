import { sanitize, validate } from "@strapi/utils";

const Controller = {
  async chat(ctx) {
    const response = await strapi
      .service("api::chat.chat")
      .chat(ctx.request.body);

    return {
      response,
    };
  },
};

export default Controller;

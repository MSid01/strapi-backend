"use strict";

/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async create(ctx) {
    let entity;
    const user = ctx.state.user;
    const author = user.id;
    ctx.request.body.data.author = author;
    try {
      entity = await strapi.entityService.create(
        "api::article.article",
        ctx.request.body
        );
    } catch (err) {
      console.log(err);
    }
    return entity;
  },
  async update(ctx) {
    try {
      const [article] = await strapi.entityService.findMany(
        "api::article.article",
        {
          fields: ["title"],
          filters: {
            id: ctx.params.id,
            author: ctx.state.user.id,
          },
        }
      );

      if (!article) {
        return ctx.unauthorized(`You are not authorized to delete this entry.`);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await super.update(ctx);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(ctx) {
    try {
      const [article] = await strapi.entityService.findMany(
        "api::article.article",
        {
          fields: ["title"],
          filters: {
            id: ctx.params.id,
            author: ctx.state.user.id,
          },
        }
      );

      if (!article) {
        return ctx.unauthorized(`You are not authorized to delete this entry.`);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await super.delete(ctx);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
}));



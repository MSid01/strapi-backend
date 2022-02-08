"use strict";

/**
 *  garage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::garage.garage", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async addComment(ctx) {
    ctx.request.body.data.user = ctx.state.user.id;
    ctx.request.body.data.garage = ctx.params.id;

    try {
      const entity = await strapi
        .service("api::comment.comment")
        .create(ctx.request.body);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.body = err;
    }
  },

  async findComments(ctx) {
    try {
      const data = await strapi.service("api::comment.comment").find(
        {
          filters: {
            garage: ctx.params.id
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  //ratings controller
  async addRating(ctx) {
    ctx.request.body.data.user = ctx.state.user.id;
    ctx.request.body.data.garage = ctx.params.id;

    try {
      const {results} = await strapi.service("api::rating.rating").find(
        {
          filters: {
            user: ctx.state.user.id,
            garage: ctx.params.id
          },
        }
      );

      if(results.length > 0)
      return ctx.notAcceptable(`You have already rated.`);

      const entity = await strapi
        .service("api::rating.rating")
        .create(ctx.request.body);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.body = err;
    }
  },

  async findRating(ctx) {
    try {
      const {results} = await strapi.service("api::rating.rating").find(
        {
          filters: {
            user: ctx.state.user.id,
            garage: ctx.params.id
          },
        }
      );
      if(results.length >0)
      return results[0];
      else return ctx.notFound("Not Found")
    } catch (err) {
      console.log(err);
    }
  },

  async create(ctx) {
    // some logic here
    const response = await super.create(ctx);
    // some more logic
    console.log(response);
    
    return response;
  },
  
  async update(ctx) {
    // some logic here
    console.log(ctx);
    const response = await super.update(ctx);
    // some more logic
    
    return response;
  },
  async delete(ctx) {
    // some logic here
    const response = await super.delete(ctx);
    console.log(response);
    // some more logic
  
    return response;
  }

}));

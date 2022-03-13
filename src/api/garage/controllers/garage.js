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
    const garage_id= ctx.params.id;
    ctx.request.body.data.user = ctx.state.user.id;
    ctx.request.body.data.garage = garage_id;

    try {
      const {results} = await strapi.service("api::rating.rating").find(
        {
          filters: {
            user: ctx.state.user.id,
            garage: garage_id
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

  async update(ctx) {
    console.log(ctx)
    // some logic here
    const response = await super.update(ctx);
    // some more logic
  
    return response;
  },
  
  async avgRating(ctx) {
    try {
      const {results} = await strapi.service("api::rating.rating").find(
        {
          filters: {
            garage: ctx.params.id
          },
        }
      );
      if(results.length>0){
        const initialValue = 0;
        const avgRating = results.reduce(
          (previousValue, currentValue) => previousValue + currentValue.ratings,
          initialValue
        )/results.length;
        return avgRating;
      }
      else return 0;
    } catch (err) {
      console.log(err);
    }
  },


}));

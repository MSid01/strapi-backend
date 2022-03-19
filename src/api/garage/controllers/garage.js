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
      ctx.body = err;
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
      ctx.body = err;
    }
  },

  async update(ctx) {
    console.log(ctx)
    // some logic here
    const response = await super.update(ctx);
    // some more logic
  
    return response;
  },
  
  async findStore(ctx) {
    try {
      const {results} = await strapi.service("api::garage.garage").find({
        fields:['id'],
        populate: { products: true },
      });
      
      // const results= strapi.db.query('components::product.product').findMany({});
      var resarr=[]
      results.map(g=>{
        resarr= resarr.concat(g.products).push({garage_id:g.id});
      })
      console.log(resarr);
      return "good";
    }
    catch (err){
      console.log(err);
      ctx.body = err;
    }

  }

}));

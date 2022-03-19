"use strict";

// const session = require("koa-session2"); // required import for oauth

// resolver imports
const {
  coreCreateMutationResolve,
  coreUpdateMutationResolve,
  coreDeleteMutationResolve,
} = require("./utilities/core-resolvers.js");
const { ForbiddenError } = require("@strapi/utils").errors;

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},
  // register({ strapi }) {
  //   const extensionService = strapi.plugin("graphql").service("extension");
  //   const { transformArgs, getContentTypeArgs } = strapi
  //     .plugin("graphql")
  //     .service("builders").utils;
  //   const { toEntityResponseCollection } = strapi
  //     .plugin("graphql")
  //     .service("format").returnTypes;
  //   const extension = ({ nexus }) => ({
  //     types: [
  //       nexus.extendType({
  //         type: "Query",
  //         definition(t) {
  //           t.field("garageRating", {
  //             type: "RatingEntityResponse",
  //             args: { id: nexus.intArg("id of the garage") },
  //             async resolve(parent, args, ctx) {
  //               const { results } = await strapi
  //                 .service("api::rating.rating")
  //                 .find({
  //                   filters: {
  //                     user: ctx.state.user.id,
  //                     garage: args.id,
  //                   },
  //                 });
  //                 console.log(ctx.state.user.id)
  //               if (results.length > 0) {
  //                 return {
  //                   value: results[0],
  //                 };
  //               } else {
  //                 throw new Error(ctx.koaContext.response.message);
  //               }
  //             },
  //           });
  //         },
  //       }),
  //       nexus.extendType({
  //         type: "Query",
  //         definition(t) {
  //           t.field("garageComments", {
  //             type: "CommentEntityResponseCollection",
  //             args: { id: nexus.intArg("id of the garage") },
  //             async resolve(parent, args, ctx) {
  //               const transformedArgs = transformArgs(args, {
  //                 contentType: strapi.contentTypes["api::comment.comment"],
  //                 usePagination: true,
  //                 garage: args.id,
  //               });
  //               const data = await strapi.entityService.findMany(
  //                 "api::comment.comment",
  //                 { filters: { garage: args.id } }
  //               );
  //               console.log(data);
  //               if (data) {
  //                 return toEntityResponseCollection(data, {
  //                   args: transformedArgs,
  //                   resourceUID: "api::comment.comment",
  //                 });
  //               } else {
  //                 throw new Error(ctx.koaContext.response.message);
  //               }
  //             },
  //           });
  //         },
  //       }),
  //     ],

  //     resolversConfig: {
  //       "Query.garageRating": {
  //         auth: true,
  //       },
  //       "Query.garageComments": {
  //         auth: false,
  //       },
  //     },
  //   });
  //   extensionService.use(extension);
  // },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};

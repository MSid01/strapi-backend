"use strict";

/**
 *  rating controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::rating.rating");
//   async create(ctx) {
//     let entity;
//     const user = ctx.state.user;
//     const author = user.id;
//     ctx.request.body.data.author = author;
//     try {
//       const [rating] = await strapi.entityService.findMany(
//         "api::rating.rating",
//         {
//           filters: {
//             garage: ctx.header.garage,
//             author: ctx.state.user.id,
//           },
//         }
//       );
//       if (rating) {
//         return ctx.notAcceptable(`You have already rated.`);
//       }

//       entity = await strapi.entityService.create(
//         "api::rating.rating",
//         ctx.request.body
//         );
//     } catch (err) {
//       console.log(err);
//     }
//     return entity;
//   },
//   async update(ctx) {
//     try {
//       const [rating] = await strapi.entityService.findMany(
//         "api::rating.rating",
//         {
//           filters: {
//             id: ctx.params.id,
//             author: ctx.state.user.id,
//           },
//         }
//       );

//       if (!rating) {
//         return ctx.unauthorized(`You are not authorized to delete this entry.`);
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     try {
//       const response = await super.update(ctx);
//       return response;
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   // async findOne(ctx) {
//   //   try {
//   //     const [rating] = await strapi.entityService.findMany(
//   //       "api::rating.rating",
//   //       {
//   //         filters: {
//   //           garage: ctx.header.garage,
//   //           id: ctx.params.id,
//   //           author: ctx.state.user.id,
//   //         },
//   //       }
//   //     );

//   //     if (!rating) {
//   //       return ctx.unauthorized(`You are not authorized to see this entry.`);
//   //     }
//   //     return rating;
      
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // },
//   async find(ctx) {
//     try {
//       const [rating] = await strapi.entityService.findMany(
//         "api::rating.rating",
//         {
//           filters: {
//             garage: ctx.header.garage,
//             author: ctx.state.user.id,
//           },
//         }
//       );

//       if (!rating) {
//         return ctx.unauthorized(`You are not authorized to see this entry.`);
//       }

//       return rating;
      
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   async delete(ctx) {
//     try {
//       const [rating] = await strapi.entityService.findMany(
//         "api::rating.rating",
//         {
//           filters: {
//             id: ctx.params.id,
//             author: ctx.state.user.id,
//           },
//         }
//       );

//       if (!rating) {
//         return ctx.unauthorized(`You are not authorized to delete this entry.`);
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     try {
//       const response = await super.delete(ctx);
//       return response;
//     } catch (err) {
//       console.log(err);
//     }
//   },
// }));



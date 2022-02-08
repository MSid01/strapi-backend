
``` javascript 
 register({ strapi }) {
    // strapi.server.use(session({
    //   secret: "grant",
    // }));

    const extensionService = strapi.plugin("graphql").service("extension");
    const { transformArgs, getContentTypeArgs } = strapi
      .plugin("graphql")
      .service("builders").utils;
    const { toEntityResponseCollection } = strapi
      .plugin("graphql")
      .service("format").returnTypes;
    const extension = ({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "Query",
          definition(t) {
            t.field("garageRating", {
              type: "RatingEntityResponse",
              args: { id: nexus.intArg("id of the garage") },
              async resolve(parent, args, ctx) {
                const { results } = await strapi
                  .service("api::rating.rating")
                  .find({
                    filters: {
                      user: ctx.state.user.id,
                      garage: args.id,
                    },
                  });
                if (results.length > 0) {
                  return {
                    value: results[0],
                  };
                } else {
                  throw new Error(ctx.koaContext.response.message);
                }
              },
            });
          },
        }),
        nexus.extendType({
          type: "Query",
          definition(t) {
            t.field("garageComments", {
              type: "CommentEntityResponseCollection",
              args: { id: nexus.intArg("id of the garage") },
              async resolve(parent, args, ctx) {
                const transformedArgs = transformArgs(args, {
                  contentType: strapi.contentTypes["api::comment.comment"],
                  usePagination: true,
                  garage: args.id,
                });
                const data = await strapi.entityService.findMany(
                  "api::comment.comment",
                  { filters: { garage: args.id } }
                );
                console.log(data);
                if (data) {
                  return toEntityResponseCollection(data, {
                    args: transformedArgs,
                    resourceUID: "api::comment.comment",
                  });
                } else {
                  throw new Error(ctx.koaContext.response.message);
                }
              },
            });
          },
        }),
      ],

      resolversConfig: {
        "Query.garageRating": {
          auth: true,
        },
        "Query.garageComments": {
          auth: false,
        },
      },
    });
    extensionService.use(extension);
  },
  ```
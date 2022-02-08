module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // ...
  search: {
    enabled: true,
    config: {
      provider: 'algolia',
      providerOptions: {
        apiKey: env('ALGOLIA_PROVIDER_ADMIN_API_KEY'),
        applicationId: env('ALGOLIA_PROVIDER_APPLICATION_ID'),
      },
      prefix: 'findMech',
      excludedFields: ['createdAt', 'createdBy', 'updatedAt', "updatedBy", 'ratings', 'comments', 'garage_owner'],
      debug: true,
      contentTypes: [
        { 
          name: 'api::garage.garage',
          index: 'garages'
        },
      ],
    },
  },
});

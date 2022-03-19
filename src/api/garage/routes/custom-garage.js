// path: ./src/api/garage/routes/custom-garage.js

module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'POST',
        path: '/garages/:id/comment',
        handler: 'garage.addComment',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/garages/:id/comment',
        handler: 'garage.findComments',
      },
      { // Path defined with a URL parameter
        method: 'POST',
        path: '/garages/:id/rating',
        handler: 'garage.addRating',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/garages/:id/rating',
        handler: 'garage.findRating',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/garages/store',
        handler: 'garage.findStore',
      },

    ]
  }
module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    
    // let's do a 20% discount everytime
    // event.params.data.price = event.params.data.price * 0.8;
  },

  async afterCreate(event) {
    const { result, params } = event;
    const garage_id = parseInt(params.data.garage);
    const user_rating = result.ratings;
    
    const garage_visitors = await strapi.db.query('api::garage.garage').findOne({
      select: ['garage_rating', 'number_of_visitors'],
      where: { id: garage_id },
      populate: { category: true },
    });
    const {garage_rating, number_of_visitors} = garage_visitors;

    const entry = await strapi.db.query('api::garage.garage').update({
      where: { id: garage_id},
      data: {
        garage_rating:(parseInt(garage_rating) + user_rating) ,
        number_of_visitors:(parseInt(number_of_visitors) + 1),
      },
    });
    // do something to the result;
  },
};
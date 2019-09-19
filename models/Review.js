const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  restaurantId: String,
  restaurantName: String,
  username: String,
  review: String,
  date: String,
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
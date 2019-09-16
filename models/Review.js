const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  id: String,
  username: String,
  review: String,
  date: Date,
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
const express = require('express');
const router = express.Router();
const Restaurant = require('./restaurant')
const Review = require('../models/Review')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// // get all the restaurants in SERACH 
// router.get("/restaurants", (req, res) => {

//   Restaurant.find().then(rest => {
//     res.render("restaurants", { restaurantList: rest });
//   });
// });


// // get a unique page for each restaurant by id
// router.get("/restaurants/:restaurantTag", (req, res) => {
//   const restaurantTag = req.results.items[tags];

//   Book.findById(restaurantTag)
//     .populate("id")
//     .then(rest => {
//       console.log(rest.tags);
//       res.render("restaurantDetails", { restaurant: rest });
//     });
// });
router.get('/review', (req, res, next) => {
  res.render('review');
});

router.post('/review', (req, res, next) => {
  const { review } = req.body;
  console.log(review);
  console.log(req.user);
  const newReview = new Review({ restaurantId: "restauranteId", username: req.user.username, review, date: new Date() })
  newReview.save()
    .then((review) => {
      res.redirect('restaurantDetail');
    })
    .catch((error) => {
      console.log(error);
    })
});




module.exports = router;

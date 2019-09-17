const express = require('express');
const router = express.Router();
const Restaurant = require('./restaurant')
const Review = require('../models/Review')

/* HOME PAGE */
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


//REVIEW PAGE

const loginCheck = () => {
  return (req, res, next) => {
    // if (req.user)
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/auth/login");
    }
  };
};


router.get('/review', loginCheck(), (req, res, next) => {
  res.render('review');
});

router.post('/review', (req, res, next) => {
  const { review } = req.body;
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

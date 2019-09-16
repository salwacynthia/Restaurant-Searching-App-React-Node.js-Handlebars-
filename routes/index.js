const express = require('express');
const router  = express.Router();
const Restaurant = require ('./restaurant')

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
  const { id, username, review, date } = req.body;
  const newReview = new Review({ id, username, review, date })
  newReview.save()
    .then((review) => {
      res.redirect('restaurantDetail');
    })
    .catch((error) => {
      console.log(error);
    })
});




module.exports = router;

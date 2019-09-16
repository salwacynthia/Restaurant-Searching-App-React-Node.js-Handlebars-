const axios = require('axios');
const express = require('express');
const router  = express.Router();
const Restaurant = require ('./restaurant')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index'); //the search bar
});

const appId = process.env.APP_ID,  // .env file theke client id ar secret nicche
appCode = process.env.APP_CODE;

/* GET search page */
// get all the restaurants in SERACH 
router.get("/restaurantlist", (req, res, next) => {
  let queryParameter = req.query.search; // can be restaurant 
  axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${queryParameter}`)
      .then(rest => {
    res.render("restaurantList.hbs", { restaurantList: rest });
  }).catch(err=>console.log(err))
});


// // // get a unique page for each restaurant by id
// router.get("/restaurants/:restaurantID", (req, res) => {
// const query = req.params.result.id;
// axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${query}`)
//       .then(data => {
//     res.render("restaurantDetails.hbs", { restaurantDetail: data });
//   }).catch(err=>console.log(err))
// //   
// // });
// router.get('/review', (req, res, next) => {
//   res.render('review');
// });

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

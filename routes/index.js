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
  // console.log(queryParameter);
  axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${queryParameter}`)
      .then(rest => {
        // console.log(rest.data.results.items);
    res.render("restaurantList.hbs", { restaurantList: rest.data.results.items });
  }).catch(err=>console.log(err))
});


// // get a unique page for each restaurant by id
router.get("/restaurants/:restaurantID", (req, res) => {
const query = req.params.restaurantID;
console.log(query)
// console.log(restaurantID)

axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${query}`)
//axios.get(`https://lookup.search.hereapi.com/v1/lookup?app_id=${appId}&app_code=${appCode}&id=here%3Apds%3Aplace%3A8408lxx5-fab6ca4f9e38039a775fd4dc13490a5e&lang=en-US`)
.then(val => {
        console.log('promise:',val)
    res.render("restaurantDetail.hbs", { restaurantDetail: val.data.search.context.location });
  }).catch(err=>console.log(err))
   
 });
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

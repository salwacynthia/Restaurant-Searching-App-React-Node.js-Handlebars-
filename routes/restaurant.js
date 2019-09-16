const express = require("express");
// the route to the restaurant list

const router = express.Router();
const axios = require('axios');

/* GET search page */
router.get("/", (req, res, next) => {
  // get all the restaurants

  const appId = process.env.APP_ID,  // .env file theke client id ar secret nicche
    appCode = process.env.APP_CODE;
    //const getRestaurant = Rest => {
      axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=restaurant`)
      .then(response => {
        let restaurants = response.data.results.items
        console.log ("response", restaurants);
        //const restaurant = req.query.search
        res.render("restaurantList.hbs", {restaurants});
      }).catch(err=>console.log(err))
});

module.exports = router;

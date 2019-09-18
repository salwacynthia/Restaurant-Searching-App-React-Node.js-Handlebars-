const axios = require('axios');
const express = require('express');
const router = express.Router();
const Restaurant = require('./restaurant')
const Review = require('../models/Review')
const Contact = require('../models/Contact')
// também adicionei essa parte
const url = require('url');
//acaba aqui

const context = "Zmxvdy1pZD00NDliNzFmMi05NGIwLTUzMDItOWNmNC1mYjllNWE3ZTA4ZjJfMTU2ODc1Nzc4MDg3OV8yNTMyXzU4OTcmcmFuaz0xOQ";

/* HOME PAGE */
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
      // mudanças começam aqui
      rest.data.results.items.forEach(item => {
        const href = url.parse(item.href);
        console.log(href);
        item.id = href.pathname.substring(href.pathname.lastIndexOf("/") + 1);
      });
      // terminam aqui
      res.render("restaurantList.hbs", { restaurantList: rest.data.results.items });
    }).catch(err => console.log(err))
});


// // get a unique page for each restaurant by id
router.get("/restaurants/:restaurantID", (req, res) => {
  const query = req.params.restaurantID;
  // troquei a url pra esssa /places/${query}
  axios.get(`https://places.cit.api.here.com/places/v1/places/${query}?app_id=${appId}&app_code=${appCode}`)
    .then(rest => {
      res.render("restaurantDetail.hbs", { restaurantDetail: rest.data });
    }).catch(err => console.log(err))

// axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${query}`)
axios.get(`https://places.cit.api.here.com/places/v1/places/${query};context=${context}?app_id=${appId}&app_code=${appCode}`)
.then(rest => {
        // console.log('promise:',rest)
    res.render("restaurantDetail.hbs", { restaurantDetail: rest.data });
  }).catch(err=>console.log(err))
   
 });
router.get('/review', (req, res, next) => {
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

/* ARTICLES */
router.get('/articles', (req, res, next) => {
  res.render('articles');
});

/* CONTACT */
router.get('/contact', (req, res, next) => {
  res.render('contact');
});

router.post('/contact', (req, res, next) => {
  const { name, message } = req.body;
  const newContact = new Contact({ name, message, date: new Date() })
  newContact.save()
    .then((contact) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    })
});


/* GAME */
router.get('/game', (req, res, next) => {
  res.render('game');
});

module.exports = router;

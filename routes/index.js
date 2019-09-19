const axios = require('axios');
const express = require('express');
const router = express.Router();
const Restaurant = require('./restaurant')
const Review = require('../models/Review')
const Contact = require('../models/Contact')

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
  let category = "eat-drink";
  // console.log(queryParameter);
  axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${queryParameter}`)
    .then(rest => {
      rest.data.results.items.forEach(el => el.vicinity = el.vicinity.split("<br/>").join(", "))
      res.render("restaurantList.hbs", { restaurantList: rest.data.results.items });
    }).catch(err => console.log(err))
});


// // get a unique page for each restaurant by id
router.get("/restaurants/:restaurantID", (req, res) => {
  const query = req.params.restaurantID;
  console.log('query:' + query)

  // axios.get(`https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&q=${query}`)
  axios.get(`https://places.cit.api.here.com/places/v1/places/${query};context=${context}?app_id=${appId}&app_code=${appCode}`)
    .then(rest => {
      // console.log('promise:',rest)
      Review.find({ restaurantId: query }, (error, review) => {
        console.log(review);
        res.render("restaurantDetail.hbs", { restaurantDetail: rest.data, review: review, loggedIn: req.user !== undefined, appCode, appId });
      }).catch(err => res.render("restaurantDetail.hbs", { restaurantDetail: rest.data }))

    }).catch(err => console.log(err))

});

router.get('/review/:restaurantId', (req, res, next) => {
  axios.get(`https://places.cit.api.here.com/places/v1/places/${req.params.restaurantId};context=${context}?app_id=${appId}&app_code=${appCode}`)
    .then(rest => {
      res.render('review', { restaurantDetail: rest.data });
    })
    .catch((error) => {
      res.render('review')
    });
});

router.post('/review/:restaurantId', (req, res, next) => {
  const { review, restaurantName } = req.body;
  const restaurantId = req.params.restaurantId;
  const newReview = new Review({ restaurantName: restaurantName, restaurantId: restaurantId, username: req.user.username, review, date: new Date().toLocaleDateString('pt-BR') })
  newReview.save()
    .then((review) => {
      res.redirect(`/restaurants/${restaurantId}`);
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



router.get('/dashboard', (req, res, next) => {
  if (req.user === undefined) {
    res.redirect('/auth/login');
  } else {
    Review.find({ username: req.user.username }, (error, reviews) => {
      res.render('dashboard', { reviews });
    });
  }
});

router.get('/dashboard/review/:id', (req, res) => {
  if (req.user === undefined) {
    res.redirect('/auth/login');
  } else {
    const id = req.params.id;
    Review.deleteOne({ '_id': id, username: req.user.username }, (error, review) => {
      res.redirect('/dashboard');
    });
  }
});

module.exports = router;

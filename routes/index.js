const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
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

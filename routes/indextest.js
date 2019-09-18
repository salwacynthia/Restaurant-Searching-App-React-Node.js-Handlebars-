// const axios = require('axios');
// const express = require('express');
// const router = express.Router();
// const Restaurant = require('./restaurant')
// const Review = require('../models/Review')
// const Contact = require('../models/Contact')
// ​
// // Copiei um dos contexts das chamadas (pelo postman), é obrigatório passar isso na chamada da api. pra ver 1 restaurante específico
// // O motivo de fazer essa mudança é pq o ID do restaurante não pode mudar,
// // se não os reviews que forem salvos no banco não vão aparecer, pq cada hora o context que vem no resultado fica diferente.
// const context = "Zmxvdy1pZD00NDliNzFmMi05NGIwLTUzMDItOWNmNC1mYjllNWE3ZTA4ZjJfMTU2ODc1Nzc4MDg3OV8yNTMyXzU4OTcmcmFuaz0xOQ";
// ​
// /* HOME PAGE */
// router.get('/', (req, res, next) => {
//   res.render('index'); //the search bar
// });
// ​
// const appId = process.env.APP_ID,  // .env file theke client id ar secret nicche
// appCode = process.env.APP_CODE;
// ​
// /* GET search page */
// // get all the restaurants in SERACH 
// router.get("/restaurantlist", (req, res, next) => {
//   let queryParameter = req.query.search; // can be restaurant 
//   // console.log(queryParameter);
//   // adicionei o parametro cs pra filtrar as categorias, mas em tem alguns locais sem categorie que continuam aparecendo na busca mesmo com o filtro ex: hospital
//   const url = `https://places.cit.api.here.com/places/v1/discover/search?app_id=${appId}&app_code=${appCode}&at=52.5206,13.3889&cs=cuisines&q=${queryParameter}`;
//   //console.log tá aqui pra ficar mais fácil de conseguir copiar a url e rodar no postman
//   console.log(url);
//   axios.get(url)
//       .then(rest => {
//         res.render("restaurantList.hbs", { restaurantList: rest.data.results.items });
//       }).catch(err=>console.log(err))
// });
// ​
// ​
// // // get a unique page for each restaurant by id
// router.get("/restaurants/:restaurantID", (req, res) => {
// const query = req.params.restaurantID;
// // troquei a url pra esssa /places/${query};context=${context}
// // context é fixo e tá definido lá no começo do arquivo
// const url = `https://places.cit.api.here.com/places/v1/places/${query};context=${context}?app_id=${appId}&app_code=${appCode}`;
// //console.log tá aqui pra ficar mais fácil de conseguir copiar a url e rodar no postman
// console.log(url);
// axios.get(url)
// .then(rest => {
//     res.render("restaurantDetail.hbs", { restaurantDetail: rest.data });
//   }).catch(err=>console.log(err))
   
//  });
// router.get('/review', (req, res, next) => {
//   res.render('review');
// });
// ​
// router.post('/review', (req, res, next) => {
//   const { review } = req.body;
//   const newReview = new Review({ restaurantId: "restauranteId", username: req.user.username, review, date: new Date() })
//   newReview.save()
//     .then((review) => {
//       res.redirect('restaurantDetail');
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// });
// ​
// /* ARTICLES */
// router.get('/articles', (req, res, next) => {
//   res.render('articles');
// });
// ​
// /* CONTACT */
// router.get('/contact', (req, res, next) => {
//   res.render('contact');
// });
// ​
// router.post('/contact', (req, res, next) => {
//   const { name, message } = req.body;
//   const newContact = new Contact({ name, message, date: new Date() })
//   newContact.save()
//     .then((contact) => {
//       res.redirect('/');
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// });
// ​
// ​
// /* GAME */
// router.get('/game', (req, res, next) => {
//   res.render('game');
// });
// ​
// // module.exports = router;

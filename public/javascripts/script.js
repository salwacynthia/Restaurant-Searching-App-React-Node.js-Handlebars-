// document.addEventListener('DOMContentLoaded', () => {

//   console.log('IronGenerator JS imported successfully!');

// }, false);


//REVIEW
document.querySelector("form").onsubmit = event => {
  // event.preventDefault();
  const review = document.getElementById("review").value;
  console.log(review);
}
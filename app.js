// // get current location
// let lat;
// let lon;

// navigator.geolocation.getCurrentPosition(function(position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
  
//   // console.log(lat, lon);
// });

// initialize weather object
const weather = new Weather(20, -20);
// init UI
const ui = new UI();

// get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// weather.changeLocation(20, 80);

function getWeather(){
weather.getWeather()
  .then(results => {
    ui.paint(results);
    console.log(results);
  })
  .catch(err => console.log(err));
}

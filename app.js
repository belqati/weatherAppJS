// get current location
// let lat;
// let lon;

// navigator.geolocation.getCurrentPosition(function(position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
  
//   console.log(position.coords.latitude, position.coords.longitude);
// });

// initialize weather object
const weather = new Weather(42.199422999999996, -87.8143274);

weather.getWeather()
  .then(results => {
    console.log(results);
  })
  .catch(err => console.log(err));


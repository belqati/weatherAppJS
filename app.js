// // get current location
// let lat;
// let lon;

// navigator.geolocation.getCurrentPosition(function(position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
  
//   // console.log(lat, lon);
// });

// init localStorage
const storage = new Storage();
// get stored location data
const weatherLocation = storage.getLocationData();
// init weather object
const weather = new Weather(weatherLocation.lat, weatherLocation.lon);
// init UI
const ui = new UI();

// get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// change location event
document.querySelector('#w-change-btn').addEventListener('click', (e) => {
  const lat = document.querySelector('#lat').value;
  const lon = document.querySelector('#lon').value;

  // change location
  weather.changeLocation(lat, lon);

  // set location to localStorage
  storage.setLocationData(lat, lon);

  // get and display weather
  getWeather();

  // close modal (must use JQuery for Bootstrap modal)
  $('#locModal').modal('hide');
});

function getWeather(){
  weather.getWeather()
    .then(results => {
      ui.paint(results);
      console.log(results);
    })
    .catch(err => console.log(err));
}

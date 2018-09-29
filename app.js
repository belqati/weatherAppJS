// init localStorage
const storage = new Storage();
// get stored location data
const weatherLocation = storage.getLocationData();
// init weather object
const weather = new Weather(weatherLocation.lat, weatherLocation.lon, weatherLocation.placeName);
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

// getLocalWeather event
document.querySelector('#getLocalWeather').addEventListener('click', (e) => {
  // get current location via geolocation
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // change location
    weather.changeLocation(lat, lon);
    // set location to localStorage
    storage.setLocationData(lat, lon);
    // get and display weather
    getWeather();
  });
});

// get weather and paint results
function getWeather(){
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
  getPlace();
  // clear form fields
  ui.clear();
}

// get place name and paint results
function getPlace(){
  weather.getPlace()
    .then(place => {
      ui.paintPlace(place);
    })
    .catch(err => console.log(err));
}

// load google places autocomplete
autocomplete();
function autocomplete(){
  let autocomplete = document.createElement('script');
  let url = 'https://maps.googleapis.com/maps/api/js?key=' + weather.weatherAPI() + '&libraries=places&callback=initAutocomplete';
  autocomplete.setAttribute('src', url);
  document.head.appendChild(autocomplete);
}

// callback for google places autocomplete library
// grabs selected auto item and calls geocoder
function initAutocomplete(){
  let input = document.querySelector('#newLocation');
  let searchBox = new google.maps.places.SearchBox(input);
  let address;
  // Listen for the event fired when the user selects a prediction and retrieve details
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    address = places[0].formatted_address;
    if (places.length == 0) {
      return;
    }

    // call geocoder via axios, grab lat/lon, change/store/get/display weather
    geocoder();
    function geocoder(){
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: weather.weatherAPI()
        }
      })
      .then(res => {
        // get lat/lon
        let lat = res.data.results[0].geometry.location.lat;
        let lon = res.data.results[0].geometry.location.lng;

        // change location
        weather.changeLocation(lat, lon);
        // set location to localStorage
        storage.setLocationData(lat, lon);
        // get and display weather
        getWeather();
      })
      .catch(err => {
        console.log(err);
      });
    }
  });
}
// init localStorage
const storage = new Storage();
// get stored location data
const weatherLocation = storage.getLocationData();
// init weather object
const weather = new Weather(weatherLocation.lat, weatherLocation.lon, weatherLocation.placeName);
// init UI
const ui = new UI();

// for user unit display preference
const celsiusBtn = document.querySelector('#celsius');
const fahrenheitBtn = document.querySelector('#fahrenheit');
// for alerts
const alertModal = document.querySelector('#alertModal');

// get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// change location event
document.querySelector('#w-change-btn').addEventListener('click', () => {
  const lat = document.querySelector('#lat').value;
  const lon = document.querySelector('#lon').value;

  if(Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && lat != '' && lon != ''){
    // change location
    weather.changeLocation(lat, lon);
    // set location to localStorage
    storage.setLocationData(lat, lon);
    // get and display weather
    getWeather();
    // close modal (must use JQuery for Bootstrap modal)
    $('#locModal').modal('hide');
  } else {
    // error handling
    ui.showAlertModal('Please enter valid lat/long values.', 'alert-warning');
  }
});

// getLocalWeather event
document.querySelector('#getLocalWeather').addEventListener('click', () => {

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
  },

  // error handling: e.g., error.code of 1 = permission denied message
  function (error) { 
    if (error.code)
    ui.showAlertBody(`Sorry, but the following error occurred: ${error.message}`, 'alert-warning');
  });
});

// set local storage for celsius
celsiusBtn.addEventListener('click', () => {
  const tempFC = 'celsius';
  storage.setTempFC(tempFC);
  getWeather();
});

// set local storage for fahrenheit
fahrenheitBtn.addEventListener('click', () => {
  const tempFC = 'fahrenheit';
  storage.setTempFC(tempFC);
  getWeather();
});

// get weather and paint results
function getWeather(){
  weather.getWeather()
    .then(results => {
      // get user unit preference
      let temp = storage.getTempFC();
      ui.paint(results);
      getPlace();

      // logic for painting unit preference
      if(temp.tempFC === 'celsius'){
        // change button active status
        celsiusBtn.classList.add('active');
        fahrenheitBtn.classList.remove('active');
        ui.paintC(results);
      } else {
        celsiusBtn.classList.remove('active');
        fahrenheitBtn.classList.add('active');
        ui.paintF(results);
      }
    })
    // error handling
    .catch(err => ui.showAlertBody(`Hmmm, seems that we have a ${err}`, 'alert-danger'));
  // clear form fields
  ui.clear();
}

// get place name and paint results
function getPlace(){
  weather.getPlace()
    .then(place => {
      ui.paintPlace(place);
    })
    // error handling
    .catch(err => ui.showAlertBody(`Hmmm, seems that we have a ${err}`, 'alert-danger'));
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
      // error handling
      .catch(err => ui.showAlertBody(`Hmmm, seems that we have a ${err}`, 'alert-danger'));
    }
  });
}
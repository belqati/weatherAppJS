class Weather {
  constructor(lat, lon, placeName){
    this.apiKeyDS = process.env.DARKSKY_SECRET;
    this.apiKeyGC = process.env.GEOCODER_API_KEY;
    this.lat = lat;
    this.lon = lon;
    this.placeName = placeName;
  }

  // fetch weather from API
  // if CORS need disabling for testing, close Chrome and start it via CLI: "chrome --disable-web-security --user-data-dir" (https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome)
  async getWeather(){
    const response = await fetch(`https://api.darksky.net/forecast/${this.apiKeyDS}/${this.lat},${this.lon}`);

    const responseData = await response.json();

    // limit response to current conditions
    return responseData;
  }

  async getPlace(){
    const place = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKeyGC}&latlng=${this.lat},${this.lon}`);

    const placeData = await place.json();
    let placeName;

    if(placeData.status == 'ZERO_RESULTS'){
      return 'Undisclosed Place Name';
    } else {
      placeName = placeData.plus_code.compound_code;
      if(placeName === undefined){
        return 'Undisclosed Place Name';
      } else {
        // console.log(placeName.slice(8));
        return placeName.slice(8);
      }
    }
  }

  async getAddress(){
    const address = await fetch(`https://maps.googleapis.com/maps/api/js?key=${this.apiKeyGC}&libraries=places&callback=initAutocomplete`);

    function initAutocomplete(){
      let input = document.querySelector('#newLocation');
      let searchBox = new google.maps.places.SearchBox(input);
      let address;
      // Listen for the event fired when the user selects a prediction and retrieve details
      searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();
        address = places[0].formatted_address;

        console.log(address);
        if (places.length == 0) {
          return;
        }
      });
    }
  }
  
  // change weather location
  changeLocation(lat, lon){
    this.lat = lat;
    this.lon = lon;
  }
}
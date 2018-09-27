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
    const placeName = placeData.plus_code.compound_code;

    if(placeName === undefined){
      console.log('placeName is undefined')
    } else {
      console.log(placeName.slice(8));
      return placeName.slice(8);
    }

  }

  // change weather location
  changeLocation(lat, lon){
    this.lat = lat;
    this.lon = lon;
  }
}
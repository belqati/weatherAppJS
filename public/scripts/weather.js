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
    // narrow response info to make it faster
    const exclude = '?exclude=minutely,hourly,daily,alerts,flags';
    const response = await fetch(`https://api.darksky.net/forecast/${this.apiKeyDS}/${this.lat},${this.lon}${exclude}`);
    const responseData = await response.json();
    return responseData;
  }

  // fetch place name based on lat/lon
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
        return placeName.slice(8);
      }
    }
  }

  // change weather location via lat/lon
  changeLocation(lat, lon){
    this.lat = lat;
    this.lon = lon;
  }
  
  // make apiKeyGC accessible for geocoder in app.js
  weatherAPI(){
    return this.apiKeyGC;
  }
}

class Weather {
  constructor(lat, lon){
    // DELETE KEY BEFORE COMMITS
    this.apiKey = 'b0c655f51933681fe396c39f5bf4c1d0';
    // this.apiKey = process.env.DARKSKY_SECRET;
    this.lat = lat;
    this.lon = lon;
  }

  // fetch weather from API
  // if CORS need disabling for testing, close Chrome and start it via CLI: "chrome --disable-web-security --user-data-dir"
  async getWeather(){
    const response = await fetch(`https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.lon}`);

    const responseData = await response.json();

    // limit response to current conditions
    return responseData;
  }

  // change weather location
  changeLocation(lat, lon){
    this.lat = lat;
    this.lon = lon;
  }
}
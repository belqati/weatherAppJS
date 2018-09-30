class UI {
  constructor(){
    this.timezone = document.querySelector('#w-timezone');
    this.placeName = document.querySelector('#placeName');
    this.latLon = document.querySelector('.w-latLon');
    this.summary = document.querySelector('#w-summary');
    // this.string = document.querySelector('#w-string');
    // this.icon = document.querySelector('#w-icon');
    this.skycon = document.querySelector('#skycon');
    this.humidity = document.querySelector('#w-humidity');
    this.dewPoint = document.querySelector('#w-dewPoint');
    this.temperature = document.querySelector('#w-temp');
    this.apparentTemperature = document.querySelector('#w-apparent-temp');
    this.windSpeed = document.querySelector('#w-wind');
    this.cloudCover = document.querySelector('#w-cloudCover');
    this.newLocation = document.querySelector('#newLocation');
    this.lat = document.querySelector('#lat');
    this.lon = document.querySelector('#lon');
  }

  // paint weather data for html
  paint(weather){
    this.timezone.textContent = `Timezone: ${weather.timezone}`;
    this.latLon.textContent = `Latitude & Longitude: ${weather.latitude.toFixed(4)}, ${weather.longitude.toFixed(4)}`;
    this.summary.textContent = `Conditions: ${weather.currently.summary}`;
    // this.icon.textContent = weather.currently.icon;
    this.humidity.textContent = `Relative Humidity: ${Math.round(weather.currently.humidity*100)}%`;
    this.dewPoint.textContent = `Dew Point: ${weather.currently.dewPoint} °F`;
    this.temperature.textContent = `Temp: ${weather.currently.temperature} °F`;
    this.apparentTemperature.textContent = `Feels Like: ${weather.currently.apparentTemperature} °F`;
    this.windSpeed.textContent = `Wind Speed: ${weather.currently.windSpeed} mph`;
    this.cloudCover.textContent = `Cloud Cover: ${Math.round(weather.currently.cloudCover*100)}%`;

    // init skycons for darksky (https://github.com/darkskyapp/skycons)
    let skycons = new Skycons();
    // add skycon to canvas tag
    skycons.add(this.skycon, weather.currently.icon);
    // animate
    skycons.play();
  }

  // paint placeName for html
  paintPlace(place){
    this.placeName.textContent = place;
  }

  // clear form inputs
  clear(){
    this.newLocation.value = '';
    this.lat.value = '';
    this.lon.value = '';
  }
}
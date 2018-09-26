class UI {
  constructor(){
    this.timezone = document.querySelector('#w-timezone');
    this.latLon = document.querySelector('.w-latLon');
    this.summary = document.querySelector('#w-summary');
    // this.string = document.querySelector('#w-string');
    this.icon = document.querySelector('#w-icon');
    this.humidity = document.querySelector('#w-humidity');
    this.dewPoint = document.querySelector('#w-dewPoint');
    this.temperature = document.querySelector('#w-temp');
    this.apparentTemperature = document.querySelector('#w-apparent-temp');
    this.windSpeed = document.querySelector('#w-wind');
  }

  paint(weather){
    this.timezone.textContent = weather.timezone;
    this.latLon.textContent = `Latitude & Longitude: ${weather.latitude}, ${weather.longitude}`;
    this.summary.textContent = weather.currently.summary;
    this.icon.textContent = weather.currently.icon;
    this.humidity.textContent = `Relative Humidity: ${weather.currently.humidity*100}%`;
    this.dewPoint.textContent = `Dew Point: ${weather.currently.dewPoint} °F`;
    this.temperature.textContent = `Temp: ${weather.currently.temperature} °F`;
    this.apparentTemperature.textContent = `Feels Like: ${weather.currently.apparentTemperature} °F`;
    this.windSpeed.textContent = `Wind Speed: ${weather.currently.windSpeed} m/h`;
  }

  skycons(){
    
  }
}
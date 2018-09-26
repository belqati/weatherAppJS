class UI {
  constructor(){
    this.timezone = document.querySelector('#w-timezone');
    this.latLon = document.querySelector('.w-latLon');
    this.summary = document.querySelector('#w-summary');
    // this.string = document.querySelector('#w-string');
    this.icon = document.querySelector('#w-icon');
    this.skycon = document.querySelector('#skycon');
    this.humidity = document.querySelector('#w-humidity');
    this.dewPoint = document.querySelector('#w-dewPoint');
    this.temperature = document.querySelector('#w-temp');
    this.apparentTemperature = document.querySelector('#w-apparent-temp');
    this.windSpeed = document.querySelector('#w-wind');
  }

  // weather data for html
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

    // init skycons for darksky (https://github.com/darkskyapp/skycons)
    let skycons = new Skycons();
    // add skycon to canvas tag
    skycons.add(this.skycon, weather.currently.icon);
    // animate
    skycons.play();
  }

  // skycons(){
  //   let icons = new Skycons({'color': '#FFFFFF'});
  //   let iconList = [
  //     'clear-day',
  //     'clear-night',
  //     'partly-cloudy-day',
  //     'partly-cloudy-night',
  //     'cloudy',
  //     'rain',
  //     'sleet',
  //     'snow',
  //     'wind',
  //     'fog'
  //   ];

  //   for(let i; i = iconList.length; i--){
  //     let weatherType = iconList[i];
  //     let elements = document.getElementsByClassName(weatherType);

  //     for(let e; e = elements.length; e--){
  //       icons.set(elements[e], weatherType);
  //     }
  //   }

  //   icons.play();
  // }
}
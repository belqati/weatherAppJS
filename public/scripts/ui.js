class UI {
  constructor(){
    this.timezone = document.querySelector('#w-timezone');
    this.placeName = document.querySelector('#placeName');
    this.latLon = document.querySelector('.w-latLon');
    this.summary = document.querySelector('#w-summary');
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

  // paint weather data and skycons for html
  paint(weather){
    this.timezone.textContent = `Timezone: ${weather.timezone}`;
    this.latLon.textContent = `Latitude & Longitude: ${weather.latitude.toFixed(4)}, ${weather.longitude.toFixed(4)}`;
    this.summary.textContent = `Conditions: ${weather.currently.summary}`;
    this.humidity.innerHTML = `<i class="fas fa-hot-tub mr-2"></i> Relative Humidity: ${Math.round(weather.currently.humidity*100)}%`;

    this.cloudCover.innerHTML = `<i class="fas fa-cloud mr-2"></i> Cloud Cover: ${Math.round(weather.currently.cloudCover*100)}%`;

    // init skycons for darksky (https://github.com/darkskyapp/skycons)
    let skycons = new Skycons();
    // add skycon to canvas tag
    skycons.add(this.skycon, weather.currently.icon);
    // animate
    skycons.play();
  }

  // paint Fahrenheit and mph
  paintF(f){
    this.dewPoint.innerHTML = `<i class="fas fa-tint mr-2"></i> Dew Point: ${f.currently.dewPoint} °F`;
    this.temperature.innerHTML = `<i class="fas fa-thermometer-half mr-2"></i> Temperature: ${f.currently.temperature} °F`;
    this.apparentTemperature.innerHTML = `<i class="fas fa-thermometer mr-2"></i> Feels Like: ${f.currently.apparentTemperature} °F`;
    this.windSpeed.innerHTML = `<i class="fas fa-flag mr-2"></i> Wind Speed: ${f.currently.windSpeed} mph`;    
  }

  // paint Celsius and meter/second
  paintC(c){
    this.dewPoint.innerHTML = `<i class="fas fa-tint mr-2"></i> Dew Point: ${((5/9)*(c.currently.dewPoint-32)).toFixed(2)} °C`;
    this.temperature.innerHTML = `<i class="fas fa-thermometer-half mr-2"></i> Temperature: ${((5/9)*(c.currently.temperature-32)).toFixed(2)} °C`;
    this.apparentTemperature.innerHTML = `<i class="fas fa-thermometer mr-2"></i> Feels Like: ${((5/9)*(c.currently.apparentTemperature-32)).toFixed(2)} °C`;
    this.windSpeed.innerHTML = `<i class="fas fa-flag mr-2"></i> Wind Speed: ${(c.currently.windSpeed*0.44704).toFixed(2)} m/sec`;    
  }

  // paint placeName
  paintPlace(place){
    this.placeName.textContent = place;
  }

  // clear form inputs
  clear(){
    this.newLocation.value = '';
    this.lat.value = '';
    this.lon.value = '';
  }

  // show alert for body and timeOut
  showAlertBody(message, className){
    // create div element
    const div = document.createElement('div');
    // add two classes to div: 'alert' for timeOut of alert, 'className' for style (via CSS)
    div.className = `alert ${className} mt-4`;
    // append message argument to div as text
    div.appendChild(document.createTextNode(message));
    // get parent element
    // const container = document.querySelector('.container');
    const body = document.querySelector('.container');
    // get form element
    const alertBody = document.querySelector('#alertBody');
    // insert div alert within body, immediately before the form
    body.insertBefore(div, alertBody);

    // remove div after 3s
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // show alert for modal and timeOut
  showAlertModal(message, className){
    // create div element
    const div = document.createElement('div');
    // add two classes to div: 'alert' for timeOut of alert, 'className' for style (via CSS)
    div.className = `alert ${className}`;
    // append message argument to div as text
    div.appendChild(document.createTextNode(message));
    // get parent element
    // const container = document.querySelector('.container');
    const modalBody = document.querySelector('.modal-body');
    // get form element
    const form = document.querySelector('#w-form');
    // insert div alert within modalBody, immediately before the form
    modalBody.insertBefore(div, form);

    // remove div after 3s
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }
}
class Storage {
  constructor(){
    this.lat;
    this.lon;
    this.tempFC;
    this.defaultLat = 36.2048;
    this.defaultLon = 138.2529;
    this.defaultTempFC = 'fahrenheit';
  }

  // lat/lon location logic
  getLocationData(){
    if(localStorage.getItem('lat') === null){
      this.lat = this.defaultLat;
    } else {
      this.lat = localStorage.getItem('lat');
    }

    if(localStorage.getItem('lon') === null){
      this.lon = this.defaultLon;
    } else {
      this.lon = localStorage.getItem('lon');
    }

    return {
      lat: this.lat,
      lon: this.lon,
    }
  }

  // temp unit type logic
  getTempFC(){
    if(localStorage.getItem('tempFC') === null){
      this.tempFC = this.defaultTempFC;
    } else {
      this.tempFC = localStorage.getItem('tempFC');
    }

    return {
      tempFC: this.tempFC
    }
  }

  setLocationData(lat, lon){
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
  }

  setTempFC(tempFC){
    localStorage.setItem('tempFC', tempFC);
  }
}
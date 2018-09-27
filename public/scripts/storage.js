class Storage {
  constructor(){
    this.lat;
    this.lon;
    this.placeName;
    this.defaultLat = 36.2048;
    this.defaultLon = 138.2529;
    this.defaultPN = 'Nagawa, Japan';
  }

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

    if(localStorage.getItem('placeName') === null){
      this.placeName = this.defaultPN;
    } else {
      this.placeName = localStorage.getItem('placeName');
    }

    return {
      lat: this.lat,
      lon: this.lon,
      placeName: this.placeName
    }
  }

  setLocationData(lat, lon){
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
  }

  setPlaceName(placeName){
    localStorage.setItem('placeName', placeName);
  }
}
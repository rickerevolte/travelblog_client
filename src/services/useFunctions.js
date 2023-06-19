import {
    ref
} from "vue";

export function useGeolocation(lat, lng) {
    // const coords = ref({ latitude: 53.5517, longitude: 9.96 });
    const coords = ref({ latitude: lat, longitude: lng });
    return {
        coords,
    }
}
export function getTemperature(data) {
    let tempC = (data.main.temp - 273.19);
    let tempCRound = Math.round(tempC * 10) / 10;
    return tempCRound;
}
export function getTempMax(data) {

    let tempMaxC = (data.main.temp_max - 273.19);
    let tempMaxCRound = Math.round(tempMaxC * 10) / 10;
    return tempMaxCRound;
}
export function getTempMin(data) {

    let tempMinC = (data.main.temp_min - 273.19);
    let tempMinCRound = Math.round(tempMinC * 10) / 10;
    return tempMinCRound;
}
// GeoData is fetched directly by NewPostView.vue
export function getGeoData(data) {
    console.log("function getGeoData called");
    console.log(data);
    let lat = data.coord.lat;
    let lng = data.coord.lon;
    let geoData = { lat, lng }
    return geoData;
}
export function getWeatherDescription(data) {
    let description = data.weather[0].description;
    return description;
}
export function getWeatherIcon(data) {
    let weatherIcon = data.weather[0].icon;
    return weatherIcon;
}
export async function checkCityCountry(data) {
  console.log(`usefunction called with ${data}`);
    const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
    if (data == "") {
      alert("please enter a city");
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.userCity}&appid=${OPENWEATHER_KEY}`;
      const response = await fetch(url);
      const geoData = await response.json();
      console.log(geoData.cod);
      if (geoData.cod == 404) {
        alert(
          `City ${this.userCity} not found - please check spelling or try next bigger city`
        );
        this.userCity = "";
      } else {
        console.log(geoData);
        this.userGeoData = geoData;
        this.userCountry = geoData.sys.country;
        let text = `found ${this.userCity}, in ${this.userCountry} – is this correct?`;
        console.log(text);
        if (confirm(text) == true) {
          this.userCity = this.userCity;
          this.userCountry = this.userCountry;
          this.userCityCountryCheck = true;
        } else {
          this.userCity = "";
          this.userCountry = "";
        }
      }
    }
  }
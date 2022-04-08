import {
    ref
} from "vue";

export function useGeolocation(lat, lng) {
    // const coords = ref({ latitude: 53.5517, longitude: 9.96 }); //my homeplace
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
//GeoData is fetched directly by NewPostView.vue
// export function getGeoData(data) {
//     console.log("function getGeoData called");
//     console.log(data);
//     let lat = data.coord.lat;
//     let lng = data.coord.lon;
//     let geoData = { lat, lng }
//     return geoData;
// }
export function getWeatherDescription(data) {
    let description = data.weather[0].description;
    return description;
}
export function getWeatherIcon(data) {
    let weatherIcon = data.weather[0].icon;
    return weatherIcon;
}
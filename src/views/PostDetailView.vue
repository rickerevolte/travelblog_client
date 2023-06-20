<template>
  <div class="content">
    <div id="button">
      <button @click="backButton()">back</button>
    </div>
    <div id="title">
      <h1>{{ selectedPost.city }}, {{ selectedPost.country }}</h1>
      <h2>{{ selectedPost.headLine }}</h2>
      <h5>by: {{ selectedPost.author }}</h5>

      <img class="image" :src="selectedPost.auth_pic" alt="image?" />
    </div>
    <div id="wrapper">
      <PostDetail v-if="!notFound" :selectedPost="selectedPost"> </PostDetail>
      <div v-else>Wrong URL that Post does not exist</div>
      <div class="middleCol">
        <div id="DetailMapDiv">
          <GMapMap
            :center="center"
            :zoom="12"
            map-type-id="roadmap"
            style="width: 100%; height: 300px"
          >
          </GMapMap>
        </div>
      </div>
      <PostWeather
        :city="selectedPost.city"
        :temperature="temperature"
        :description="description"
        :weatherIconURL="weatherIconURL"
        :tempMax="tempMax"
        :tempMin="tempMin"
      >
      </PostWeather>
    </div>
  </div>
</template>

<script>
import PostDetail from "../components/PostDetail.vue";
import PostWeather from "../components/PostWeather.vue";
import { getTempMax } from "../services/useFunctions";
import { getTempMin } from "../services/useFunctions";
import { getTemperature } from "../services/useFunctions";
import { getWeatherIcon } from "../services/useFunctions";
import { getWeatherDescription } from "../services/useFunctions";

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default {
  name: "App",
  components: {
    PostDetail,
    PostWeather,
  },
  data: function () {
    return {
      center: { lat: 51.093048, lng: 6.84212 },
      allPosts: [],
      selectedPost: {},
      weatherData: [],
      city: "",
      temperature: 0,
      tempMax: 0,
      tempMin: 0,
      lat: 0,
      lng: 0,
      geoData: {},
      description: "",
      weatherIcon: "",
      weatherIconURL: ``,
      notFound: false,
    };
  },
  created() {
    const Id = this.$route.params.id;
    let jsonNewSortLocs = localStorage.getItem("myLocalStorageSortedLocations");
    let localLoadedPosts = JSON.parse(jsonNewSortLocs);
    this.allPosts = localLoadedPosts;

    for (let i = 0; i < this.allPosts.length; i++) {
      if (String(this.allPosts[i].id) === Id) {
        this.selectedPost = this.allPosts[i];
        this.city = this.selectedPost.city;
      }
    }
    let clickedLat = this.selectedPost.lat;
    let clickedLng = this.selectedPost.lng;
    let clickedLocationCoords = { lat: clickedLat, lng: clickedLng };
    this.center = clickedLocationCoords;
  },
  // weather by city
  async mounted() {
    let city = this.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    this.weatherData = result;
    this.temperature = getTemperature(this.weatherData);
    this.tempMax = getTempMax(this.weatherData);
    this.tempMin = getTempMin(this.weatherData);
    this.description = getWeatherDescription(this.weatherData);
    this.weatherIcon = getWeatherIcon(this.weatherData);
    this.weatherIconURL = `https://openweathermap.org/img/wn/${this.weatherIcon}@2x.png`;
  },
  methods: {
    backButton() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  top: 90px;
}

#button {
  padding: 10px;
}
.image {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
#wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  padding-left: 10px;
}
#wrapper > div {
  width: 30%;
}
#title {
  padding-left: 10px;
}
.middleCol {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
#DetailMapDiv {
  width: 100%;
  border-radius: 10px;
}
/* See .assets/css/styles.css for  
.vue-map-container
.vue-map
.vue-map-hidden
*/
</style>

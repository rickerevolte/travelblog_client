<template>
  <div class="wrapper">
    <div id="BlogPostwrapper">
      <BlogPostPreview
        v-for="(location, index) in this.locations"
        :key="index"
        @fotoClicked="reloadSelectedFotoMap(location, id)"
        @readBlogPostClicked="loadPostDetailView(location.id)"
        @editPostClicked="editThisPost(location.id)"
        :userIsLoggedIn="checkUserLogIn"
        :image="location.image"
        :city="location.city"
        :country="location.country"
        :from="location.from"
        :to="location.to"
        :headline="location.headLine"
        :author="location.author"
        :auth_pic="location.auth_pic"
        :id="location.id"
      ></BlogPostPreview>
    </div>
    <div id="GMapDiv">
      <GMapMap
        :center="center"
        :zoom="zoom"
        map-type-id="roadmap"
        style="width: 100% !important"
      >
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="openMarker(m.id)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerId === m.id"
          >
            <InfoWindow
              :id="m.id"
              :city="m.city"
              :url="m.url"
              :from="m.from"
              :to="m.to"
              :auth_pic="m.auth_pic"
              :headLine="m.headLine"
              :author="m.author"
            />
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </div>
  </div>
</template>

<script>
import locationsApi from "../services/locationsAPI";
import BlogPostPreview from "../components/BlogPostPreview.vue";
import InfoWindow from "../components/InfoWindow.vue";

export default {
  props: ["checkUserLogIn"],
  data() {
    return {
      locations: [],
      fotoClickedLocation: {},
      center: { lat: 53.558, lng: 9.944 },
      markers: [],
      zoom: 2,
      openedMarkerId: null,
    };
  },
  components: {
    InfoWindow,
    BlogPostPreview,
  },

  created: async function () {
    this.locations = await locationsApi.getAllLocations();
    this.locations.sort(function (a, b) {
      return b.from.localeCompare(a.from);
    });
    let jsonStringOfSortedLocs = JSON.stringify(this.locations);
    localStorage.setItem(
      "myLocalStorageSortedLocations",
      jsonStringOfSortedLocs
    );

    for (let i = 0; i < this.locations.length; i++) {
      let markerPosition = {
        url: `/posts/${String(this.locations[i].id)}`,
        id: this.locations[i].id,
        from: this.locations[i].from,
        to: this.locations[i].to,
        headLine: this.locations[i].headLine,
        auth_pic: this.locations[i].auth_pic,
        position: { lat: this.locations[i].lat, lng: this.locations[i].lng },
        author: this.locations[i].author,
      };
      this.markers.push(markerPosition);
    }
  },
  methods: {
    reloadSelectedFotoMap(location) {
      let clickedLocationCoords = { lat: location.lat, lng: location.lng };
      this.center = clickedLocationCoords;
    },
    openMarker(id) {
      this.openedMarkerId = id;
      localStorage.setItem("id", this.openedMarkerId);
    },
    loadPostDetailView(id) {
      this.$router.push({
        path: "/posts/" + String(id),
      });
    },
    async editThisPost(id) {
      this.$router.push({
        path: "/edit/" + String(id),
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  top: 90px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% - 0px);
  height: 100%;
}

.wrapper > div {
  width: calc(50% - 15px);
}

#BlogPostwrapper {
  height: calc(100vh - 80px);
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 10px 0 10px;
}

#GMapDiv {
  border: yellowgreen solid 0px;
  min-width: 290px;
}

/* See .assets/css/styles.css for  
.vue-map-container
.vue-map
.vue-map-hidden
*/

h2 {
  padding: 10px;
}
</style>

<template>
    <div class="wrapper">
        <div id="BlogPostwrapper">
            <BlogPostPreview v-for="(location, index) in this.locations" :key="index" 
                            @fotoClicked="reloadSelectedFotoMap(location)"
                            @readBlogPostClicked="loadPostDetailView(location.id)"
                            :image ="location.image"
                            :city="location.city" 
                            :country="location.country"
                            :from="location.from" 
                            :headline="location.headLine" 
                            :author="location.author"
                            :auth_pic="location.auth_pic"
                            :id="location.id"
                            ></BlogPostPreview>
        </div>
        <div>
            <GMapMap
                :center="center"
                :zoom="zoom"
                map-type-id="terrain"
                style="width: 500px; height: 300px">
                    <GMapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="openMarker(m.id)">
                        <GMapInfoWindow
                            :closeclick="true"
                            @closeclick="openMarker(null)"
                            :opened="openedMarkerId === m.id">
                                <InfoWindow
                                :id="m.id"
                                :city="m.city"
                                :url="m.url"
                                :from="m.from"
                                :to="m.to"
                                :auth_pic="m.auth_pic"
                                :headLine="m.headLine"
                                :author="m.author"/>
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
    name: 'App',
        data() {
            return {
                locations: [],
                fotoClickedLocation: {},
                center: {lat: 53.558, lng: 9.944},
                markers: [],
                zoom: 2,
                openedMarkerId: null,
            }
        },
    emits: ["locationsSorted"],
    components: {
        InfoWindow,
        BlogPostPreview
    },

    created: async function() {

        this.locations = await locationsApi.getAllLocations();
        this.locations.sort(function(a, b) {
            return b.from.localeCompare(a.from);
        });
        // save this.locations to localStorage for PostDetailView
        let jsonStringOfSortedLocs = JSON.stringify(this.locations);
        localStorage.setItem("myLocalStorageSortedLocations", jsonStringOfSortedLocs);

        for (let i=0; i < this.locations.length; i++) {
            let markerPosition = {
                url: `/posts/${String(this.locations[i].id)}`,
                id: this.locations[i].id,
                from: this.locations[i].from,
                to: this.locations[i].to,
                headLine: this.locations[i].headLine,
                auth_pic: this.locations[i].auth_pic,
                position: {lat: this.locations[i].lat, lng: this.locations[i].lng}, author: this.locations[i].author}
                this.markers.push(markerPosition);
        }
    },
    methods: {
        reloadSelectedFotoMap(location) {
            console.log(`clicked city is = ${location.city}`)
            let clickedLat = location.lat;
            let clickedLng = location.lng;
            let clickedLocationCoords = {lat: clickedLat, lng: clickedLng};
            this.center=clickedLocationCoords;
            console.log(location);
        },
        openMarker(id) {
            this.openedMarkerId = id;
            localStorage.setItem("id", this.openedMarkerId);
        },
        loadPostDetailView(id){
        
            let Id = String(id);
            this.$router.push({
                path: "/posts/" + Id
            });
        }
    },   
}
</script>

<style>
.vue-map {
  position: relative;
  height: 50vh !important;
  z-index: 10;
}
</style>

<style scoped>
.wrapper {
    position: relative;
    top: 90px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(100% - 10px);
    height: 100%;
    gap: 10px;
}
.wrapper > div {
    width: calc(50% - 10px)
}
#BlogPostwrapper {
    height: calc(100vh - 80px);
    overflow: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    padding-left: 10px;
}
h2 {
    padding: 10px;
}
</style>
<template>
    <div class="content">
        <h2>Create a new post</h2>
        <div id="userBox">
            <div>
                <label id="userInput">
                    <table>
                        <tr><th>Your Name *</th></tr>
                            <td><input class = "xxChar" type="text" placeholder="your name" v-model="userName"/></td>
                        <tr><th>City *</th><th>Country</th></tr>
                        <tr><td><input class = "xxChar" type="text" placeholder="your City" v-model="userCity"/></td>
                        <td><input class = "xxChar" type="text" placeholder="your country" v-model="userCountry"/></td></tr>
                        <tr><th>from *</th><th>to</th></tr>
                        <td><input type="date" v-model="userDateFrom"/></td>
                        <td><input type="date" v-model="userDateTo"/></td>
                    </table>
                    <table>
                        <tr><th>headline</th></tr>
                        <tr><td><textarea id = "userHeadLine" class = "userInput" placeholder="add a headline for your trip" v-model="userHeadLine"></textarea></td></tr>
                        <tr><th>short description</th></tr>
                        <tr><td><textarea id = "userShortText" class = "userInput" placeholder="add a short description of your trip" v-model="userShortText"></textarea></td></tr>
                    </table>
                </label>
            </div>
            <div>
                <label id="userInput">
                    <table>
                        <tr><th>full description</th></tr>
                        <tr><td><textarea id = "userLongText" class = "userInput" placeholder="give us the full description of your trip" v-model="userLongText"></textarea></td></tr>
                        <tr><th>image of your location</th></tr>
                        <tr><td><input class = "url" type="text" placeholder="image-url of your location" v-model="userImage"/></td></tr>
                        <tr><th>image of yourself</th></tr>
                        <tr><td><input class = "url" type="text" placeholder="image-url of your self" v-model="user_auth_pic"/></td></tr>
                        <h6>(* required input)</h6>
                        <tr><td><button @click="addPost(whatever)" id="userSubmitButton" class = "button1">add Post</button></td></tr>
                    </table>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import locationsApi from "../services/locationsAPI";

export default {
    data: function() {
        return {
            id: "",
            image: "",
            city: "",
            country: "",
            from: "",
            to: "",
            headLine: "",
            shortText: "",
            longText: "",
            lat: "",
            lng: "",
            author: "",
            auth_pic: ""
        }
    },
    methods: {

        async addPost() {
            const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
            // console.log("addPost clicked")
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.userCity}&appid=${OPENWEATHER_KEY}`;
            const response = await fetch(url);
            const geoData = await response.json();
            //check for highest id in array in localStorage
            let jsonNewSortLocs = localStorage.getItem("myLocalStorageSortedLocations"); 
            let oldLocalStorageArray = JSON.parse(jsonNewSortLocs);
            // console.log(oldLocalStorageArray);
            let highestID = parseInt(oldLocalStorageArray[0].id);
            // console.log(highestID);
            for (let i = 0; i < oldLocalStorageArray.length; i++) {
                if (parseInt(oldLocalStorageArray[i].id) > highestID) {
                    highestID = parseInt(oldLocalStorageArray[i].id);
                }
            }
            let newID=highestID+1;
            const newLocation = {
                id: newID,
                image: this.userImage,
                author: this.userName,
                city: this.userCity,
                country: this.userCountry,
                lat: geoData.coord.lat,
                lng: geoData.coord.lon,
                from: this.userDateFrom,
                to: this.userDateTo,
                headLine: this.userHeadLine,
                shortText: this.userShortText,
                longText: this.userLongText,
                auth_pic: this.user_auth_pic
            };
            console.log(newLocation);
            const result = await locationsApi.addLocation(newLocation);
            alert(result);
            this.$router.push({
                path: "/"
            });
        }
    }
}
</script>

<style scoped>
.content {
    position: relative;
    top: 90px;
}
#userBox {
    padding-left:10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
}
th, td {
    text-align: left;
}
h2 {
    padding: 10px;
}
/* User Input */
.xxChar {
    width: 14ch;
    height: 2ch;
}
.url {
    width: 30ch;
}
.userInput {
    width: 32ch;
    height: 2ch;
    margin-left: 0px;
}
#userHeadline {
    width: 50ch;
}
#userShortText {
    height: 18ch;
}
#userLongText {
    height: 24ch;
}
.button1 {
    margin-top: 0ch;
}
</style>
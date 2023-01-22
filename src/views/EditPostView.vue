<template>
    <div class="content">
        <h2>Edit post</h2>
        <div id="userBox">
            <div>
                <label id="userInput">
                    <table>
                        <tr><th>Your Name *</th></tr>
                            <td><input class = "xxChar" type="text" id="userName" :value="selectedPost.author" /></td>
                        <tr><th>City *</th><th>Country</th></tr>
                        <tr><td><input class = "xxChar" type="text" id="userCity" :value="selectedPost.city"/></td>
                        <td><input class = "xxChar" type="text" id="userCountry" :value="selectedPost.country"/></td></tr>
                        <tr><th>from *</th><th>to</th></tr>
                        <td><input class = "xxChar" id="userDateFrom" :value="selectedPost.from"/></td>
                        <td><input class = "xxChar" id="userDateTo" :value="selectedPost.to"/></td>
                    </table>
                    <table>
                        <tr><th>headline</th></tr>
                        <tr><td><textarea id = "userHeadLine" class = "userInput" :value="selectedPost.headLine"></textarea></td></tr>
                        <tr><th>short description</th></tr>
                        <tr><td><textarea id = "userShortText" class = "userInput" :value="selectedPost.shortText"></textarea></td></tr>
                    </table>
                </label>
            </div>
            <div>
                <label id="userInput">
                    <table>
                        <tr><th>full description</th></tr>
                        <tr><td><textarea id = "userLongText" class = "userInput" :value="selectedPost.longText"></textarea></td></tr>
                        <tr><th>image of your location</th></tr>
                        <tr><td><input class = "url" id="userImage" type="text" :value="selectedPost.image"/></td></tr>
                        <tr><th>image of yourself</th></tr>
                        <tr><td><input class = "url" id="user_auth_pic" type="text" :value="selectedPost.auth_pic"/></td></tr>
                        <h6>(* required input)</h6>
                        <tr><td><button @click="editPost(whatever)" id="userSubmitButton" class = "button1">update Post</button></td></tr>
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
            auth_pic: "",
            selectedPost: {}
        }
    },
    async created() {
        const Id = this.$route.params.id;
        console.log(`EditPostView async created() calling getLocationById(${Id})`);
        const result = await locationsApi.getLocationById(Id);
        // console.log(result);
        const selectedID = parseInt(Id);
        for (let i = 0; i < result.length; i ++) {
            if (result[i].id === selectedID) {
                this.selectedPost = result[i];
                console.log(`${this.selectedPost.city} by ${this.selectedPost.author}`);
            }
        }
    },
    methods: {
        async editPost() {
            const Id = this.$route.params.id;
            console.log(`EditPostView editPost(${Id}) called`)
            const userCity = document.getElementById("userCity").value;
            // // check openweather for country and geodata via city on api.openweathermap.org
            // // !! Not working on Netlify App but on localhost !!
            // // Netlify throws Error: "loading of mixed active content was blocked"
            // const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
            // let url = `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${OPENWEATHER_KEY}`;
            // const response = await fetch(url);
            // const geoData = await response.json();
            // // console.log(geoData)
            // if (geoData.cod == 404) {
            //     alert("city not found - please check spelling or try next bigger city")
            // };
            // let userCountry = document.getElementById("userCountry").value;
            // if (userCountry == "") {
            //     userCountry = geoData.sys.country;
            //     // console.log(userCountry);
            // }
            let user_auth_pic = document.getElementById("user_auth_pic").value;
            if (user_auth_pic.length > 255) {
                alert("URL is too long. Max 255 characters is allowed");
                user_auth_pic = prompt(`enter new URL`, document.getElementById("user_auth_pic").value);
            }

            const editedPost = {
                id: this.selectedPost.id,
                image : document.getElementById("userImage").value,
                city: userCity,
                from: document.getElementById("userDateFrom").value,
                to: document.getElementById("userDateTo").value,
                headLine: document.getElementById("userHeadLine").value,
                shortText: document.getElementById("userShortText").value,
                longText: document.getElementById("userLongText").value,
                // // provided by api.openweathermap.org:
                // country: userCountry,
                // lat: geoData.coord.lat,
                // lng: geoData.coord.lon,
                author: document.getElementById("userName").value,
                auth_pic: user_auth_pic
            }
            const result = await locationsApi.editLocation(editedPost);
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
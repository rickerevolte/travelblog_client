<template>
  <div class="content">
    <h2>Edit post</h2>
    <div id="userBox">
      <div>
        <label id="userInput">
          <table>
            <tr>
              <th>Your Name *</th>
            </tr>
            <td>
              <input
                class="xxChar"
                type="text"
                placeholder="your name"
                v-model="selectedPost.author"
              />
            </td>
            <tr>
              <th>City *</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>
                <input
                  class="xxChar"
                  type="text"
                  placeholder="your City"
                  v-model="selectedPost.city"
                />
              </td>
              <td>
                <input
                  class="xxChar"
                  type="text"
                  placeholder="your country"
                  v-model="selectedPost.country"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="cityCheckBtn"
                  @click="checkCityCountry(selectedPost.city)"
                >
                  Check City
                </button>
              </td>
            </tr>
          </table>
          <div id="warningBox" style="display: none">
            please check city and country
          </div>
          <table>
            <tr>
              <th>from *</th>
              <th>to</th>
            </tr>
            <td><input type="date" v-model="this.selectedPost.from" /></td>
            <td><input type="date" v-model="this.selectedPost.to" /></td>
          </table>
          <table>
            <tr>
              <th>headline</th>
            </tr>
            <tr>
              <td>
                <textarea
                  id="userHeadLine"
                  class="userInput"
                  placeholder="add a headline for your trip"
                  v-model="selectedPost.headLine"
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>short description</th>
            </tr>
            <tr>
              <td>
                <textarea
                  id="userShortText"
                  class="userInput"
                  placeholder="add a short description of your trip"
                  v-model="selectedPost.shortText"
                ></textarea>
              </td>
            </tr>
          </table>
        </label>
      </div>
      <div>
        <label id="userInput">
          <table>
            <tr>
              <th>full description</th>
            </tr>
            <tr>
              <td>
                <textarea
                  id="userLongText"
                  class="userInput"
                  placeholder="give us the full description of your trip"
                  v-model="selectedPost.longText"
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>image of your location</th>
            </tr>
            <tr>
              <td>
                <input
                  class="url"
                  type="text"
                  placeholder="image-url of your location"
                  v-model="selectedPost.image"
                />
              </td>
            </tr>
            <tr>
              <th>image of yourself</th>
            </tr>
            <tr>
              <td>
                <input
                  class="url"
                  type="text"
                  placeholder="image-url of your self"
                  v-model="selectedPost.auth_pic"
                />
              </td>
            </tr>
            <h6>(* required input)</h6>
          </table>
          <table>
            <tr>
              <td>
                <button
                  @click="editPost()"
                  id="userSubmitButton"
                  class="button1"
                >
                  update Post
                </button>
              </td>
              <td>
                <button @click="deleteThisPost(id)" class="button1">
                  delete
                </button>
              </td>
              <td>
                <button @click="backButton()">back</button>
              </td>
            </tr>
          </table>
          <!-- <button
                  @click="checkUserInput()"
                  id="userSubmitButton"
                  class="button1"
                >
                  check input
                </button> -->
          <p id="demo" style="font-size: small"></p>
        </label>
        <button id="myBtn" @click="openModal()">Open Modal</button>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeModal()">&times;</span>
            <p>{{ this.userName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import locationsApi from "../services/locationsAPI";

export default {
  data: function () {
    return {
      userCityCountryCheck: false,
      // id: "",
      // image: "",
      // city: "",
      // country: "",
      // userDateFrom: "",
      // userDateTo: "",
      // headLine: "",
      // shortText: "",
      // longText: "",
      // lat: "",
      // lng: "",
      // author: "",
      // auth_pic: "",
      selectedPost: {},
      userGeoData: {},
    };
  },
  async created() {
    const Id = this.$route.params.id;
    console.log(`EditPostView async created() calling getLocationById(${Id})`);
    const result = await locationsApi.getLocationById(Id);
    // console.log(result);
    const selectedID = parseInt(Id);
    for (let i = 0; i < result.length; i++) {
      if (result[i].id === selectedID) {
        this.selectedPost = result[i];
        console.log(`${this.selectedPost.city} by ${this.selectedPost.author}`);
      }
    }
    // this.userDateFrom = this.selectedPost.from;
    // this.userDateTo = this.selectedPost.to;
  },
  methods: {
    async checkCityCountry() {
      console.log("Say Hello to Editcheck");
      const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
      this.city = this.selectedPost.city;
      if (this.city == "") {
        alert("please enter a city");
      } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${OPENWEATHER_KEY}`;
        const response = await fetch(url);
        const geoData = await response.json();
        console.log(geoData.cod);
        if (geoData.cod == 404) {
          alert(
            `City ${this.city} not found - please check spelling or try next bigger city`
          );
          this.selectedPost.city = "";
        } else {
          console.log(geoData);
          this.userGeoData = geoData;
          this.country = geoData.sys.country;
          let text = `found ${this.city}, in ${this.country} – is this correct?`;
          if (confirm(text) == true) {
            this.city = this.city;
            this.country = this.country;
            this.userCityCountryCheck = true;
            const cityCheckBtn = document.getElementById("cityCheckBtn");
            const warningBox = document.getElementById("warningBox");
            warningBox.style.display = "none";
            cityCheckBtn.style.color = "black";
          } else {
            this.userCity = "";
            this.userCountry = "";
          }
        }
      }
    },

    async editPost() {
      if (this.userCityCountryCheck) {
        const Id = this.$route.params.id;
        console.log(`EditPostView editPost(${Id}) called`);
        if (this.selectedPost.auth_pic.length > 255) {
          alert("URL is too long. Max 255 characters is allowed");
          user_auth_pic = prompt(`enter new URL`, this.selectedPost.auth_pic);
        }
        const editedPost = {
          id: this.selectedPost.id,
          image: this.selectedPost.image,
          city: this.city,
          from: this.selectedPost.from,
          to: this.selectedPost.to,
          headLine: this.selectedPost.headLine,
          shortText: this.selectedPost.shortText,
          longText: this.selectedPost.longText,
          // provided by api.openweathermap.org. Check or block this to deploy on netlify:
          country: this.Country,
          lat: this.userGeoData.coord.lat,
          lng: this.userGeoData.coord.lon,
          // end of code to block or fix on netlify
          author: this.selectedPost.author,
          auth_pic: this.selectedPost.auth_pic,
        };
        const result = await locationsApi.editLocation(editedPost);
        console.log(result);
        this.$router.push({
          // path: "/posts/" + String(this.selectedPost.id),
          path: "/",
        });
      } else {
        const cityCheckBtn = document.getElementById("cityCheckBtn");
        const warningBox = document.getElementById("warningBox");
        warningBox.style.display = "block";
        cityCheckBtn.style.color = "red";
      }
    },
    backButton() {
      const Id = this.$route.params.id;
      this.$router.push({
        path: "/",
      });
    },
    async deleteThisPost() {
      // alert("sorry, permission denied");
      const Id = this.$route.params.id;
      let text = `are you sure to delete post no: ${Id}?`;
      if (confirm(text) == true) {
        // text = `You clicked OK to delete post no: ${Id}`;
        const result = await locationsApi.deleteLocation(Id);
        // console.log(result);
        console.log(`deleted post ${Id}`);
        // alert(`click on read post and then go back to see effect delete id: ${id} really happened ;)`);
        this.$router.push({
          path: "/",
        });
      } else {
        text = `
        <p>you cancelled deleting post no: ${Id}</p>
        `;
      }
      document.getElementById("demo").innerHTML = text;
    },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  top: 90px;
}
#userBox {
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
th,
td {
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
  margin-right: 15px;
}
</style>

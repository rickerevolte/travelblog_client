<template>
  <h2>{{ title }}</h2>
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
              v-model="uIF.author"
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
                v-model="uIF.city"
              />
            </td>
            <td>
              <input
                class="xxChar"
                type="text"
                placeholder="your country"
                v-model="uIF.country"
              />
            </td>
          </tr>
          <tr>
            <td>
              <button id="cityCheckBtn" @click="checkCityCountry()">
                Check City
              </button>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <th>from *</th>
            <th>to</th>
          </tr>
          <td>
            <input type="date" v-model="uIF.from" />
          </td>
          <td><input type="date" v-model="uIF.to" /></td>
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
                v-model="uIF.headLine"
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
                v-model="uIF.shortText"
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
                v-model="uIF.longText"
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
                v-model="uIF.image"
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
                v-model="uIF.auth_pic"
              />
            </td>
          </tr>
          <h6>(* required input)</h6>
        </table>
        <table>
          <tr>
            <td>
              <button @click="crudAction1()" class="myBtn">
                {{ buttonOneText }}
              </button>
            </td>
            <td>
              <button @click="crudAction2()" class="myBtn">
                {{ buttonTwoText }}
              </button>
            </td>
            <td>
              <button @click="backButton()" class="myBtn">back</button>
            </td>
          </tr>
        </table>
      </label>
      <table>
        <tr>
          <td>
            <button id="myBtn" @click="openModal()">Preview</button>
          </td>
        </tr>
      </table>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal()">&times;</span>
          <p>{{ this.uIF.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="messageBox">{{ messageBoxText }}</div> -->
</template>

<script>
import locationsApi from "../services/locationsAPI";
import PostDetailView from "../views/PostDetailView.vue";
import { checkCityCountry } from "../services/useFunctions";

export default {
  props: ["title", "buttonOneText", "buttonTwoText", "messageBoxText"],
  emits: [
    "cityCheckClicked",
    "noCityInput",
    "noCityFound",
    "buttonOneClicked",
    "buttonTwoClicked",
  ],
  data: function () {
    return {
      uIF: {
        author: "",
        city: "",
        country: "",
        from: "",
        to: "",
        headLine: "",
        shortText: "",
        longText: "",
        image: "",
        auth_pic: "",
        geoData: {},
      },
      cityCountryCheck: false,
      showMessagePost: false,
      showMessageEdit: false,
      showMesageDelete: false,
    };
  },
  async created() {
    const Id = this.$route.params.id;
    if (Id) {
      // console.log(
      //   `EditPostView async created() calling getLocationById(${Id})`
      // );
      const result = await locationsApi.getLocationById(Id);
      // console.log(result);
      const selectedID = parseInt(Id);
      for (let i = 0; i < result.length; i++) {
        if (result[i].id === selectedID) {
          this.uIF = result[i];
          // console.log(`${this.uIF.city} by ${this.uIF.author}`);
        }
      }
    } else {
      console.log("no Id, NewPostView is my parent");
    }
  },
  components: {
    PostDetailView,
  },
  methods: {
    // When the user clicks the button, open the modal
    openModal() {
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    closeModal() {
      console.log("template clicked");
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    },
    async checkCityCountry() {
      const uIFToSend = this.uIF;
      const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
      const cityCheckBtn = document.getElementById("cityCheckBtn");
      // const messageBox = document.getElementById("messageBox");
      if (this.uIF.city == "") {
        const author = this.uIF.author;
        this.$emit("noCityInput", author);
      } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.uIF.city}&appid=${OPENWEATHER_KEY}`;
        const response = await fetch(url);
        const geoData = await response.json();
        console.log(geoData.cod);
        if (geoData.cod == 404) {
          const city = this.uIF.city;
          this.$emit("noCityFound", city);
        } else {
          let city = this.uIF.city;
          this.uIF.geoData = geoData;
          this.uIF.country = geoData.sys.country;
          let text = `Found ${city}, is this correct?`;
          if (confirm(text) == true) {
            this.cityCountryCheck = true;
            cityCheckBtn.style.color = "green";
            cityCheckBtn.innerHTML = "City confirmed";
            let cityCountryCheckEmit = this.cityCountryCheck;
            this.$emit(
              "cityCheckClicked",
              city,
              uIFToSend,
              cityCountryCheckEmit
            );
            console.log("UserInput says yes");
          } else {
            this.uIF.city = "";
            this.uIF.country = "";
            // messageBox.style.display = "none";
            cityCheckBtn.style.color = "black";
          }
        }
      }
    },
    crudAction1() {
      const userDataToSend = this.uIF;
      if (this.cityCountryCheck) {
        this.$emit("buttonOneClicked", userDataToSend);
      } else {
        this.$emit("buttonOneClicked", userDataToSend);
        const cityCheckBtn = document.getElementById("cityCheckBtn");
        cityCheckBtn.style.color = "red";
      }
    },
    crudAction2() {
      const userDataToSend = this.uIF;
      const text = "Hi, button 2 has been clicked";
      this.$emit("buttonTwoClicked", text, userDataToSend);
    },
    backButton() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped>
#userBox {
  width: 100%;
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
.myBtn {
  margin-top: 0ch;
  margin-right: 15px;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

#messageBox {
  display: block;
  width: 61ch;
  border: black solid 1px;
  background-color: red;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
  padding-left: 5px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>

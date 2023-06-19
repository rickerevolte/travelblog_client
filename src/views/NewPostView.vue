<template>
  <div class="content">
    <UserInput
      title="Create a new post"
      buttonOneText="add Post"
      buttonTwoText="clear"
      @city-check-clicked="
        (emittedCity, emittedObject) => {
          userInputCity = emittedCity;
          userInputObject = emittedObject;
          setCityCheckTrue(userInputCity);
        }
      "
      @button-one-clicked="
        (emittedObject) => {
          userPost = emittedObject;
          addPostClicked();
        }
      "
      @button-two-clicked="
        (emittedText) => {
          massage = emittedText;
          doAnotherThing(massage);
        }
      "
      @no-city-input="
        (emittedAuthor) => {
          author = emittedAuthor;
          askForCity(author);
        }
      "
      @no-city-found="
        (emittedCity) => {
          city = emittedCity;
          cityNotFound(city);
        }
      "
      :messageBoxText="this.MessageToUser"
    ></UserInput>
    <MessageBox
      v-if="showMessageBox"
      :style="{ backgroundColor: MBoxBGColor }"
      :MessageToUser="this.MessageToUser"
      :showBtnBox="this.showBtnBox"
      @post-ok="() => addPostClicked()"
      @post-cancel="() => cancelClicked()"
    >
    </MessageBox>
    <div v-else></div>
  </div>
</template>

<script>
import locationsApi from "../services/locationsAPI";
import UserInput from "../components/UserInput.vue";
import MessageBox from "../components/MessageBox.vue";

export default {
  components: {
    UserInput,
    MessageBox,
  },
  data() {
    return {
      showMessageBox: false,
      MBDisplay: "block",
      MBoxBGColor: "",
      MessageToUser: "",
      showBtnBox: false,
      userInputCity: "",
      userInputObject: {},
      cityCountryCheck: false,
      userPost: {
        author: "",
        city: "",
        country: "",
        from: "",
        to: "",
        headLine: "",
        shortText: "",
        longText: "",
        image: "",
        pic: "",
        geoData: {},
      },
    };
  },
  methods: {
    setCityCheckTrue() {
      this.cityCountryCheck = true;
      this.showMessageBox = true;
      this.MBoxBGColor = "orange";
      this.MessageToUser = `Found ${this.userInputCity}. Click 'add Post' to continue.`;
    },
    doAnotherThing(blabla) {
      console.log(blabla);
      let text = "this will clear all your input. Ok to proceed?";
      if (confirm(text) == true) {
        this.$router.go();
      }
    },
    askForCity(whoEver) {
      this.showMessageEditBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `Hello ${whoEver} – Please enter a City`;
      this.showBtnBox = false;
    },
    cityNotFound(noCity) {
      this.showMessageEditBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `${noCity} not found – Please check spelling or try next bigger city`;
      this.showBtnBox = false;
    },
    addPostClicked() {
      if (this.cityCountryCheck) {
        console.log("city check ok");
        let jsonNewSortLocs = localStorage.getItem(
          "myLocalStorageSortedLocations"
        );
        let oldLocalStorageArray = JSON.parse(jsonNewSortLocs);
        let highestID = parseInt(oldLocalStorageArray[0].id);
        for (let i = 0; i < oldLocalStorageArray.length; i++) {
          if (parseInt(oldLocalStorageArray[i].id) > highestID) {
            highestID = parseInt(oldLocalStorageArray[i].id);
          }
        }
        let newID = highestID + 1;
        const newLocation = {
          id: newID,
          image: this.userPost.image,
          author: this.userPost.author,
          city: this.userPost.city,
          country: this.userPost.country,
          lat: this.userPost.geoData.coord.lat,
          lng: this.userPost.geoData.coord.lon,
          from: this.userPost.from,
          to: this.userPost.to,
          headLine: this.userPost.headLine,
          shortText: this.userPost.shortText,
          longText: this.userPost.longText,
          auth_pic: this.userPost.pic,
        };
        this.showMessageBox = true;
        this.MBoxBGColor = "orange";
        this.MessageToUser = "Posting...";
        this.addPost(newLocation);
      } else {
        this.showMessageBox = true;
        this.MBoxBGColor = "red";
        this.MessageToUser = `Dear ${this.userPost.author}, please check City`;
      }
    },
    async addPost(newPost) {
      const result = await locationsApi.addLocation(newPost);
      console.log(result);
      setTimeout(() => {
        this.$router.push({
          path: "/",
        });
      }, 3000);
    },
    cancelClicked() {
      this.showMessageBox = true;
      this.MBoxBGColor = "lime";
      this.MessageToUser = `you cancelled posting ${this.userInputCity}`;
      this.showBtnBox = false;
    },
  },
};
</script>

<style>
.content {
  position: relative;
  top: 90px;
}
h1 {
  color: black;
}
</style>

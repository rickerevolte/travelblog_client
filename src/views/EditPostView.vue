<template>
  <div class="content">
    <UserInput
      title="Edit post"
      buttonOneText="update Post"
      buttonTwoText="delete Post"
      @city-check-clicked="
        (emittedCity, emittedObject) => {
          userInputCity = emittedCity;
          userInputObject = emittedObject;
          cityCheckedOk(userInputCity);
        }
      "
      @button-one-clicked="
        (emittedObject) => {
          userPost = emittedObject;
          editPostClicked();
        }
      "
      @button-two-clicked="
        (emittedText, emittedObject) => {
          message = emittedText;
          userPost = emittedObject;
          deleteClicked();
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
      @ok="
        () => {
          confirmOK = true;
          setOK();
          checkAction();
        }
      "
      @cancel="
        () => {
          confirmCancel = true;
          setCancel();
          checkAction();
        }
      "
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
  data: function () {
    return {
      showMessageBox: false,
      MBoxBGColor: "",
      MessageToUser: "",
      showBtnBox: false,
      deleteOK: false,
      editOK: false,
      confirmOK: false,
      confirmCancel: false,
      selectedPost: {},
      userInputCity: "",
      userInputObject: {},
      cityCountryCheck: false,
      userPost: {
        id: 0,
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
        geoData: {
          coord: {
            lat: 0,
            lng: 0,
          },
        },
      },
      userPostToUpdate: {},
    };
  },
  methods: {
    // basic methods
    cityCheckedOk() {
      this.cityCountryCheck = true;
      this.showMessageBox = true;
      this.MBoxBGColor = "green";
      this.MessageToUser = `Found ${this.userInputCity} – Continue editing and click 'Update' to update your post`;
      this.showBtnBox = false;
    },
    askForCity(whoEver) {
      this.showMessageBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `Hello ${whoEver} – Please enter a City`;
      this.showBtnBox = false;
    },
    cityNotFound(noCity) {
      this.showMessageBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `${noCity} not found – Please check spelling or try next bigger city`;
      this.showBtnBox = false;
    },
    // confirm methods for all parents of UserInput
    setOK() {
      this.checkAction();
    },
    setCancel() {
      this.checkAction();
    },
    // specific methods only for EditPostVue => Delete and Update
    editPostClicked() {
      this.editOK = true;
      if (this.cityCountryCheck) {
        if (this.userPost.auth_pic.length > 255) {
          alert("URL is too long. Max 255 characters is allowed");
          user_auth_pic = prompt(`enter new URL`, this.selectedPost.auth_pic);
        }
        const Id = this.$route.params.id;
        const postToEdit = {
          id: Id,
          image: this.userPost.image,
          city: this.userPost.city,
          from: this.userPost.from,
          to: this.userPost.to,
          headLine: this.userPost.headLine,
          shortText: this.userPost.shortText,
          longText: this.userPost.longText,
          country: this.userPost.country,
          lat: this.userPost.geoData.coord.lat,
          lng: this.userPost.geoData.coord.lon,
          author: this.userPost.author,
          auth_pic: this.userPost.auth_pic,
        };
        this.userPostToUpdate = postToEdit;
        this.cityCountryCheck = false;
        this.showMessageBox = true;
        this.MBoxBGColor = "orange";
        this.MessageToUser = `${this.userPostToUpdate.author}, are you sure to update your Post ${this.userPostToUpdate.city} - "${this.userPostToUpdate.headLine}" ?`;
        this.showBtnBox = true;
      } else {
        // city not checked
        this.showMessageBox = true;
        this.MBoxBGColor = "red";
        this.MessageToUser = `Dear ${this.userPost.author} – Please check City first`;
      }
    },
    deleteClicked() {
      // first level delete, confirmation outstanding
      this.deleteOK = true;
      this.showMessageBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `Dear ${this.userPost.author}, are you sure to delete post no: ${this.userPost.id}?`;
      this.showBtnBox = true;
    },
    checkAction() {
      // checking confirmation
      if (this.deleteOK == true) {
        if (this.deleteOK == true && this.confirmOK == true) {
          this.deleteThisPost();
        } else {
          this.cancelDeletePost();
        }
      } else if (this.editOK == true) {
        if (this.editOK == true && this.confirmOK == true) {
          this.editPost(this.userPostToUpdate);
        } else {
          this.cancelEditPost();
        }
      }
    },
    async editPost(editedPost) {
      const result = await locationsApi.editLocation(editedPost);
      this.cityCountryCheck = false;
      this.showMessageBox = true;
      this.MBoxBGColor = "green";
      this.MessageToUser = `updating post ${this.userPostToUpdate.id}...`;
      this.showBtnBox = false;
      setTimeout(() => {
        this.$router.push({
          path: "/",
        });
      }, 2000);
    },
    backButton() {
      this.$router.push({
        path: "/",
      });
    },
    async deleteThisPost() {
      const Id = this.$route.params.id;
      const result = await locationsApi.deleteLocation(Id);
      this.cityCountryCheck = false;
      this.showMessageBox = true;
      this.MBoxBGColor = "green";
      this.MessageToUser = `deleting post ${Id}...`;
      this.showBtnBox = false;
      setTimeout(() => {
        this.$router.push({
          path: "/",
        });
      }, 2000);
    },
    cancelDeletePost() {
      this.showMessageBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `You cancelled deleting Post ${this.userPost.id} – continue editing or go back with the 'Back' button`;
      this.showBtnBox = false;
    },
    cancelEditPost() {
      this.showMessageBox = true;
      this.MBoxBGColor = "red";
      this.MessageToUser = `You cancelled editing Post ${this.userPost.id}. Continue editing or go back.`;
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
</style>

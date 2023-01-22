<template>
  <div class="vCard">
    <div class="top">
      <div class="foto">
        <img :src="image"/>
      </div>
    </div>
    <div class="bottom">
      <a href="#" @click="clickedImage(id)">
      <h2>{{ city }} - {{ country }}</h2>
      </a>
      <h3>{{ headline }}</h3>
      <h5>{{ from }} - {{ to }}</h5>
        <div class="auth">
          <img :src="auth_pic" />
          <h5> by: {{ author }}</h5>
          <a href="#" @click="clickedBlogPost(id)">read blog post</a>
          <div v-if="userIsLoggedIn" id="userEdit">
            <div class="userButtonBox">
              <button @click="deletePost(id)">delete</button>
              <button @click="editPost(id)">edit</button>
            </div>
          </div>
          <div v-else>
            <a href="#" @click="goToLogIn()">log in to edit</a></div>
        </div> 
    </div>
  </div>
</template>

<script>

export default {
  props: ["image", "city", "country", "headline", "from", "to", "author", "auth_pic", "id", "userIsLoggedIn"],

  emits: ["fotoClicked", "readBlogPostClicked", "deletePostClicked", "editPostClicked"],

  methods: {
    clickedImage(id) {
      this.$emit("fotoClicked", id);
    },
    clickedBlogPost(id) {
      this.$emit("readBlogPostClicked", id)
    },
    deletePost(id) {
      this.$emit("deletePostClicked", id);
    },
    editPost(id) {
      this.$emit("editPostClicked", id);
    },
    goToLogIn() {
      this.$router.push({
        path: "/login/"
        })
    }
  },
  created() {
    // console.log(this.city)
  }
};
</script>

<style scoped>
.vCard {
  position: relative;
  width: 300px;
  min-height: 475px;
  background-color: rgb(218, 216, 206);
  border-radius: 10px;
  z-index: 100;
}
.foto {
  float: left;
  position: relative;
  width: 300px;
  height: 212px;
  
}
.top {
  position: relative;
  display: block;
  width: 300px;
}
.top img {
  float: left;
  position: relative;
  width: 300px;
  height: 212px;
  border-radius: 10px 10px 0px 0px;
}
.bottom {
  position: relative;
  display: block;
  padding: 10px;
}
.bottom img {
  float: left;
  position: relative;
  width: 40px;
  border-radius: 50%;
}
.auth {
  width: 300px;
  height: 40px;
  line-height: 40px;
}
#userEdit {
  display: block;
  width: 270px;
  /* border: dotted black 2px;
  background-color: aquamarine; */
}
.userButtonBox {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.auth > h5 {
  padding-left: 50px;
  margin-bottom: 10px;
}
h4,
p,

h5 {
  font-style: oblique;
  margin-bottom: 5px;
}
h4 {
  font-size: 12px;
}
a {
  color: black;
  text-decoration: line;
}
</style>
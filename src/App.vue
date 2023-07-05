<template>
  <NavHeader />
  <RouterView @loggedIn="isUserLoggedIn()" :checkUserLogIn="this.isLoggedIn" />
</template>

<script>
import NavHeader from "./components/NavHeader.vue";

export default {
  data() {
    return {
      isLoggedIn: false,
      loggedInUser: "User",
    };
  },
  components: {
    NavHeader,
  },
  created() {
    console.log(`Logged in?: ${this.isLoggedIn}`);
  },
  methods: {
    isUserLoggedIn() {
      console.log(`User is logging in`);
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
      console.log(`${this.loggedInUser} is logged in`);
    },
  },
};
</script>

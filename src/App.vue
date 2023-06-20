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
  created() {},
  methods: {
    isUserLoggedIn() {
      this.isLoggedIn = true;
    },
  },
};
</script>

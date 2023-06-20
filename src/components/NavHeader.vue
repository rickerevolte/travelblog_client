<template>
  <div id="topBar">
    <header>
      <i
        class="fa-solid fa-earth-europe fa-2x"
        id="logo"
        @click="
          () => {
            this.$router.push({
              path: '/',
            });
          }
        "
      ></i>
      <h1>Ricke's Travel Blog</h1>
      <nav class="topMenu">
        <ul>
          <li>
            <RouterLink to="/" i class="fa-solid fa-house fa-1x"
              ><span class="li"> Home</span></RouterLink
            >
          </li>
          <li>
            <RouterLink to="/contact" i class="fa-solid fa-address-card fa-1x"
              ><span class="li"> Imprint</span></RouterLink
            >
          </li>
          <li id="newPostAfterLogin">
            <RouterLink to="/newpost" i class="fa-solid fa-marker fa-1x"
              ><span class="li"> New Post</span></RouterLink
            >
          </li>
          <li id="logInAfterLogin">
            <RouterLink
              to="/login"
              i
              class="fa-solid fa-arrow-right-to-bracket fa-1x"
              ><span class="li"> Log In</span></RouterLink
            >
          </li>
          <li id="logOutAfterLogin">
            <RouterLink to="/logout" i class="fa-solid fa-door-open fa-1x"
              ><span class="li"> Log Out</span></RouterLink
            >
          </li>
        </ul>
      </nav>
      <a href="#" id="burgerButton">=</a>
    </header>
    <div id="sideMenu">
      <ul>
        <li>
          <RouterLink to="/" i class="fa-solid fa-house fa-1x"></RouterLink>home
        </li>
        <li>
          <RouterLink
            to="/contact"
            i
            class="fa-solid fa-address-card fa-1x"
          ></RouterLink
          >Imprint
        </li>
        <li id="newPostAfterLoginSide">
          <RouterLink
            to="/newpost"
            i
            class="fa-solid fa-marker fa-1x"
          ></RouterLink
          >New post
        </li>
        <li id="logInAfterLoginSide">
          <RouterLink
            to="/login"
            i
            class="fa-solid fa-arrow-right-to-bracket fa-1x"
          ></RouterLink
          >Log in
        </li>
        <li id="logOutAfterLoginSide">
          <RouterLink
            to="/logout"
            i
            class="fa-solid fa-door-open fa-1x"
          ></RouterLink
          >Log Out
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style scoped>
header {
  border-bottom: 1px solid black;
  height: 60px;
  line-height: 60px;
  position: relative;
  z-index: 100000;
  padding: 10px;
}

#logo {
  position: relative;
  float: left;
  top: 14px;
}
#logo:hover {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

a {
  padding: 5px;
  color: blue;
  text-decoration: none;
}
#newPostAfterLogin,
#newPostAfterLoginSide,
#logOutAfterLogin,
#logOutAfterLoginSide {
  display: none;
}

ul {
  list-style: none;
  margin-left: -30px;
}
a:hover {
  border-bottom: solid 2px rgb(255, 117, 63);
}
header > h1 {
  color: black;
  padding: 0 10px 0 10px;
  float: left;
  line-height: 60px;
}
header > a {
  /* Burger Button = */
  color: black;
  float: right;
  font-size: 50px;
  line-height: 60px;
  font-weight: bold;
  text-decoration: none;
}
#sideMenu {
  top: 80px;
  right: -120px;
  position: fixed;
  z-index: 1000;
  width: 120px;
  height: calc(100vh - 80px);
  background-color: #add8e6;
  transition: 0.4s;
}

#sideMenu.sideMenuVisible {
  right: 0;
}

#sideMenu a {
  color: #000;
}

.topMenu {
  display: none;
  float: right;
  padding-right: 20px;
  margin-top: -15px;
}
.topMenu li {
  display: inline;
  padding: 20px;
}
.li {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: initial;
}

.topMenu a {
  color: black;
}

/* TABLET AND UP */
@media (min-width: 780px) {
  .topMenu {
    display: block;
  }
  header > a {
    display: none;
  }
  #sideMenu {
    display: none;
  }
}
</style>

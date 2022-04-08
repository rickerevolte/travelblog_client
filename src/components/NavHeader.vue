<template>
  <div id="topBar">
      <header>
          <i class="fa-solid fa-earth-europe fa-2x" id="logo"></i>
          <h1>My Travel Blog</h1>
            <nav class="topMenu">
              <ul>
                <li><RouterLink to="/"
                i class="fa-solid fa-house fa-1x"
                ><span class="li"> Home</span></RouterLink></li>
                <li><RouterLink to="/contact"
                i class="fa-solid fa-address-card fa-1x"
                ><span class="li"> Imprint</span></RouterLink></li>
                <li id="newPostAfterLogin"
                ><RouterLink to="/newpost"
                i class="fa-solid fa-marker fa-1x"
                ><span class="li"> Edit/Add Post</span></RouterLink></li>
                <li id="logInAfterLogin"><RouterLink to="/login" 
                i class="fa-solid fa-arrow-right-to-bracket fa-1x"
                ><span class="li"> Log In</span></RouterLink></li>
                <li id="logOutAfterLogin"><RouterLink to="/logout"
                i class="fa-solid fa-door-open fa-1x"
                ><span class="li"> Log Out</span></RouterLink></li>
              </ul>
            </nav>
          <a href="#" id="burgerButton">=</a>
      </header>
        <div id="sideMenu">
          <ul>
            <li><RouterLink to="/"
            i class="fa-solid fa-house fa-1x"
            ></RouterLink>h</li>
            <li><RouterLink to="/contact"
            i class="fa-solid fa-address-card fa-1x"
            ></RouterLink>c</li>
            <li id="newPostAfterLogin"
            ><RouterLink to="/newpost"
            i class="fa-solid fa-marker fa-1x"
            ></RouterLink></li>
            <li id="logInAfterLogin"><RouterLink to="/login" 
            i class="fa-solid fa-arrow-right-to-bracket fa-1x"
            ></RouterLink>l</li>
            <li id="logOutAfterLogin"><RouterLink to="/logout"
            i class="fa-solid fa-door-open fa-1x"
            ></RouterLink></li>
          </ul>
        </div>
  </div>
</template>

<style scoped>
header {
    border-bottom:  black solid 1px;
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

a {
    padding: 5px;
    color: blue;
    text-decoration: none;
}
#newPostAfterLogin,
#logOutAfterLogin {
  display: none;
}

ul {
  list-style: none;
  margin-left: -30px
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
  right: -50px;
  position: fixed;
  z-index: 1000;
  width: 50px;
  height: calc(100vh - 80px);
  background-color: lightblue;
  transition: 400ms;
}

#sideMenu.sideMenuVisible {
  right: 0;
}

#sideMenu a {
  color: rgb(0, 0, 0);
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
  font-family: 'Courier New', Courier, monospace;
  font-style: normal;
  font-weight: initial;
}

.topMenu a {
  color: black;
}

/* TABLET AND UP */
@media (min-width: 780px) 
{
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
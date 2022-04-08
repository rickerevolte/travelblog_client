<template>
  <main id="main-holder">
    <div class="content">
      <h1 id="login-header">Log in</h1>
    <div id="login-error-msg-holder">
      <p id="login-error-msg">
        Wrong username <span id="error-msg-second-line">and/or password</span>
      </p>
    </div>
      <label id="login-form">
        <input
          type="text"
          name="username"
          class="login-form-field"
          placeholder="Username"
          v-model="usernameField"
        />
        <input
          type="password"
          name="password"
          class="login-form-field"
          placeholder="Password"
          v-model="passwordField"
        />
        <input
          @click="clickedLink"
          type="submit"
          id="login-form-submit"
        />
      </label>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    clickedLink() {
      const userData = {
        usernameField: this.usernameField,
        passwordField: this.passwordField,
      };
      const hideShowNewPost = document.getElementById("newPostAfterLogin");
      const hideShowLogout = document.getElementById("logOutAfterLogin");
      const hideShowLogin = document.getElementById("logInAfterLogin");
      if (
        userData.usernameField === "guest" &&
        userData.passwordField === "guest"
      ) {
        alert("You have successfully logged in.");
        this.$router.push({ path: "/" });

        hideShowNewPost.style.display = "inline";
        hideShowLogout.style.display = "inline";
        hideShowLogin.style.display = "none";
      } else {
        alert("Invalid Username and/or password. Try 'guest' / 'guest'");
        location.reload();
      }
    },
  },
};
</script>

<style scoped>

.content {
    position: relative;
    top: 90px;
    padding-left: 10px;
}
#main-holder {
  width: 400px;
  float: left;
}
#login-error-msg-holder {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
#login-error-msg {
  width: 23%;
  text-align: center;
  margin: 0;
  padding: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #8a0000;
  border: 1px solid #8a0000;
  background-color: #e58f8f;
  opacity: 0;
}
#error-msg-second-line {
  display: block;
}
.login-form-field::placeholder {
  color: rgb(0, 0, 0);
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  opacity: 60%;
}
.login-form-field {
  border: none;
  border-bottom: 1px solid #3a3a3a;
  margin-bottom: 10px;
  margin-right:5px;
  border-radius: 3px;
  outline: none;
  padding: 0px 0px 5px 5px;
}
#login-form-submit {
  width: 380px;
  padding: 7px;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Courier New", Courier, monospace;
  background-color: rgb(53, 53, 53);
  cursor: pointer;
  outline: none;
}
#login-header {
  text-align: left;
}
</style>

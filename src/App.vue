<template>
  <v-app>
    <v-app-bar v-if="currentRoute !== '/login'">
      <v-img class="mx-2" :src="logo" max-height="40" max-width="40" contain></v-img>
      <v-app-bar-title>Manage Surveys</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="goToSurevysList">Surveys List</v-btn>
        <v-btn variant="text" @click="goToCreateSurvey">Create Survey</v-btn>
        <button @click="handleLogout" class="black-button">LOGOUT</button>
      </v-toolbar-items>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
import logo from "./assets/oc-logo-white.png";
import AuthDataService from "./services/AuthDataService";
export default {
  name: "App",
  data: () => ({
    logo,
    currentRoute: "",
  }),
  methods: {
    goToSurevysList() {
      this.$router.push({ name: "surveysList" });
    },
    goToCreateSurvey() {
      this.$router.push({ name: "createSurvey" });
    },
    handleLogout() {
      const userId = sessionStorage.getItem("userId");
      AuthDataService.logout(userId).then((response) => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userType");
        this.$router.push({ name: "login" });
      });
    },
  },
  created() {
    const isAuth = sessionStorage.getItem("authToken");
    const userType = sessionStorage.getItem("userType");
    if (isAuth && userType === "user") {
      this.$router.push({ name: "surveysList" });
    } else {
      this.$router.push({ name: "login" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentRoute = this.$route.path;
      }
    );
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap");

html {
  font-family: "Montserrat", sans-serif !important;
}

:root {
  --colorBlack: #161515;
  --lightBlack: #202020;
  --colorWhite: #ffff;
  --colorLightGrey: #d6d1d19c;
  --lightGrey: #f8f2f2;
  --boxShadow: 0px 10px 25px rgba(0, 0, 0, 0.177);
}

body {
  font-family: "Montserrat", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  padding: 5% 40px 0 40px;
  background: #eae9e9;
  min-height: 100vh;
  max-height: auto;
}

.width-100 {
  width: 100%;
}

.error {
  color: orangered;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 6px;
  background-color: var(--lightGrey);
  border-radius: 5px;
}

.black-button {
  background: var(--colorBlack);
  border-radius: 15px;
  padding: 10px 15px;
  transition: 0.4s ease-in;
  color: var(--colorWhite);
  margin: 10px 0;
}

.black-button:hover {
  box-shadow: 0px 10px 25px #2b2b2b7a;
}

.form {
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  margin-top: 15px;
  padding: 20px 20px;
  box-shadow: var(--boxShadow);
  background: var(--colorWhite);
}

.checkbox {
  width: max-content;
  height: 50px;
}

.highlight__text {
  color: rgb(144, 144, 187);
}

.v-input__details {
  display: none;
}

.v-input {
  margin: 10px 0 !important;
}

@media(max-width: 900px) {
  .wrapper {
    padding: 10% 40px 0 40px;
  }
}
</style>
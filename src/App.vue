<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import logo from "./assets/oc-logo-white.png";
export default {
  name: "App",
  data: () => ({
    logo,
  }),
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
  --skyBlue:rgb(93, 93, 180);
}

body {
  font-family: "Montserrat", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 20px;
}

.wrapper {
  padding: 10px 20px;
  background: #eae9e9;
  min-height: 100vh;
  max-height: auto;
}

.form {
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  margin-top: 15px;
  padding: 30px;
  box-shadow: var(--boxShadow);
  background: var(--colorWhite);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.black-button {
  background: var(--colorBlack);
  border-radius: 10px;
  padding: 10px 15px;
  transition: 0.4s ease-in;
  color: var(--colorWhite);
  margin: 10px auto;
  width: 30%;
}

.black-button:hover {
  box-shadow: 0px 10px 25px #2b2b2b7a;
  background: var(--skyBlue);
}
</style>
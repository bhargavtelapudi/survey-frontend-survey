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
</style>
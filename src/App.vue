<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        Vuetify Toolbar
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" text rounded to="/">Home</v-btn>
      <v-btn color="white" text rounded to="/login">Login</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify Dashboard</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: ["Home", "Login"],
      showPassword: false
    };
  }
};
</script>

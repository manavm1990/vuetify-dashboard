<template>
  <v-app>
    <v-card><h1 class="display-1">Fat Stuff!</h1> </v-card>
    <v-content>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Fat Stuff!</h1>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              name="username"
              label="Username"
              id="username"
              prepend-icon="mdi-account-circle"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success">Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

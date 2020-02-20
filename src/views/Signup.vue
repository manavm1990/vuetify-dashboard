<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Signup</h1>
        <v-form ref="signUpForm" v-model="formValid">
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="rules.email"
          ></v-text-field>

          <v-autocomplete
            label="Which Browser Do You Use?"
            :items="browsers"
          ></v-autocomplete>

          <v-file-input label="Attach Profile Picture"></v-file-input>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birthday"
                label="Birthday"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birthday"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              picker-date="2000-01-01"
            ></v-date-picker>
          </v-menu>

          <v-checkbox
            label="Agree to Terms & Conditions"
            v-model="agreedToTerms"
            :rules="rules.agreedToTerms"
            required
          ></v-checkbox>
          <v-btn
            type="submit"
            class="mr-4"
            color="primary"
            :disabled="!formValid"
            >Submit</v-btn
          >
          <v-btn class="mr-4" color="success" @click="validateForm"
            >Validate Form</v-btn
          >
          <v-btn class="mr-4" color="warning" @click="resetValidation"
            >Reset Validation</v-btn
          >
          <v-btn type="reset" color="error" @click="resetForm">Reset</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      agreedToTerms: false,
      birthday: "",
      browsers: ["Chrome", "Firefox", "Safari", "Edge", "Brave"],
      email: "",
      formValid: false,
      menu: false,
      rules: {
        agreedToTerms: [
          value =>
            !!value ||
            "U must agree to the terms & conditions to sign up for an account!"
        ],
        email: [
          value => !!value || "✉️ required.",
          // Vuetify 'reset' triggers validation rules resulting in 'undefined .' errors.
          value =>
            (value && !!value.indexOf("@")) || "✉️ should have a username.",
          value => (value && !!value.includes("@")) || "✉️ should include '@'",
          value =>
            // Check if user put '@' and '.' next to each other.
            (value && !!(value.indexOf(".") - value.indexOf("@") > 1)) ||
            "✉️ should contain a valid domain.",
          value =>
            // Domain should be at least 2 characters.
            (value && !!(value.indexOf(".") <= value.length - 3)) ||
            "✉️ should contain a valid domain extension."
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.signUpForm.reset();
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation();
    },
    validateForm() {
      this.$refs.signUpForm.validate();
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  }
};
</script>

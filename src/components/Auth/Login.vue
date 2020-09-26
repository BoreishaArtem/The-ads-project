<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card class="elevation-12">
          <v-toolbar color="dark" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                label="email"
                name="email"
                color="dark"
                prepend-icon="mdi-account"
                type="email"
                :rules="emailRules"
                v-model="email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :counter="6"
                :rules="passwordRules"
                v-model="password"
                color="dark"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="dark"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const emailRegex = /.+@.+\..+/;
export default {
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => emailRegex.test(v) || "E-mail must be valid"
      ],

      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length >= 6) ||
          "Password must be equal or more than 6 characters"
      ],
      valid: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => console.log(err));
      }
    }
  },
  created() {
    if(this.$route.query['LoginError']) {
      this.$store.dispatch('setError', 'Please log in to access this page')
    }
  }
};
</script>

<style>
</style>

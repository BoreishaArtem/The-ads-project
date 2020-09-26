<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <!-- -->
      <v-list>
        <v-list-item :to="link.url" v-for="link of links" :key="link.title">
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pointer" @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer=!drawer" class="d-md-none d-lg-none d-xl-none"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Title</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="d-sm-none d-none d-md-flex">
        <v-btn tile v-for="link in links" :key="link.title" :to="link.url">
          <v-icon>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn @click="onLogout" text v-if="isUserLoggedIn">
          <v-icon>mdi-logout-variant</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <template v-if="error">
        <v-snackbar
          color="error"
          :multi-line="true"
          :timeout="5000"
          @input="closeError"
          :value="true"
        >
          {{ error }}
          <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click.native="closeError">Close</v-btn>
          </template>
        </v-snackbar>
      </template>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },

  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "mdi-bookmark-outline", url: "/orders" },
          { title: "New ad", icon: "mdi-plus-outline", url: "/new" },
          { title: "My ads", icon: "mdi-format-list-bulleted", url: "/list" }
        ];
      } else {
        return [
          { title: "Login", icon: "mdi-lock", url: "/login" },
          { title: "Registration", icon: "mdi-face", url: "/registration" }
        ];
      }
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  }
};
</script>


<style scoped>
.pointer {
  cursor: pointer;
}
</style>

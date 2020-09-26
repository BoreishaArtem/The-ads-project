<template>
  <v-container class="mx-auto">
    <v-row>
      <v-flex xs-12 sm-6 offset-(sm)(3)>
        <h1 class="text-secondary mb-3">Create new Ad</h1>
        <v-form ref="form" v-model="valid" validation class="mb-5">
          <v-text-field
            label="Add title"
            name="title"
            color="dark"
            type="text"
            :rules="[v=> !!v || 'Title is required']"
            v-model="title"
          ></v-text-field>

          <v-textarea
            id="password"
            label="Ad Description"
            name="description"
            type="password"
            :counter="6"
            :rules="[v=> !!v || 'Description is required']"
            v-model="description"
            color="dark"
          ></v-textarea>
        </v-form>
        <v-layout>
          <v-flex xs-12>
            <v-btn class="warning mb-9" @click="triggerImage">
              Upload image
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              type="file"
              style="display:none;"
              ref="chooseImage"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs-12>
            <img :src="imageSrc" height="100" v-if="imageSrc" />
            <!-- <h1>https://www.wsupercars.com/wallpapers/Pagani/2021-Pagani-Imola-005-1080.jpg</h1> -->
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs-12>
            <v-switch color="black" v-model="promo" label="Add to promo?"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs-12>
            <v-spacer></v-spacer>
            <v-btn
              class="success"
              @click="createAd"
              :loading="loading"
              :disabled="(!valid || !image) || loading"
            >Create Ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerImage() {
      return this.$refs.chooseImage.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style>
</style>

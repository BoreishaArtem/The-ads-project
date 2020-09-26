<template>
  <v-container>
    <div v-if="!loading && myAds.length !== 0">
      <h1 class="text--secondary mb-3">My Ads</h1>
      <v-card v-for="ad in myAds" :key="ad.id" max-width="500" class="mx-auto mb-10">
        <v-img height="160px" :src="ad.imageSrc"></v-img>
        <v-card-text class="text--primary">
          <h2 class="text--primary">{{ad.title}}</h2>
          <p>{{ad.description}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" class="info" :to="/ad/+ad.id">Open</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else-if="!loading && myAds.length === 0">
      <h1 class="text--primary text-xs-center">You have no ads</h1>
    </div>
    <div v-else>
      <v-progress-circular :size="100" :width="4" color="purple" indeterminate></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style>
</style>

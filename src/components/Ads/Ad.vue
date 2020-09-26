<template>
  <v-container>
    <v-layout row>
      <v-flex xs-12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular :size="100" :width="4" color="purple" indeterminate></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAppModal from "./EditAddModal";

export default {
  props: ["id"],
  computed: {
    ad() {
      let id = this.id;
      console.log(this.$store.getters.adById(id));
      return this.$store.getters.adById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      return this.ad.ownerID === this.$store.getters.user.id;
    }
  },
  components: {
    appEditAdModal: EditAppModal
  }
};
</script>

<style>
</style>

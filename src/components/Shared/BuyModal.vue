<template>
  <div class="mr-5">
    <v-btn class="primary" dark @click.stop="dialog = true">buy</v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Do you want to buy this car?</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Your name" name="name" color="dark" type="text" v-model="name"></v-text-field>
          <v-text-field
            label="Your phone"
            name="phone"
            color="dark"
            type="text"
            v-model="phone"
            aria-multiline
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel" :disabled="localLoading">Cancel</v-btn>
          <v-btn
            class="success"
            text
            @click="onSave"
            :disabled="localLoading"
            :loading="localLoading"
          >Buy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["ad"],
  data() {
    return {
      dialog: false,
      name: "",
      phone: "",
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      this.name = "";
      this.phone = "";
      this.dialog = false;
    },
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerID: this.ad.ownerID
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.dialog = false;
          });
      }
    }
  }
};
</script>

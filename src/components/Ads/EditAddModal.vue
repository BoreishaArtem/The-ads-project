<template>
  <div class="mr-5">
    <v-btn class="success" dark @click.stop="dialog = true">Edit</v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Edit ad</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Title" name="title" color="dark" type="text" v-model="editedTitle"></v-text-field>
          <v-text-field
            label="Description"
            name="description"
            color="dark"
            type="text"
            v-model="editedDescription"
            aria-multiline
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel">Cancel</v-btn>
          <v-btn class="success" text @click="onSave">Save</v-btn>
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
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    };
  },
  methods: {
    onCancel() {
      this.editedDescription = this.ad.description;
      this.editedTitle = this.ad.title;
      this.dialog = false;
    },
    onSave() {
      if (this.editedDescription !== "" && this.editedTitle !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        });
        this.dialog = false;
      }
    }
  }
};
</script>

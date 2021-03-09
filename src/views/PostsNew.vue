<template>
  <div class="posts-new">
    <form v-on:submit.prevent="createPost()">
      <h1>Be Creative..Be Expressive</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name: </label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Affirmation: </label>
        <input type="text" class="form-control" v-model="body" />
      </div>
      <div class="form-group">
        <label>Add a picture: </label>
        <input type="text" class="form-control" v-model="image_url" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create Post" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      body: "",
      image_url: "",
      errors: [],
    };
  },
  methods: {
    createPost: function() {
      var params = {
        name: this.name,
        body: this.body,
        image_url: this.image_url,
      };
      axios
        .post("/api/posts", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

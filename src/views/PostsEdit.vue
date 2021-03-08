<template>
  <div class="posts-edit">
    <form v-on:submit.prevent="updatePost()">
      <h1>Need To Make A Change?</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name Your Post: </label>
        <input type="text" class="form-control" v-model="post.name" />
      </div>
      <div class="form-group">
        <label>Affirmation: </label>
        <input type="text" class="form-control" v-model="post.body" />
      </div>
      <div class="form-group">
        <label>Choose an Image: </label>
        <input type="text" class="form-control" v-model="post.image_url" />
      </div>
      <div>
        <img :src="post.image_url" alt="" />
      </div>
      <input type="submit" class="btn btn-primary" value="Save Changes" />
      <button v-on:click="destroyPost()">Delete Post</button>
    </form>
  </div>
</template>
<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      post: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      this.post = response.data;
      console.log(this.post);
    });
  },
  methods: {
    updatePost: function() {
      var params = {
        name: this.post.name,
        body: this.post.body,
        image_url: this.post.image_url,
      };
      axios
        .patch(`/api/posts/${this.post.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/posts/${this.post.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyPost: function() {
      if (confirm("Are you aure you want to delete your affirmation?")) {
        axios.delete(`/api/posts/${this.post.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>

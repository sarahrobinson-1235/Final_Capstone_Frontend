<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="post in posts" v-bind:key="post.id">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <p>{{ post.created_by["name"] }}</p>
      <p>{{ post.created_at }}</p>
    </div>
  </div>
</template>
<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Daily Affirmation App",
      posts: [],
    };
  },
  created: function() {
    this.indexPosts();
  },
  methods: {
    indexPosts: function() {
      axios
        .get("/api/posts")
        .then((response) => {
          console.log(response.data);
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>

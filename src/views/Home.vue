<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1>Recent Posts</h1>
    <router-link v-if="isLoggedIn()" to="/posts/new"
      ><button>New Post</button></router-link
    >
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.name }}</h2>
      <router-link :to="`/posts/${post.id}`">
        <img v-bind:src="post.image_url" alt="" />
      </router-link>
      <router-link :to="`/users/${post.created_by.id}`">
        <p>By: {{ post.created_by["name"] }}</p>
      </router-link>
      <p>{{ post.body }}</p>
      <p>Posted:{{ relativeDate(post.created_at) }}</p>
    </div>
  </div>
</template>
<style></style>

<script>
import axios from "axios";
import moment from "moment";

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
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
  },
};
</script>

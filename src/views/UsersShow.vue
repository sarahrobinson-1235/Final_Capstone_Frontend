<template>
  <div class="users-show">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <img :src="user.image_url" alt="" />
    <h2>Posts</h2>
    <div v-for="post in posts" v-bind:key="post.id">
      <h3>{{ post.title }}</h3>
      <img :src="post.image_url" alt="" />
      <p>{{ post.body }}</p>
      <p>Posted: {{ relativeDate(post.created_at) }}</p>
    </div>
    <p>Name: {{ user }}</p>
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
      user: {},
      posts: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      this.posts = this.user.posts;
      console.log(this.user);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

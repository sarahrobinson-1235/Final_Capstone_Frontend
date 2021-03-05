<template>
  <div class="boards-show">
    <h1>{{ board.title }}</h1>
    <h2>{{ board.description }}</h2>
    <div v-for="post in posts" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.name }}</h2>
      </router-link>
      <img v-bind:src="post.image_url" alt="" />
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
      board: {},
      posts: [],
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then((response) => {
      this.board = response.data;
      this.posts = this.board.posts;
      console.log(this.board);
      console.log(this.posts);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

<template>
  <div class="boards-show">
    <!-- <p>Board's User: {{ board.user.id }}</p>
    <p>User logged in: {{ $parent.getUserId() }}</p> -->
    <router-link
      v-if="$parent.getUserId() == board.user.id"
      :to="`/boards/${board.id}/edit`"
      ><button>Edit Board</button></router-link
    >
    <h1>{{ board.title }}</h1>
    <h2>{{ board.description }}</h2>
    <div v-for="post in board.posts" v-bind:key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.name }}</h2>
      </router-link>
      <img v-bind:src="post.image_url" alt="" />
      <p>{{ post.body }}</p>
      <router-link :to="`/users/${post.user.id}`">
        <p>Creator: {{ post.user.name }}</p>
      </router-link>
      <p>Posted: {{ relativeDate(post.created_at) }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      board: {},
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then((response) => {
      this.board = response.data;
      console.log(this.board);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

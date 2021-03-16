<template>
  <div class="boards-show">
    <router-link
      v-if="$parent.getUserId() == board.user.id"
      :to="`/boards/${board.id}/edit`"
      ><button>Edit Board</button></router-link
    >
    <h1>{{ board.title }}</h1>
    <h2>{{ board.description }}</h2>
    <div v-for="boardPost in board.board_posts" v-bind:key="boardPost.post.id">
      <router-link :to="`/posts/${boardPost.post.id}`">
        <h2>{{ boardPost.post.name }}</h2>
      </router-link>
      <img v-bind:src="boardPost.post.image_url" alt="" />
      <p>{{ boardPost.post.body }}</p>
      <router-link :to="`/users/${boardPost.post.user.id}`">
        <p>Creator: {{ boardPost.post.user.name }}</p>
      </router-link>
      <p>Posted: {{ relativeDate(boardPost.post.created_at) }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      board: {user: {}},
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

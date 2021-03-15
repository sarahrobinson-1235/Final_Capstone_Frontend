<template>
  <div class="posts-show">
    <form v-on:submit.prevent="createBoardPost()">
      {{ message }}
      <div class="form-group">
        <label>Board: </label>
        <input type="text" class="form-control" v-model="board_id" />
      </div>
      <div class="form-group">
        <label>post: </label>
        <input type="text" class="form-control" v-model="post_id" />
      </div>
      <input type="submit" class="btn btn-primary" value="Post to Board" />
    </form>
    <p>Post's User: {{ user.id }}</p>
    <p>User logged in: {{ $parent.getUserId() }}</p>
    <h1>{{ post.name }}</h1>
    <img v-bind:src="post.image_url" alt="" />
    <br />
    <h2>{{ post.body }}</h2>
    <p>Posted: {{ relativeDate(post.created_at) }}</p>
    <router-link v-if="owner()" :to="`/posts/${post.id}/edit`"
      ><button>Edit Post</button></router-link
    >

    <router-link :to="`/users/${post.created_by.id}`">
      <p>Creator: {{ post.created_by.name }}</p>
    </router-link>
    <img v-bind:src="post.created_by.image_url" alt="" />
  </div>
</template>
<style></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      post: {},
      user: {},
      board_id: "",
      post_id: "",
      board_post: {},
      message: "",
      board: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      this.post = response.data;
      this.user = this.post.created_by;
      this.post_id = this.post.id;
      console.log(this.post);
      console.log(this.user);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    owner: function() {
      return this.$parent.getUserId() == this.user.id;
    },
    createBoardPost: function() {
      var params = {
        board_id: this.board_id,
        post_id: this.post_id,
      };
      axios
        .post("/api/board_posts", params)
        .then((response) => {
          this.board_post = response.data;
          console.log(this.board_post);
          this.board = response.data.board;
          console.log(this.board);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      this.message = "Not your board!";
    },
  },
};
</script>

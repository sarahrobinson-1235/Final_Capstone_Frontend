<template>
  <div class="posts-show">
    <form v-on:submit.prevent="createBoardPost()">
      {{ message }}
      <div class="form-group">
        <label>Board: </label>
        <input type="text" class="form-control" v-model="board_id" />
      </div>
      <input type="submit" class="btn btn-primary" value="Post to Board" />
    </form>
    <p>Post's User: {{ post.user.id }}</p>
    <p>User logged in: {{ $parent.getUserId() }}</p>
    <h1>{{ post.name }}</h1>
    <img v-bind:src="post.image_url" alt="" />
    <br />
    <h2>{{ post.body }}</h2>
    <p>Posted: {{ relativeDate(post.created_at) }}</p>
    <router-link
      v-if="$parent.getUserId() == post.user.id"
      :to="`/posts/${post.id}/edit`"
      ><button>Edit Post</button></router-link
    >

    <router-link :to="`/users/${post.user.id}`">
      <p>Creator: {{ post.user.name }}</p>
    </router-link>
    <img v-bind:src="post.user.image_url" alt="" />

    {{ post }}
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      post: {},
      board_id: "",
      post_id: "",
      message: "",
      errors: [],
      board_post: {},
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      this.post = response.data;
      console.log(this.post);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },

    createBoardPost: function() {
      var params = {
        board_id: this.board_id,
        post_id: this.post.id,
      };
      axios
        .post("/api/board_posts", params)
        .then((response) => {
          this.board_post = response.data;
          console.log(this.board_post);
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      this.message = "Not your board!";
    },
  },
};
</script>

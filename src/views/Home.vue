<template>
  <div class="home">
    <h1>Daily Affirmation App</h1>
    <h1>Recent Posts</h1>
    <router-link v-if="isLoggedIn()" to="/posts/new"
      ><button>New Post</button></router-link
    >
    <div>
      <input
        type="text"
        v-model="search"
        list="titles"
        placeholder="Search..."
      />
      <datalist id="titles">
        <option v-for="post in posts" v-bind:key="post.id"></option>
      </datalist>
    </div>
    <div v-for="post in filterBy(posts, search)" v-bind:key="post.id">
      <h2>{{ post.name }}</h2>
      <router-link :to="`/posts/${post.id}`">
        <img v-bind:src="post.image_url" alt="" />
      </router-link>
      <form v-on:submit.prevent="createBoardPost(post)">
        <div class="form-group">
          <label>Choose a Board: </label>
          <select v-model="board_id" id=""
            ><option
              :value="board.id"
              v-for="board in boards"
              v-bind:key="board.id"
              >{{ board.title }}</option
            ></select
          >
          {{ board_id }}
        </div>
        <input
          type="submit"
          class="btn btn-primary"
          value="Add"
          v-on:click="popUp()"
        />
      </form>
      <p>{{ post.body }}</p>
      <router-link :to="`/users/${post.user.id}`">
        <p>By: {{ post.user.name }}</p>
      </router-link>
      <p>Posted:{{ relativeDate(post.created_at) }}</p>
    </div>
  </div>
</template>
<style></style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
// import anime from 'animejs/lib/anime.es.js';

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "",
      posts: [],
      search: "",
      board_id: "",
      boards: []
    };
  },
  created: function() {
    this.indexPosts();
    axios.get("api/boards/me").then(response => {
      this.boards = response.data;
      console.log(response.data);
    });
  },
  methods: {
    indexPosts: function() {
      axios
        .get("/api/posts")
        .then(response => {
          console.log(response.data);
          this.posts = response.data;
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    createBoardPost: function(post) {
      var params = {
        board_id: this.board_id,
        post_id: post.id
      };
      axios
        .post("/api/board_posts", params)
        .then(response => {
          this.board_post = response.data;
          console.log(this.board_post);
          console.log(response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    popUp: function(boardPost) {
      var result = boardPost;
      if (!boardPost) {
        alert("Post already in your board!");
      } else {
        alert("Post added to your board!");
      }
      return result;
    }
  }
};
</script>

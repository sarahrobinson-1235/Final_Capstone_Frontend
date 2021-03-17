<template>
  <div class="users-show">
    <div>
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
      <router-link v-if="owner()" :to="`/users/${user.id}/edit`"
        ><button>Edit Profile</button>
      </router-link>
    </div>

    <p>User's Profile: {{ user.id }}</p>
    <p>User logged in: {{ $parent.getUserId() }}</p>

    <img :src="user.image_url" alt="" />

    <div>
      <h1>{{ user.name }}'s Posts</h1>
      <div v-for="post in posts" v-bind:key="post.id">
        <router-link :to="`/posts/${post.id}`">
          <h3>{{ post.name }}</h3>
        </router-link>
        <img v-bind:src="post.image_url" alt="" />
        <p>{{ post.body }}</p>
        <p>Posted: {{ relativeDate(post.created_at) }}</p>
      </div>
    </div>
    <div>
      <h1>{{ user.name }}'s Boards</h1>
      <div v-for="board in boards" v-bind:key="board.id">
        <router-link :to="`/boards/${board.id}`">
          <h3>{{ board.title }}</h3>
        </router-link>
        <p>{{ board.description }}</p>
        <p>Updated: {{ relativeDate(board.created_at) }}</p>
      </div>
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
      user: {},
      posts: [],
      boards: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      this.posts = this.user.posts;
      this.boards = this.user.boards;
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
  },
};
</script>

<template>
  <div class="users-show">
    <div>
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
      <!-- <div v-if="user.owner"> -->
      <div>
        <router-link :to="`/users/${user.id}/edit`"
          ><button>Edit Profile</button>
        </router-link>
      </div>

      <p>User's Profile: {{ user.id }}</p>
      <p>User logged in: {{ $parent.getUserId() }}</p>

      <img :src="user.image_url" alt="" />
    </div>
    <div>
      <h1>Posts</h1>
      <div v-for="post in posts" v-bind:key="post.id">
        <h3>{{ post.title }}</h3>
        <img :src="post.image_url" alt="" />
        <p>{{ post.body }}</p>
        <p>Posted: {{ relativeDate(post.created_at) }}</p>
      </div>
    </div>
    <div>
      <h1>Boards</h1>
      <div v-for="board in boards" v-bind:key="board.id">
        <h3>{{ board.title }}</h3>
        <p>{{ board.description }}</p>
        <p>Created: {{ relativeDate(board.created_at) }}</p>
      </div>
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
  },
};
</script>

<template>
  <div class="posts-show">
    <h1>{{ post.name }}</h1>
    <img v-bind:src="post.image_url" alt="" />
    <br />
    <h2>{{ post.body }}</h2>
    <p>Posted: {{ relativeDate(post.created_at) }}</p>
    <!-- <router-link v-if="owner(post.user_id)" :to="`/posts/${post.id}/edit`"
      ><button>Edit Post</button>
    </router-link> -->

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
    owner: function() {
      return this.$parent.getUserId() == this.user.id;
    },
  },
};
</script>

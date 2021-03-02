<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      v-for = post in posts
    </div>
  </div>
</template>
<style></style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      posts: [],
    };
  },
  created: function() {
    axios.get("/api/posts").then(response) => console.log(response.data));
    this.posts = response.data;
  },
  methods: {},
};
</script>

<template>
  <div class="boards-new">
    <form v-on:submit.prevent="createBoard()">
      <h1>
        Here you can create endless collections of yours and others' posts...
      </h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title: </label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label>What's the collective theme?: </label>
        <input type="text" class="form-control" v-model="description" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create Board" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      description: "",
      errors: [],
    };
  },
  methods: {
    createBoard: function() {
      var params = {
        title: this.title,
        description: this.description,
      };
      axios
        .post("/api/boards", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/boards");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

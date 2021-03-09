<template>
  <div class="boards-edit">
    <form v-on:submit.prevent="updateBoard()">
      <h1>Need To Make A Change?</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Title: </label>
        <input type="text" class="form-control" v-model="board.title" />
      </div>
      <div class="form-group">
        <label>What's the collective theme?: </label>
        <input type="text" class="form-control" v-model="board.description" />
      </div>

      <input type="submit" class="btn btn-primary" />
      <button v-on:click="destroyBoard()">Delete Board</button>
    </form>
  </div>
</template>
<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      board: [],
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then((response) => {
      this.board = response.data;
      console.log(this.board);
    });
  },
  methods: {
    updateBoard: function() {
      var params = {
        title: this.board.title,
        description: this.board.description,
      };
      axios
        .patch(`/api/boards/${this.board.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/boards/${this.board.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyBoard: function() {
      if (confirm("Are you aure you want to delete your board?")) {
        axios.delete(`/api/boards/${this.board.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/boards");
        });
      }
    },
  },
};
</script>

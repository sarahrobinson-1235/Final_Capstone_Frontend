<template>
  <div class="boards-edit">
    <form v-on:submit.prevent="updateBoard()">
      {{ message }}
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
    <div v-for="boardPost in board.board_posts" v-bind:key="boardPost.id">
      <h3>{{ boardPost.post.name }}</h3>
      <p>{{ boardPost.post.body }}</p>
      <button v-on:click="destroyBoardPost(boardPost)">
        Remove From Board
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      board: {},
      errors: [],
      message: "",
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
    destroyBoardPost: function(boardPost) {
      if (
        confirm("Are you aure you want to remove this post from your board?")
      ) {
        console.log(boardPost);
        axios.delete(`/api/board_posts/${boardPost.id}`).then((response) => {
          console.log(response.data);
          this.message = "Post removed from your board!";
          var index = this.board.board_posts.indexOf(boardPost);
          this.board.board_posts.splice(index, 1);
        });
      }
    },
  },
};
</script>

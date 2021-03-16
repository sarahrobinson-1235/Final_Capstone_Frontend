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
    <div v-for="post in board.posts" v-bind:key="post.id">
      <h3>{{ post.name }}</h3>
      <p>{{ post.body }}</p>
      <button v-on:click="destroyBoardPost(board.board_post)">
        Remove From Board
      </button>
    </div>
    <div v-for="board_post in board.board_posts" v-bind:key="board_post.id">
      <button v-on:click="destroyBoardPost(board_post)">
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
        axios
          .delete(`/api/boards/${this.board.board_post.id}`)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/boards");
          });
      }
    },
    destroyBoardPost: function(board_post) {
      if (
        confirm("Are you aure you want to remove this post from your board?")
      ) {
        console.log(board_post);
        axios.delete(`/api/board_posts/${board_post.id}`).then((response) => {
          console.log(response.data);
          this.message = "Post removed from your board!";
          this.$router.push(`/boards/${this.board.id}`);
        });
      }
    },
  },
};
</script>

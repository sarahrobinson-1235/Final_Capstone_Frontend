<template>
  <div class="boards-index">
    <h1>Browse Through Boards Created By Our Members..</h1>
    <div>
      <input
        type="text"
        v-model="search"
        list="titles"
        placeholder="Search..."
      />
      <datalist id="titles">
        <option v-for="board in boards" v-bind:key="board.id"></option>
      </datalist>
    </div>
    <router-link v-if="isLoggedIn()" to="/boards/new"
      ><button>New Board</button></router-link
    >
    <div v-for="board in filterBy(boards, search)" v-bind:key="board.id">
      <div>
        <router-link :to="`/boards/${board.id}`">
          <h2>{{ board.title }}</h2>
        </router-link>
        <p>{{ board.description }}</p>
        <router-link :to="`/users/${board.user.id}`">
          <p>By: {{ board.user.name }}</p>
        </router-link>
        <p>Last Updated: {{ relativeDate(board.updated_at) }}</p>
      </div>
    </div>
  </div>
</template>
<style></style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";


export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      boards: [],
      search: ""
    };
  },
  created: function() {
    this.indexBoards();
  },
  methods: {
    indexBoards: function() {
      axios
        .get("/api/boards")
        .then((response) => {
          console.log(response.data);
          this.boards = response.data;
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
  },
};
</script>

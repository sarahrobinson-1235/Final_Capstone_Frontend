<template>
  <div class="boards-edit">
    <!-- Page Content -->
    <section id="articles" class="">
      <div class="container">
        <div class="row">
          <article id="01" class="page-block col-md-12 page hentry">
            <div class="e-divider-2"></div>
            <div class="page-detail text-center">
              <h2 class="entry-title page-title">
                <a href="#!">Need To Make A Change?</a>
                <div class="metas">
                  All positivity & high vibrations welcome&nbsp;
                </div>
              </h2>
            </div>
            <div class="e-divider-2"></div>
            <div class="text-center">
              <div class="ornament-divider-fullwidth">
                <i class="flaticon-art-3"></i>
              </div>
            </div>

            <div class="inner-content"></div>
          </article>
        </div>
      </div>
    </section>
    <!-- /Page Content -->

    <!-- Feedback Block -->
    <section id="feedback-block" class="e-block-null text-center">
      <div class="container padding-side-60">
        <!--<div class="row">-->
        <!--<h3 class="font-accident-two-normal e-uppercase text-center lined-long">Drop Me a Line</h3>-->
        <!--<div class="e-divider-1"></div>-->
        <!--<p class="small fontcolor-medium text-center">-->
        <!--Customize your website as you want using different colors and 100% free fonts. Build it from pieces and-->
        <!--blocks as simple as Lego. <br>-->
        <!--Electronic Website Template is fully responsive, looks and works perfect on any device.-->
        <!--</p>-->
        <!--</div>-->
        <!--<div class="e-divider-4"></div>-->
        <div class="row">
          <div class="col-md-12 e-centered">
            <div id="form-messages"></div>
            <form
              v-on:submit.prevent="updateBoard()"
              id="ajax-contact"
              method="post"
              action="assets/custom/php/form.php"
              class="wpcf7-form"
            >
              <div class="field">
                <!--<label for="title">Title:</label>-->
                <input
                  type="text"
                  name="name"
                  placeholder="Title"
                  required
                  v-model="board.title"
                />
              </div>
              <div class="e-divider-1"></div>
              <div class="field">
                <!--<label for="description">Description:</label>-->
                <input
                  type="text"
                  name="name"
                  placeholder="What's the collective theme?"
                  required
                  v-model="board.description"
                />
              </div>
              <div class="e-divider-2"></div>

              <div class="field text-center">
                <button type="submit" class="btn btn-lg btn-rose">
                  Save Changes
                </button>
              </div>
              <div class="field text-center">
                <button
                  v-on:click="destroyBoard()"
                  type="submit"
                  class="btn btn-lg btn-blk"
                >
                  Delete Board
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- /Feedback Block -->

    <div class="e-divider-6"></div>
    <div class="text-center">
      <div class="ornament-divider-fullwidth">
        <i class="flaticon-art-3"></i>
      </div>
    </div>
    <div class="e-divider-4"></div>

    <div class="container">
      <div class="col-md-8 pull-left">
        <div class="row">
          <article
            v-for="boardPost in board.board_posts"
            v-bind:key="boardPost.id"
            id="02"
            class="post-block col-md-12 post hentry"
          >
            <div class="post-detail">
              <h2 class="entry-title">
                {{ boardPost.post.name }}
              </h2>
            </div>

            <div class="post-excerpt">
              <p>
                {{ boardPost.post.body }}
              </p>
            </div>
            <div class="">
              <button
                v-on:click="destroyBoardPost(boardPost)"
                class="btn btn-default tf-btn txt-link btn-rose-str"
              >
                Remove From Board
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
    <!-- <div v-for="boardPost in board.board_posts" v-bind:key="boardPost.id">
      <h3>{{ boardPost.post.name }}</h3>
      <p>{{ boardPost.post.body }}</p>
      <button v-on:click="destroyBoardPost(boardPost)">
        Remove From Board
      </button>
    </div> -->
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
      if (confirm("Are you sure you want to delete your board?")) {
        axios.delete(`/api/boards/${this.board.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/boards");
        });
      }
    },
    destroyBoardPost: function(boardPost) {
      if (
        confirm("Are you sure you want to remove this post from your board?")
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

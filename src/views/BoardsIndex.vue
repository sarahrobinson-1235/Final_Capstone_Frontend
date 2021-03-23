<template>
  <div class="boards-index">
    <section id="articles" class="post-grid">
      <div class="container">
        <div class="row no-sidebar">
          <article id="01" class="page-block col-md-12 page hentry">
            <div class="e-divider-2"></div>

            <div class="page-detail text-center">
              <h2 class="entry-title page-title">
                Browse Through Boards Created By Our Members..
              </h2>
            </div>
            <div class="e-divider-2"></div>
            <div class="text-center">
              <div class="ornament-divider-fullwidth">
                <i class="flaticon-art-3"></i>
              </div>
            </div>
          </article>

          <!-- Search Box -->
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <p>
                  <input
                    class="newsletter-email"
                    name="ne"
                    placeholder="Search boards"
                    v-model="search"
                    list="titles"
                  />
                </p>
              </div>
            </div>
          </div>
          <!-- /Search Box -->

          <!--Content Column-->
          <div class="col-md-12 flex">
            <div class="row row-flex row-flex-wrap">
              <article
                v-for="board in filterBy(boards, search)"
                v-bind:key="board.id"
                id="12"
                class="post-block col-md-4 post hentry"
              >
                <div class="box">
                  <div class="img-wrap">
                    <router-link :to="`/boards/${board.id}`"
                      ><img
                        class="img-responsive"
                        v-bind:src="board.user.image_url"
                        alt=""
                    /></router-link>
                  </div>
                  <div class="post-detail">
                    <h2 class="entry-title">
                      <router-link :to="`/boards/${board.id}`">{{
                        board.title
                      }}</router-link>
                    </h2>
                    <div class="metas">
                      Updated:
                      {{ relativeDate(board.updated_at) }}/&nbsp; Posted by:
                      <router-link :to="`/users/${board.user.id}`">{{
                        board.user.name
                      }}</router-link
                      >&nbsp;
                    </div>
                  </div>
                  <div class="post-excerpt">
                    <p>
                      {{ board.description }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <!--/Content Column-->
        </div>
      </div>
    </section>
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
      search: "",
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

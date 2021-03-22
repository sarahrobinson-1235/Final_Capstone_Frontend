<template>
  <div class="boards-index">
    <!-- Content Sections -->
    <div id="content">
      <!-- Post Feed -->
      <h1>Browse Through Boards Created By Our Members..</h1>

      <input
        type="text"
        id="form1"
        class="form-control rounded"
        placeholder="Search..."
        aria-label="Search"
        v-model="search"
        list="titles"
      />
      <section id="articles" class="post-grid">
        <div class="input-group rounded">
          <router-link to="/boards/new"
            ><input
              class="newsletter-submit btn btn-rose"
              type="submit"
              value="Create New Board"
            />
          </router-link>

          <div class="container"></div>
          <div class="row no-sidebar">
            <!--Content Column-->
            <div class="col-md-12 flex">
              <div class="row row-flex row-flex-wrap">
                <article
                  v-for="board in filterBy(boards, search)"
                  v-bind:key="board.id"
                  id="04"
                  class="post-block col-md-4 post hentry"
                >
                  <div class="box">
                    <div class="img-wrap">
                      <a href="blog-post.html">
                        <section class="author-info">
                          <div class="author-avatar">
                            <router-link :to="`/users/${board.user.id}`">
                              <img
                                class="img-responsive"
                                v-bind:src="board.user.image_url"
                                alt="01"
                              />
                            </router-link>
                          </div>
                        </section>
                      </a>
                    </div>
                    <div class="post-detail">
                      <div class="meta-cat">
                        <router-link
                          :to="`/boards/${board.id}`"
                          rel="category tag"
                          >See More</router-link
                        >
                      </div>
                      <h2 class="entry-title">
                        {{ board.title }}
                      </h2>
                      <div class="metas">
                        Updated:
                        {{ relativeDate(board.updated_at) }} /
                        <router-link
                          :to="`/users/${board.user.id}`"
                          rel="category tag"
                          >Creator: {{ board.user.name }} &nbsp;
                        </router-link>
                      </div>
                    </div>
                    <blockquote>
                      {{ board.description }}
                    </blockquote>
                    <div class="post-excerpt"></div>
                    <div class="continue-btn">
                      <a
                        href="blog-post.html"
                        class="btn btn-default tf-btn txt-link btn-rose-str"
                        >Continue reading...</a
                      >
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <!--/Content Column-->
          </div>
        </div>
      </section>
      <!-- /Post Feed -->

      <div class="e-divider-6"></div>
      <div class="text-center">
        <div class="ornament-divider-fullwidth">
          <i class="flaticon-art-3"></i>
        </div>
      </div>
      <div class="e-divider-4"></div>
    </div>
    <!-- /Content Sections -->
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
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    }
  }
};
</script>

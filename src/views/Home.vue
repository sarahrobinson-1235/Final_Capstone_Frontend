<template>
  <div class="home">
    <!-- Page Content -->
    <section id="articles" class="">
      <div class="container">
        <div class="row">
          <article id="01" class="page-block col-md-12 page hentry">
            <div class="e-divider-2"></div>
            <div class="page-detail text-center">
              <h2 class="entry-title page-title">
                <h4 class="entry-title page-title">Featured Quote</h4>
                "{{ featured_quote[0].body }}"
              </h2>
            </div>
            <div class="e-divider-2"></div>
            <div class="text-center">
              <div class="ornament-divider-fullwidth">
                <i class="flaticon-art-3"></i>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <!-- /Page Content -->
    <div class="e-divider-2"></div>
    <!-- Search Box -->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p>
            <input
              class="newsletter-email"
              name="ne"
              placeholder="Search affirmations"
              v-model="search"
              list="titles"
            />
          </p>
        </div>
      </div>
    </div>
    <!-- /Search Box -->
    <!-- Post Feed -->
    <section id="articles" class="post-grid">
      <div class="container">
        <div class="row no-sidebar">
          <!--Content Column-->
          <div class="col-md-12 flex">
            <div class="row row-flex row-flex-wrap">
              <article
                v-for="post in filterBy(posts, search)"
                v-bind:key="post.id"
                id="04"
                class="post-block col-md-4 post hentry"
              >
                <div class="box">
                  <div class="img-wrap">
                    <router-link
                      :to="`/posts/${post.id}`"
                      class="btn btn-default tf-btn txt-link
                    btn-rose-str"
                    >
                      <img
                        class="img-responsive"
                        v-bind:src="post.image_url"
                        alt="01"
                      />
                    </router-link>
                  </div>
                  <div class="post-detail">
                    <h2 class="entry-title">
                      <router-link :to="`/posts/${post.id}`">{{
                        post.name
                      }}</router-link>
                    </h2>
                    <div class="metas">
                      Posted
                      {{ relativeDate(post.created_at) }}/&nbsp; Posted by:
                      <router-link
                        :to="`/users/${post.user.id}`"
                        class="meta-author"
                        >{{ post.user.name }}</router-link
                      >
                    </div>
                  </div>
                  <blockquote>
                    {{ post.body }}
                    <footer>{{ post.user.name }}</footer>
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

    <div class="text-center">
      <div class="ornament-divider-fullwidth">
        <i class="flaticon-art-3"></i>
      </div>
    </div>
    <div class="e-divider-4"></div>
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
      message: "",
      posts: [],
      search: "",
      board_id: "",
      boards: [],
      featured_quote: [],
    };
  },
  created: function() {
    this.indexPosts();
    axios.get("api/boards/me").then((response) => {
      this.boards = response.data;
      console.log(response.data);
    });
    axios.get("api/quote").then((response) => {
      this.featured_quote = response.data;
      console.log(response.data);
    });
  },
  methods: {
    indexPosts: function() {
      axios
        .get("/api/posts")
        .then((response) => {
          console.log(response.data);
          this.posts = response.data.reverse();
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
    createBoardPost: function(post) {
      var params = {
        board_id: this.board_id,
        post_id: post.id,
      };
      axios
        .post("/api/board_posts", params)
        .then((response) => {
          this.message = response.data.message;
          console.log(this.message);
          alert(this.message);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

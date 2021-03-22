<template>
  <div class="home">
    <!-- Content Sections -->
    <div id="content">
      <!--Owl Carousel-->
      <section id="owl-carousel">
        <div class="container">
          <div class="owl-carousel owl-theme">
            <div class="item">
              <div class="feat-post text-center">
                <div class="feat-wrapper">
                  <div class="feat-metas">
                    <div class="ornament-divider-fullwidth">
                      <i class="flaticon-art-9"></i>
                    </div>
                    <a href="#!" class="meta-cat">Featured Affirmations</a>
                    <h2 class="font-accident-two-normal text-nowrap">
                      "{{ featured_quote[0].body }}"
                    </h2>
                  </div>
                </div>
              </div>
              <img
                src="/assets/custom/images/demo01/03.jpg"
                class="img-responsive"
                alt="01"
              />
            </div>

            <div class="item">
              <div class="feat-post text-center">
                <div class="feat-wrapper">
                  <div class="feat-metas">
                    <div class="ornament-divider-fullwidth">
                      <i class="flaticon-art-9"></i>
                    </div>
                    <a href="#!" class="meta-cat">Featured Affirmations</a>
                    <h2 class="font-accident-two-normal text-nowrap">
                      "{{ featured_quote[1].body }}"
                    </h2>
                  </div>
                </div>
              </div>
              <img
                src="/assets/custom/images/demo01/03.jpg"
                class="img-responsive"
                alt="01"
              />
            </div>

            <div class="item">
              <div class="feat-post text-center">
                <div class="feat-wrapper">
                  <div class="feat-metas">
                    <div class="ornament-divider-fullwidth">
                      <i class="flaticon-art-9"></i>
                    </div>
                    <a href="#!" class="meta-cat">Featured Affirmations</a>
                    <h2 class="font-accident-two-normal text-nowrap">
                      "{{ featured_quote[2].body }}"
                    </h2>
                  </div>
                </div>
              </div>
              <img
                src="/assets/custom/images/demo01/03.jpg"
                class="img-responsive"
                alt="01"
              />
            </div>
          </div>
        </div>
        <div class="e-divider-6"></div>
      </section>
      <!--/Owl Carousel-->

      <!-- Post Feed -->
      <section id="articles" class="post-grid">
        <div class="input-group rounded">
          <input
            type="text"
            id="form1"
            class="form-control rounded"
            placeholder="Search..."
            aria-label="Search"
            v-model="search"
            list="titles"
          />
          <router-link to="/posts/new"
            ><input
              class="newsletter-submit btn btn-rose"
              type="submit"
              value="Create New Post"
            />
          </router-link>
          <h1>Recent Posts</h1>
          <div class="container"></div>
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
                      <a href="blog-post.html">
                        <router-link :to="`/posts/${post.id}`">
                        <img 
                          class="avatar img-circle img-responsive"
                          v-bind:src="post.image_url"
                          alt="01"
                        />
                        </router-link>
                      </a>
                    </div>
                    <div class="post-detail">
                      <div class="meta-cat">
                        <router-link
                          :to="`/posts/${post.id}`"
                          rel="category tag"
                          >View Post</router-link
                        >
                      </div>
                      <h2 class="entry-title">
                        <a href="blog-post.html">{{ post.name }}</a>
                      </h2>
                      <div class="metas">
                        Posted:
                        {{ relativeDate(post.created_at) }} /
                        <router-link
                          :to="`/users/${post.user.id}`"
                          rel="category tag"
                          >Creator: {{ post.user.name }} &nbsp;
                        </router-link>
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
// import anime from 'animejs/lib/anime.es.js';

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "",
      posts: [],
      search: "",
      board_id: "",
      boards: [],
      featured_quote: []
    };
  },
  created: function() {
    this.indexPosts();
    axios.get("api/boards/me").then(response => {
      this.boards = response.data;
      console.log(response.data);
    });
    axios.get("api/quote").then(response => {
      this.featured_quote = response.data;
      console.log(response.data);
    });
  },
  methods: {
    indexPosts: function() {
      axios
        .get("/api/posts")
        .then(response => {
          console.log(response.data);
          this.posts = response.data;
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
    },
    createBoardPost: function(post) {
      var params = {
        board_id: this.board_id,
        post_id: post.id
      };
      axios
        .post("/api/board_posts", params)
        .then(response => {
          this.message = response.data.message;
          console.log(this.message);
          alert(this.message);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
    // popUp: function() {
    //   alert(this.message);
    // }
  }
};
</script>

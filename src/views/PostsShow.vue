<template>
  <div class="posts-show">
    <!-- Articles -->
    <router-link
      v-if="!$parent.isLoggedIn()"
      to="/login"
      class="btn btn-small btn-rose-str"
      >Log In to Access</router-link
    >
    <section id="articles" class="">
      <div class="container">
        <div class="row has-sidebar-right">
          <!--Content Column-->
          <div class="col-md-8 pull-left">
            <div class="row row-flex row-flex-wrap">
              <article id="01" class="post-block col-md-12 post hentry">
                <div class="post-detail">
                  <div class="meta-cat">
                    <router-link
                      :to="`/users/${post.user.id}`"
                      rel="category tag"
                      >Creator: {{ post.user.name }} &nbsp;
                    </router-link>
                  </div>
                  <h2 class="entry-title">
                    {{ post.name }}
                  </h2>
                  <div class="metas">
                    Posted:
                    {{ relativeDate(post.created_at) }}/&nbsp; Likes:
                    {{ post.likes }}
                  </div>
                </div>
                <router-link v-if="owner()" :to="`/posts/${post.id}/edit`"
                  ><button class="newsletter-submit btn btn-rose">
                    Edit Post
                  </button></router-link
                >
                <div class="img-wrap">
                  <img
                    class="img-responsive"
                    v-bind:src="post.image_url"
                    alt=""
                  />
                </div>
                <section class="author-info">
                  <div class="inner-content">
                    <blockquote>
                      {{ post.body }}
                      <footer>
                        <router-link :to="`/users/${post.user.id}`">
                          {{ post.user.name }}</router-link
                        >
                      </footer>
                    </blockquote>
                  </div>
                </section>

                <!--Author-info-->
                <section class="author-info">
                  <div class="author-avatar">
                    <img
                      alt=""
                      v-bind:src="post.user.image_url"
                      class="avatar img-circle"
                    />
                  </div>
                  <div class="author-description">
                    <h2 class="author-title">
                      <span class="author-heading">Creator:</span>
                      {{ post.user.name }}
                    </h2>
                    <p class="author-bio">
                      Always remember to stay positive <br />and be kind.
                      <router-link
                        :to="`/users/${post.user.id}`"
                        class="author-link"
                        rel="author"
                      >
                        View all posts by {{ post.user.name }}
                      </router-link>
                    </p>
                  </div>
                </section>

                <div class="e-divider-8"></div>
              </article>
            </div>
          </div>
          <!--/Content Column-->

          <!--Sidebar-->
          <div class="col-md-4 sticky-column" data-sticky_column>
            <div class="sidebar">
              <!--Newsletter Widget-->
              <aside
                id="newsletter-widget"
                class="widget widget_newsletterwidget"
              >
                <div class="title widget-title lined">Love this quote?</div>
                <h2 class="author-heading">
                  Add affirmations to your boards easily <br />Just pick a board
                  and save!
                </h2>
                <div
                  class="newsletter newsletter-widget newsletter-firstname form-group"
                  placeholder="Boards"
                >
                  <form>
                    <input type="hidden" name="nr" value="widget" />
                    <select v-model="board_id" id=""
                      ><option
                        :value="board.id"
                        v-for="board in boards"
                        v-bind:key="board.id"
                        >{{ board.title }}</option
                      ></select
                    >
                    <div class="e-divider-8"></div>
                    <p>
                      <input
                        class="newsletter-submit btn btn-rose"
                        type="submit"
                        value="Add to Board"
                      />
                    </p>
                    <div class="e-divider-8"></div>
                    <p>
                      <router-link to="/boards/new"
                        ><input
                          class="newsletter-submit btn btn-rose"
                          type="submit"
                          value="Create New Board"
                        />
                      </router-link>
                    </p>
                  </form>
                </div>
                <div class="clearfix"></div>
              </aside>
              <!--/Newsletter Widget-->
            </div>
          </div>
          <!--/Sidebar-->
        </div>
      </div>
    </section>
    <!-- /Articles -->

    <div class="e-divider-6"></div>
    <div class="text-center">
      <div class="ornament-divider-fullwidth">
        <i class="flaticon-art-3"></i>
      </div>
    </div>
    <div class="e-divider-4"></div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      post: { user: {} },
      board_id: "",
      message: "",
      errors: [],
      boards: [],
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      this.post = response.data;
      console.log(this.post);
    });
    axios.get("api/boards/me").then((response) => {
      this.boards = response.data;
      console.log(response.data);
    });
  },
  methods: {
    owner: function() {
      return this.$parent.getUserId() == this.post.user.id;
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    },

    createBoardPost: function() {
      var params = {
        board_id: this.board_id,
        post_id: this.post.id,
      };
      axios
        .post("/api/board_posts", params)
        .then((response) => {
          this.board_post = response.data;
          console.log(this.board_post);
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      this.message = "Post added to your board!";
    },
  },
};
</script>

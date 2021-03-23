<template>
  <div class="boards-show">
    <!-- Post Feed -->
    <section id="articles" class="">
      <div class="container">
        <div class="row no-sidebar">
          <article id="01" class="page-block col-md-12 page hentry">
            <div class="e-divider-2"></div>

            <div class="page-detail text-center">
              <h2 class="entry-title page-title">
                {{ board.title }} <br />
                <h3 class="entry-title page-title">
                  '{{ board.description }}'
                </h3>
              </h2>
              <router-link
                v-if="$parent.getUserId() == board.user.id"
                :to="`/boards/${board.id}/edit`"
                class="newsletter-submit btn btn-rose"
                >Edit Board</router-link
              >
            </div>
            <div class="e-divider-2"></div>
            <div class="text-center">
              <div class="ornament-divider-fullwidth">
                <i class="flaticon-art-3"></i>
              </div>
            </div>
          </article>
          <!--Content Column-->
          <div class="col-md-12">
            <div class="row">
              <article
                v-for="boardPost in board.board_posts"
                v-bind:key="boardPost.post.id"
                id="04"
                class="post-block col-md-12 post hentry"
              >
                <div class="post-detail">
                  <h2 class="entry-title">
                    <router-link :to="`/posts/${boardPost.post.id}`">{{
                      boardPost.post.name
                    }}</router-link>
                  </h2>
                  <div class="metas">
                    Posted:
                    {{ relativeDate(boardPost.post.created_at) }}/&nbsp; Posted
                    by:
                    <router-link
                      :to="`/users/${boardPost.post.user.id}`"
                      rel="category tag"
                      >{{ boardPost.post.user.name }}</router-link
                    >&nbsp;
                  </div>
                </div>
                <div class="img-wrap">
                  <router-link
                    class="btn btn-default tf-btn txt-link
                    btn-rose-str"
                    :to="`/posts/${boardPost.post.id}`"
                  >
                    <img
                      class="img-responsive"
                      v-bind:src="boardPost.post.image_url"
                      alt=""
                    />
                  </router-link>
                </div>
                <blockquote>
                  {{ boardPost.post.body }}
                  <footer>{{ boardPost.post.user.name }}</footer>
                </blockquote>
                <div class="post-excerpt"></div>
                <div class="">
                  <router-link
                    :to="`/posts/${boardPost.post.id}`"
                    class="btn btn-default tf-btn txt-link btn-rose-str"
                    >See More...</router-link
                  >
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
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      board: { user: {} },
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then((response) => {
      this.board = response.data;
      console.log(this.board);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

<template>
  <div class="users-show">
    <!-- Post Feed -->
    <section id="articles" class="">
      <div class="container">
        <div class="row has-sidebar-right">
          <!--Content Column-->
          <div class="col-md-8 pull-left">
            <div class="row">
              <article
                v-for="board in boards"
                v-bind:key="board.id"
                id="02"
                class="post-block col-md-12 post hentry"
              >
                <div class="post-detail">
                  <h2 class="entry-title">
                    <router-link :to="`/boards/${board.id}`">{{
                      board.title
                    }}</router-link>
                  </h2>
                  <div class="metas">
                    Updated: {{ relativeDate(board.updated_at) }}/ Posted by:
                    {{ user.name }}
                  </div>
                </div>

                <div class="post-excerpt">
                  <p>
                    {{ board.description }}
                  </p>
                </div>
                <div class="">
                  <router-link
                    :to="`/boards/${board.id}`"
                    class="btn btn-default tf-btn txt-link btn-rose-str"
                    >See More</router-link
                  >
                </div>
              </article>

              <article
                v-for="post in posts"
                v-bind:key="post.id"
                id="04"
                class="post-block col-md-12 post hentry"
              >
                <div class="post-detail">
                  <h2 class="entry-title">
                    {{ post.name }}
                  </h2>
                  <div class="metas">
                    Posted: {{ relativeDate(post.created_at) }}/&nbsp; Posted
                    by: {{ post.user.name }}
                  </div>
                </div>
                <div class="img-wrap">
                  <router-link
                    :to="`/posts/${post.id}`"
                    class="btn btn-default tf-btn txt-link
                    btn-rose-str"
                  >
                    <img
                      class="img-responsive"
                      v-bind:src="post.image_url"
                      alt=""
                    />
                  </router-link>
                </div>

                <blockquote>
                  {{ post.body }}
                  <footer>{{ post.user.name }}</footer>
                </blockquote>

                <div class="post-excerpt"></div>
                <div class="">
                  <router-link
                    :to="`/posts/${post.id}`"
                    class="btn btn-default tf-btn txt-link
                    btn-rose-str"
                    >See More</router-link
                  >
                </div>
              </article>
            </div>
          </div>
          <!--/Content Column-->

          <!--Sidebar-->
          <div class="col-md-4 sticky-column" data-sticky_column>
            <div class="sidebar">
              <!--About Widget-->
              <aside id="about-widget" class="widget widget_about">
                <div class="text-center widget-wrap">
                  <div class="e-divider-4"></div>
                  <img
                    class="img-circle  author-img"
                    :src="user.image_url"
                    alt="01"
                  />
                  <div class="e-divider-3"></div>
                  <h3>{{ user.email }}</h3>
                  <div class="e-divider-3"></div>
                  <h5 class="hello">Hey I'm {{ user.name }} !</h5>
                  <h5 class="hello">
                    Thanks for checking out my page
                  </h5>

                  <div class="e-divider-2"></div>
                  <router-link v-if="owner()" :to="`/users/${user.id}/edit`"
                    ><button class="newsletter-submit btn btn-rose">
                      Edit Profile
                    </button></router-link
                  >
                </div>
                <div class="clearfix"></div>
              </aside>
              <!--/ About Widget-->
            </div>
          </div>
          <!--/Sidebar-->
        </div>
      </div>
    </section>
    <!-- /Post Feed -->
  </div>
</template>
<style></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      user: {},
      posts: [],
      boards: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      this.posts = this.user.posts;
      this.boards = this.user.boards;
      console.log(this.user);
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    owner: function() {
      return this.$parent.getUserId() == this.user.id;
    },
  },
};
</script>

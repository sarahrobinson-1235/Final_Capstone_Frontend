<template>
  <div class="posts-edit">
    <div class="e-divider-2"></div>

    <!-- Page Content -->
    <section id="articles" class="">
      <div class="container">
        <div class="row">
          <article id="01" class="page-block col-md-12 page hentry">
            <div class="e-divider-2"></div>
            <div class="page-detail text-center">
              <h2 class="entry-title page-title">
                <a href="#!">Need To Make A Change?</a>
              </h2>
            </div>
            <div class="e-divider-2"></div>
            <div class="text-center">
              <div class="ornament-divider-fullwidth">
                <i class="flaticon-art-3"></i>
              </div>
            </div>
            <div class="e-divider-8"></div>
            <ul>
              <li
                class="text-danger"
                v-for="error in errors"
                v-bind:key="error"
              >
                {{ error }}
              </li>
            </ul>

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
            <div class="e-divider-2"></div>
            <div id="form-messages"></div>
            <form
              v-on:submit.prevent="updatePost()"
              id="ajax-contact"
              method="post"
              action="assets/custom/php/form.php"
              class="wpcf7-form"
            >
              <div class="field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name Your Post"
                  required
                  v-model="post.name"
                />
              </div>
              <div class="e-divider-1"></div>
              <div class="field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                  v-model="post.image_url"
                />
              </div>
              <div class="e-divider-1"></div>
              <div class="field">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="7"
                  cols="30"
                  required
                  v-model="post.body"
                ></textarea>
              </div>
              <div class="e-divider-1"></div>
              <div>
                <img :src="post.image_url" alt="" />
              </div>
              <div class="e-divider-2"></div>

              <div class="field text-center">
                <button type="submit" class="btn btn-rose">
                  Save Changes
                </button>
                <div class="field text-center">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    value="Submit"
                    v-on:click="destroyPost()"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="e-divider-6"></div>
    </section>
    <!-- /Feedback Block -->

    <div class="e-divider-10"></div>

    <div class="e-divider-6"></div>
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

export default {
  data: function() {
    return {
      post: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      this.post = response.data;
      console.log(this.post);
    });
  },
  methods: {
    updatePost: function() {
      var params = {
        name: this.post.name,
        body: this.post.body,
        image_url: this.post.image_url,
      };
      axios
        .patch(`/api/posts/${this.post.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/posts/${this.post.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyPost: function() {
      if (confirm("Are you aure you want to delete your affirmation?")) {
        axios.delete(`/api/posts/${this.post.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>

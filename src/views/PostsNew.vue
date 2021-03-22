<template>
  <div class="posts-new">
    <!-- Content Sections -->
    <div id="content">
      <div class="e-divider-2"></div>

      <!-- Page Content -->
      <section id="articles" class="">
        <div class="container">
          <div class="row">
            <article id="01" class="page-block col-md-12 page hentry">
              <div class="e-divider-2"></div>
              <div class="page-detail text-center">
                <h2 class="entry-title page-title">
                  Be Creative..Be Expressive
                </h2>
                <div class="metas">
                  All positivity and high vibrations welcome&nbsp;
                </div>
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
                v-on:submit.prevent="createPost()"
                id="ajax-contact"
                method="post"
                action="assets/custom/php/form.php"
                class="wpcf7-form"
              >
                <div class="field">
                  <!--<label for="name">Name:</label>-->
                  <input
                    type="text"
                    placeholder="Name Your Post"
                    required
                    v-model="name"
                  />
                </div>
                <div class="e-divider-1"></div>
                <div class="field">
                  <!--<label for="email">Email:</label>-->
                  <textarea
                    type="text"
                    placeholder="Write your affirmation here..."
                    rows="7"
                    cols="30"
                    required
                    v-model="body"
                  ></textarea>
                </div>
                <div class="e-divider-1"></div>
                <div class="field">
                  <input
                    type="text"
                    placeholder="Add a picture..."
                    v-model="image_url"
                  />
                </div>
                <div class="e-divider-1"></div>

                <div class="field text-center">
                  <button type="submit" class="btn btn-success" value="Submit">
                    Create Post!
                  </button>
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
    <!-- /Content Sections -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      body: "",
      image_url: "",
      errors: []
    };
  },
  methods: {
    createPost: function() {
      var params = {
        name: this.name,
        body: this.body,
        image_url: this.image_url
      };
      axios
        .post("/api/posts", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

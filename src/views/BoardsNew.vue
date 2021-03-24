<template>
  <div class="boards-new">
    <router-link
      v-if="!$parent.isLoggedIn()"
      to="/login"
      class="btn btn-small btn-rose-str"
      >Log In to Access</router-link
    >
    <!-- Page Content -->
    <section id="articles" class="">
      <div class="container">
        <div class="row">
          <article id="01" class="page-block col-md-12 page hentry">
            <div class="e-divider-2"></div>
            <div class="page-detail text-center">
              <h2 class="entry-title page-title">
                Here you can create endless collections of yours and others'
                posts...
              </h2>
              <div class="metas">
                All positivity & high vibrations welcome&nbsp;
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
              v-on:submit.prevent="createBoard()"
              id="ajax-contact"
              method="post"
              action="assets/custom/php/form.php"
              class="wpcf7-form"
            >
              <div class="field">
                <!--<label for="name">Name:</label>-->
                <input
                  type="text"
                  placeholder="Title"
                  required
                  v-model="title"
                />
              </div>
              <div class="e-divider-1"></div>
              <div class="field">
                <!--<label for="email">Email:</label>-->
                <input
                  type="text"
                  placeholder="What's the collective theme?"
                  required
                  v-model="description"
                />
              </div>
              <div class="e-divider-1"></div>

              <div class="field text-center">
                <button type="submit" class="btn btn-rose" value="Submit">
                  Create Board
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
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      description: "",
      errors: [],
      boards: [],
    };
  },

  methods: {
    createBoard: function() {
      var params = {
        title: this.title,
        description: this.description,
      };
      axios
        .post("/api/boards", params)
        .then((response) => {
          console.log(response.data);
          this.boards.unshift(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

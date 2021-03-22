<template>
  <div class="login">
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
                  <a href="#!">Login</a>
                </h2>
                <div class="metas">
                  <router-link to="/signup"
                    >Don't have an account yet?</router-link
                  >&nbsp;
                </div>
              </div>
              <div class="e-divider-2"></div>
              <div class="text-center">
                <div class="ornament-divider-fullwidth">
                  <i class="flaticon-art-3"></i>
                </div>
              </div>
              <div class="e-divider-8"></div>

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
                v-on:submit.prevent="submit()"
                id="ajax-contact"
                method="post"
                action="assets/custom/php/form.php"
                class="wpcf7-form"
              >
                <div class="field">
                  <!--<label for="name">Name:</label>-->
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email..."
                    required
                    v-model="email"
                  />
                </div>
                <div class="e-divider-1"></div>
                <div class="field">
                  <!--<label for="email">Email:</label>-->
                  <input
                    type="password"
                    placeholder="Enter password..."
                    required
                    v-model="password"
                  />
                </div>
                <div class="e-divider-1"></div>
                <div class="e-divider-1"></div>
                <div class="e-divider-2"></div>

                <div class="field text-center">
                  <button
                    type="submit"
                    class="btn btn-lg btn-blk"
                    value="Submit"
                  >
                    Login
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
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

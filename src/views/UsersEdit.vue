<template>
  <div class="users-edit">
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
                  <a href="#!">Update Your Profile Below</a>
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
                v-on:submit.prevent="updateUser()"
                id="ajax-contact"
                method="post"
                action="assets/custom/php/form.php"
                class="wpcf7-form"
              >
                <div class="field">
                  <!--<label for="name">Name:</label>-->
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    v-model="user.name"
                  />
                </div>
                <div class="e-divider-1"></div>
                <div class="field">
                  <!--<label for="email">Email:</label>-->
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email..."
                    required
                    v-model="user.email"
                  />
                </div>
                <div class="e-divider-1"></div>
              
                <div class="field">
                  <!--<label for="message">Message:</label>-->
                  <input
                    type="text"
                    placeholder="Change profile pic..."
                    required
                    v-model="user.image_url"
                  />
                </div>
                <div class="e-divider-1"></div>
                <div class="field">
                  <!--<label for="message">Message:</label>-->
                  <input
                    type="password"
                    placeholder="Enter password or create a new one..."
                    required
                    v-model="user.password"
                  />
                </div>
                
                <div class="e-divider-1"></div>
                  <div class="field">
                  <!--<label for="message">Message:</label>-->
                  <input
                    type="password"
                    placeholder="Confirm password..."
                    required
                    v-model="user.password_confirmation"
                  />
                </div>
                <div class="e-divider-2"></div>

                <div class="field text-center">
                  <button
                    type="submit"
                    class="btn btn-lg btn-blk"
                    value="Submit"
                  >
                    Confirm Changes!
                  </button>
                </div>
                <div class="field text-center">
                  <button
                    type="submit"
                    class="btn btn-lg btn-blk"
                    value="Submit"
                    v-on:click="destroyUser()"
                  >
                    Delete Profile
                  </button>
                </div>
                <div>
                  <img :src="user.image_url" alt="" />
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

    <form v-on:submit.prevent="updateUser()">
      <h1>Update Your Profile Below!</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Change Password:</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>
      <div class="form-group">
        <label>Profile Pic:</label>
        <input type="text" class="form-control" v-model="user.image_url" />
      </div>
      <div>
        <img :src="user.image_url" alt="" />
      </div>
      <input type="submit" class="btn btn-primary" value="Save Changes" />
      <button v-on:click="destroyUser()">Delete Profile</button>
    </form>
  </div>
</template>
<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {
    updateUser: function() {
      var params = {
        name: this.user.name,
        email: this.user.email,
        image_url: this.user.image_url,
        password: this.user.password,
        password_confirmation: this.user.password_confirmation
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then(response => {
          console.log(response.data);

          this.$router.push(`/users/${this.user.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your profile?")) {
        axios.delete(`/api/users/${this.user.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/posts");
        });
      }
    }
  }
};
</script>

<template>
  <div class="users-edit">
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
      <!-- <div class="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password_confirmation"
        />
      </div> -->
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
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
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
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          console.log(response.data);

          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your profile?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/posts");
        });
      }
    },
  },
};
</script>

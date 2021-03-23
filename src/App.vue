<template>
  <div id="app">
    <!-- Header -->
    <header class="cbp-af-header toggled">
      <div class="cbp-af-inner">
        <div class="navbar navbar-default" role="navigation">
          <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <h1 class="text-center">
                <a href="index.html">Lovely Affirmations</a>
              </h1>
              <span class="small subtitle"
                ><span class="lined"
                  >All positivity & high vibrations welcome</span
                ></span
              >
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
          </div>
          <div class="container">
            <div class="bordered">
              <!-- Collect the nav links, forms, and other content for toggling -->
              <nav
                class="collapse navbar-collapse navbar-ex1-collapse e-centered"
              >
                <ul class="nav navbar-nav">
                  <li>
                    <router-link to="/">Home</router-link>
                  </li>
                  <li v-if="isLoggedIn()">
                    <router-link to="/posts/new">New Post</router-link>
                  </li>
                  <li v-if="isLoggedIn()">
                    <router-link to="/boards">Boards</router-link>
                  </li>
                  <li v-if="isLoggedIn()">
                    <router-link to="/boards/new">New Board</router-link>
                  </li>
                  <li v-if="!isLoggedIn()">
                    <router-link to="/signup">Signup</router-link>
                  </li>
                  <li v-if="!isLoggedIn()">
                    <router-link to="/login">Login</router-link>
                  </li>
                  <li v-if="isLoggedIn()">
                    <router-link :to="`/users/${getUserId()}`"
                      >Profile</router-link
                    >
                  </li>
                  <li v-if="isLoggedIn()">
                    <router-link to="/logout">Logout</router-link>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="e-divider-1 bg-color00"></div>
          </div>
        </div>
      </div>
    </header>
    <!-- / Header -->

    <!-- Content Sections -->
    <div id="content">
      <!-- Vue Templates Injected Here -->
      <router-view />
    </div>
    <!-- /Content Sections -->
    <!-- footer -->
    <footer>
      <div id="footer-wrapper" class="">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="footer-sign">
                <i class="flaticon-christmas-rose"></i>
              </div>
              <div class="footer-title">
                <h2 class="font-accident-two-normal darkrose uppercase">
                  Emma Fletcher
                </h2>
                <span class="small subtitle darkrose"
                  >The Fashion Designer and Artist</span
                >
                <div class="e-divider-5"></div>
              </div>
            </div>
            <div class="col-md-5">
              <p>
                <input
                  class="newsletter-email"
                  type="email"
                  required=""
                  name="ne"
                  placeholder="Subscribe to news"
                />
              </p>
            </div>
            <div class="col-md-3">
              <!--<div class="e-divider-1"></div>-->
              <div class="follow">
                <ul class="list-inline social">
                  <li>
                    <a target="_blank" href="#" class="rst-icon-facebook"
                      ><i class="fa fa-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a target="_blank" href="#" class="rst-icon-twitter"
                      ><i class="fa fa-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a target="_blank" href="#" class="rst-icon-pinterest"
                      ><i class="fa fa-pinterest"></i
                    ></a>
                  </li>
                  <li>
                    <a target="_blank" href="#" class="rst-icon-instagram"
                      ><i class="fa fa-instagram"></i
                    ></a>
                  </li>
                  <li>
                    <a target="_blank" href="#" class="rst-icon-youtube"
                      ><i class="fa fa-youtube"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="infoblock">
                <!-- About Widget -->
                <p class="small color06">
                  Elegant Blog HTML Template. <br />Clean, minimalist and
                  awesome<br />template for blogging based on the latest
                  <br />Bootstrap 3.3.6.
                </p>
                <div class="e-divider-1"></div>
                <!-- / About Widget -->
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 mb-sm-30 mb-xs-0">
              <div class="infoblock">
                <!-- Contacts Widget -->

                <div class="navlinks">
                  <a href="#!"><p>Story</p></a>
                  <a href="#!"><p>Travel</p></a>
                  <a href="#!"><p>Fashion Design</p></a>
                  <a href="#!"><p>Portfolio</p></a>
                  <a href="#!"><p>Buy</p></a>
                </div>
                <!-- / Contacts Widget -->
              </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
              <div class="infoblock">
                <div class="navlinks">
                  <a href="#!"><p>Brands</p></a>
                  <a href="#!"><p>Schedule</p></a>
                  <a href="#!"><p>Blog</p></a>
                  <a href="#!"><p>Featured</p></a>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="infoblock">
                <p class="small color06">
                  123-123 Direct Drive,<br />2233 Daytona Beach, FLorida USA
                </p>
                <p class="small color06">
                  +1 234 567-45-67
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="e-divider-5"></div>
      <div id="copyrights-wrapper" class="bg-color00">
        <div class="container">
          <div class="copyright">
            <p>
              © 2016
              <a href="http://neuethemes.net" target="_blank">Emma Fletcher</a>.
              All rights reserved.
            </p>
            <!--<p> Made by <a href="http://neuethemes.net" target="_blank">Neuethemes</a></p>-->
          </div>
        </div>
      </div>
    </footer>
    <!-- /footer -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return localStorage.user_id;
    },
  },
};
</script>

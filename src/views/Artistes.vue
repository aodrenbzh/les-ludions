<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <!-- <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" /> -->
            <div class="brand">
              <h1>Festival des Ludions</h1>
              <h3>9 maisons, 20 artistes, déambulations théatrales</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
      <div class="section section-artistes">
        <div class="md-layout md-alignment-top-center md-gutter">
          <artiste v-for="artiste in data.artistes" :key="artiste.id" :donnee="artiste" :id="artiste.id" class="md-layout-item md-size-40 md-small-size-100 mx-auto artiste"></artiste>
        </div>
      </div>
      <!-- <div class="main main-raised">
      <div class="section section-artistes">
        <div class="container">
          <div class="title">
            <h2>Nos Artistes</h2>
          </div>
          <artiste></artiste>
          <artiste></artiste>
          <artiste></artiste>
          <artiste></artiste>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Artiste from "./components/Artiste";
import api from "../api/les-ludions";

export default {
  components: {
    Artiste,
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      //default: require("@/assets/img/vue-mk-header.jpg")
      default: require("@/assets/img/carolles1_1.jpg"),
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png"),
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png"),
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png"),
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png"),
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg"),
    },
    artistes: {
      type: String,
      default: require("@/assets/img/landing.jpg"),
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg"),
    },
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false,
      data: {
        artistes: []
      }
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`,
      };
    },
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
    api.methods.getArtistes().then(a => this.data.artistes = a);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  },
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
.artiste {
  margin-left: 20px !important;
  margin-right: 20px !important;
}
.section-artistes {
      margin: -130px 30px 0px;
    border-radius: 6px;
}
</style>


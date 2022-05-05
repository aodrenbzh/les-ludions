<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="brand">
        <h1>Festival des Ludions</h1>
        <h3 v-if="labels.main_date" v-html="labels.main_date"></h3>
        <h3 v-if="labels.main_soustitre" v-html="labels.main_soustitre"></h3>
      </div>
    </parallax>
    <div class="section section-artistes">
      <div
        class="md-layout md-alignment-top-center md-gutter"
        v-if="artistes.length > 0"
      >
        <template v-for="artiste in people">
          <artiste
            v-if="artiste.Display"
            class="md-layout-item md-size-40 md-medium-60 md-small-size-100 mx-auto artiste"
            :donnee="artiste"
            :id="artiste.id"
            :key="artiste.id"
            :ref="artiste.id"
          ></artiste>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Artiste from "./components/Artiste";
import api from "../../api/2022/les-ludions";

export default {
  components: {
    Artiste
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      //default: require("@/assets/img/vue-mk-header.jpg")
      default: require("@/assets/img/lude2.jpg")
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png")
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png")
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png")
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg")
    },
    artistes: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      labels: {},
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
    scrollToElement() {
      if (!this.$route.hash) return true;
      let element_id = document.getElementById(this.$route.hash.substring(1));
      if (element_id) {
        const yOffset = -160;
        const y =
          element_id.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    },
    people() {
      return this.data.artistes.filter(a => {
        return a.Categorie === undefined
          ? false
          : a.Categorie.indexOf(this.$route.name.slice(0, -4)) > -1;
      });
    }
  },
  async mounted() {
    this.labels = await api.methods.getLabels();
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
    api.methods.getArtistes().then(a => {
      this.data.artistes = a;
      setTimeout(() => this.scrollToElement(), 100);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
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
@media screen and (max-width: 959px) {
  .section-artistes {
    margin: -130px 0px 0px;
    border-radius: 0px;
  }
}
</style>

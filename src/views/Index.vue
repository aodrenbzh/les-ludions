
<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="cont-titre md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Festival des Ludions</h1>
            <h3 class="titre">14 - 16 Mai 2021</h3>
            <h4>9 maisons, 20 artistes, déambulations théatrales</h4>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-100 mx-auto md-layout md-alignment-top-center"
            >
              <img :src="logo" alt="Logo Image" class="logo img-fluid" />
            </div>
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">Un festival en Normandie</h2>
              <h5 class="description">
                Le festival des Ludions du <b>14-16 mai</b> à Carolles une belle
                opportunité pour une ballade sur les falaises et les
                retrouvailles avec les artistes. Il y aura 20 artistes dans 9
                maisons avec des déambulations théâtrales et des spectacles.
                Peinture, sculpture, mobile métal, céramique.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-carou">
        <div class="container" v-if="showCarou">
          <carousel
            :perPageCustom="[
              [300, 1],
              [768, 2],
              [1024, 3],
            ]"
            loop
            :speed="700"
            autoplay
            :autoplay-timeout="5000"
            :mouse-drag="false"
            :pagination-enabled="false"
            :scroll-per-page="true"
            :center:mode="true"
            navigationEnabled
            navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
            navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
            class="carousel"
          >
            <template v-for="obj in galerieComputed">
              <slide
                :key="obj.src"
                v-if="getArtiste(obj.artiste).Display"
                eager
              >
                <div class="carousel-caption" 
                    @click="goToArtiste(obj)"> 
                  <badge type="default"
                    >{{ getArtiste(obj.artiste).Prenom }}
                    {{ getArtiste(obj.artiste).Nom }}</badge>
                </div>
                <div class="md-layout md-alignment-center-center contImg">
                  <img
                    :src="obj.src"
                    :alt="obj.name"
                    class="oeuvre"
                    onContextMenu="return false;"
                  />
                </div>
              </slide>
            </template>
          </carousel>
        </div>
      </div>
      <div class="section">
        <div class="container">
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>anchor</md-icon>
                  </div>
                  <h4 class="info-title">Ancrer la culture à Carolles</h4>
                  <p>Speech culture</p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>all_inclusive</md-icon>
                  </div>
                  <h4 class="info-title">Partager les créations</h4>
                  <p>Partage / Création</p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-primary">
                    <md-icon>tag_faces</md-icon>
                  </div>
                  <h4 class="info-title">Déconfiner les esprits</h4>
                  <p>Confinement / Covid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Participer, Proposer & Partager</h2>
              <h4 class="text-center description">Donnez nous la réplique</h4>
              <form
                novalidate
                @submit.prevent="validatePigeon"
                class="contact-form"
              >
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Nom de scène</label>
                      <md-input v-model="pigeon.Auteur" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Adresse virtuelle</label>
                      <md-input v-model="pigeon.Email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Votre tirade</label>
                  <md-textarea v-model="pigeon.Contenu"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button
                      class="md-success"
                      type="submit"
                      :disabled="pigeonSending || !contactFormIsValid"
                      >Envoyer un pigeon</md-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="boucheAOreille" class="sharing-area text-center">
        <div class="md-layout">
          <div class="md-layout-item">
            <h3>Bouche-à-oreille</h3>
          </div>
        </div>
        <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          class="sharebutton"
          :url="sharing.url"
          :title="sharing.title"
          :description="sharing.description"
          :quote="sharing.quote"
          :hashtags="sharing.hashtags"
          :twitterUser="sharing.twitterUser"
        >
        <md-button :style="{ backgroundColor: network.color + ' !important' }">
          <i :class="network.icon"></i>
          <span>{{ network.name }}</span>
        </md-button>

        </ShareNetwork>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/les-ludions";
import { Badge } from "@/components";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  components: {
    Badge
  },
  bodyClass: "artistes-page",
  mixins: [validationMixin],
  props: {
    header: {
      type: String,
      default: require("@/assets/img/mont.jpg"),
    },
    logo: {
      type: String,
      default: require("@/assets/img/logo.jpg"),
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg"),
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg"),
    },
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      artistes: [],
      galerie: [],
      carousel1: require("@/assets/img/nature-2.jpg"),
      showCarou: false,
      pigeon: {
        Auteur: "",
        Contenu: "",
        Email: "",
      },
      pigeonSending: false,
      sharing: {
        url: "https://les-ludions.netlify.app/#/programme",
        title:
          "Un festival en Normandie, 9 maisons, 20 artistes, déambulations théatrales",
        description:
          `Le festival des Ludions du <b>14-16 mai</b> à Carolles une belle
                opportunité pour une ballade sur les falaises et les
                retrouvailles avec les artistes. Il y aura 20 artistes dans 9
                maisons avec des déambulations théâtrales et des spectacles.
                Peinture, sculpture, mobile métal, céramique.`,
        quote: "Un festival en Normandie, 9 maisons, 20 artistes, déambulations théatrales",
        hashtags: "ludions,normandie,culture"
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
      ],
    };
  },
  validations: {
    pigeon: {
      Auteur: {
        required,
      },
      Email: {
        required,
      },
      Contenu: {
        required,
        maxLength: maxLength(255),
      },
    },
  },
  computed: {
    contactFormIsValid() {
      return !this.$v.$invalid;
    },
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    galerieComputed() {
      const reducer = (accumulator, currentValue) =>
        accumulator.concat(
          currentValue.galerie
            .filter((a) => !a.name.includes("thumb_profile"))
            .map((a) => ({ ...a, artiste: currentValue.id }))
        );
      const galRed = this.artistes.reduce(reducer, []);
      return this.shuffle(galRed);
    },
  },
  methods: {
    goToArtiste(art) {
      this.$router.push({name: 'artistes', hash: art.artiste})
    },
    clearForm() {
      this.$v.$reset();
      this.pigeon.Auteur = null;
      this.pigeon.Email = null;
      this.pigeon.Contenu = null;
    },
    validatePigeon() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendPigeon();
      }
    },
    sendPigeon: function () {
      this.pigeonSending = true;
      let input = {
        ...this.pigeon,
        Date: new Date(),
      };
      api.methods.sendPigeon(input).then((a) => {
        this.clearForm();
        this.pigeonSending = false;
      }, 1500);
    },
    shuffle: function (at) {
      var a = [...at];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    textColor(ref) {
      var img = this.$refs[ref];
    },
    isDisplayed(id) {
      let a = this.artistes.find((a) => a.id == id);
      return a ? a.Display : false;
    },
    getArtiste(id) {
      return this.artistes.find((a) => a.id == id);
    },
  },
  async created() {
    api.methods.getArtistes().then((a) => {
      this.artistes = a;
      this.showCarou = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
.logo {
  height: auto;
  max-width: 400px;
}
@media (max-width: 768px) {
  .logo {
    height: auto;
    max-width: 100%;
  }
}
.oeuvre {
  // width: 400px;
  // height: auto;
  // max-height: calc(100vh - 80px);
}
.contImg {
  height: 100%;
  width: 100%;
  margin: 0 !important;
}
.titre {
  font-size: 2.23rem;
  margin: 10px auto 0;
  line-height: 0.9em;
  font-weight: 400;
}
.cont-titre {
  padding-bottom: 100px;
}
.carousel{
  cursor:pointer;
}
</style>

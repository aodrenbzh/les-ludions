
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
      <div class="section section-carou">
        <div class="container" v-if="showCarou">
          <carousel
            :perPageCustom="[
              [300, 1],
              [768, 3],
              [1024, 4],
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
          >
            <template v-for="obj in galerieComputed">
              <slide
                :key="obj.src"
                v-if="getArtiste(obj.artiste).Display"
                eager
              >
                <div class="carousel-caption">
                  <badge type="default"
                    >{{ getArtiste(obj.artiste).Prenom }}
                    {{ getArtiste(obj.artiste).Nom }}</badge
                  >
                </div>
                <div class="md-layout md-alignment-center-center contImg">
                  <img :src="obj.src" :alt="obj.name" class="oeuvre" onContextMenu="return false;" />
                </div>
              </slide>
            </template>
          </carousel>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Participer, Proposer & Partager</h2>
              <h4 class="text-center description">Donnez nous la réplique</h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Nom de scène</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Adresse virtuelle</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Votre tirade</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success">Envoyer un pigeon</md-button>
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

        <md-button class="md-twitter"
          ><i class="fab fa-twitter"></i>Twitter</md-button
        >
        <md-button class="md-facebook"
          ><i class="fab fa-facebook-square"></i> Share</md-button
        >
        <md-button class="md-google"
          ><i class="fab fa-google-plus"></i> Share</md-button
        >
        <md-button class="md-github"
          ><i class="fab fa-github"></i> Star</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/les-ludions";
import { Badge } from "@/components";
export default {
  components: {
    Badge,
  },
  bodyClass: "artistes-page",
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
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    galerieComputed() {
      const reducer = (accumulator, currentValue) => accumulator.concat(currentValue.galerie.map(a => ({...a, artiste: currentValue.id})));
      const galRed = this.artistes.reduce(reducer, []);
      return this.shuffle(galRed);
    },
  },
  methods: {
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
      // this.artistes.forEach((art) => {
      //   api.methods.getImagesFromArtiste(art.id).then((g) => {
      //     this.galerie = this.galerie.concat(
      //       g.map((x) => ({ ...x, artiste: art.id }))
      //     );
      //   });
      //   this.showCarou = true;
      // });
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
  height: 400px;
  width: 400px;
}
.oeuvre {
  width: 400px;
  height: auto;
  max-height: calc(100vh - 80px);
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
</style>

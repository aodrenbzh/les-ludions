
<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="cont-titre md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Festival des Ludions</h1>
            <h3 class="titre subtitle"
              v-if="labels.main_date"
              v-html="labels.main_date"></h3>
            <h4 class="subtitle"
              v-if="labels.main_soustitre"
              v-html="labels.main_soustitre"></h4>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <form
        novalidate
        @submit.prevent="validateReservation"
        class="contact-form"
      >
        <modal v-if="reservation !== ''" @close="closeReservation">
          <template slot="header">
            <h4 class="modal-title">
              Réservez pour le
              {{ reservations[reservation].label }}
            </h4>
            <md-button
              class="md-simple md-just-icon md-round modal-default-button"
              @click="closeReservation"
            >
              <md-icon>clear</md-icon>
            </md-button>
          </template>

          <template slot="body">
            <div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Spectacle souhaité</label>
                    <md-select v-model="demande.Spectacle">
                      <md-option
                        v-for="spec in reservations[reservation].spectacles"
                        :key="spec.id"
                        :value="spec.id"
                        >{{ spec.label }} ({{ spec.prix }})</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Prénom</label>
                    <md-input v-model="demande.Prenom" type="text"></md-input>
                  </md-field>
                  <md-field>
                    <label>Nom</label>
                    <md-input v-model="demande.Nom" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Adresse virtuelle (@)</label>
                    <md-input v-model="demande.Email" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Numéro de téléphone</label>
                    <md-input v-model="demande.Phone" type="phone"></md-input>
                  </md-field>
                </div>
              </div>
              <md-field>
                <label>Nombre de place souhaité</label>
                <md-select
                  v-model="demande.Places"
                  name="nbrplaces"
                  id="nbrplaces"
                >
                  <md-option
                    v-for="nbr in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    :key="nbr"
                    :value="nbr"
                    >{{ nbr }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </template>

          <template slot="footer">
            <md-button
              class="md-simple md-primary"
              type="submit"
              :disabled="reservationSending || !reservationFormIsValid"
              >Réservez</md-button
            >
            <md-button class="md-danger md-simple" @click="closeReservation"
              >Close</md-button
            >
          </template>
        </modal>
      </form>
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
              <h2
                class="title text-center"
                v-if="labels.titre"
                v-html="labels.titre"
              ></h2>
              <h5
                class="description"
                v-if="labels.main_description"
                v-html="labels.main_description"
              ></h5>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-planning" id="reservation">
        <div class="container">
          <nav-tabs-card no-label tabs-plain>
            <template slot="content">
              <md-tabs class="md-info" md-alignment="left">
                <md-tab id="tab-friday" md-label="Vendredi 27 Mai">
                  <div class="md-layout container">
                    <p
                      class="md-layout-item md-alignment-top-center"
                      v-if="labels.planning_vendredi"
                      v-html="labels.planning_vendredi"
                    ></p>
                    <div
                      class="md-layout-item md-layout md-alignment-top-right"
                    >
                      <md-button class="md-success md-round" href="#/ateliers"
                        ><md-icon>lightbulb</md-icon>Informations</md-button
                      >
                      <md-button
                        class="md-primary md-round"
                        @click="reservation = 'vendredi'"
                        ><md-icon>library_books</md-icon>Réservez</md-button
                      >
                    </div>
                  </div>
                </md-tab>

                <md-tab id="tab-samedi" md-label="Samedi 28 Mai">
                  <div class="md-layout container">
                    <p
                      class="md-layout-item md-alignment-top-center"
                      v-if="labels.planning_samedi"
                      v-html="labels.planning_samedi"
                    ></p>
                    <div
                      class="md-layout-item md-layout md-alignment-top-right"
                    >
                      <!-- <md-button class="md-info md-round" href="#/2021/blog"
                        >Informations</md-button
                      > -->
                      <md-button
                        class="md-primary md-round"
                        @click="reservation = 'samedi'"
                        >Réservez</md-button
                      >
                    </div>
                  </div>
                </md-tab>

                <md-tab id="tab-dimanche" md-label="Dimanche 29 Mai">
                  <div class="md-layout container">
                    <p
                      class="md-layout-item md-alignment-top-center"
                      v-if="labels.planning_dimanche"
                      v-html="labels.planning_dimanche"
                    ></p>
                    <div
                      class="md-layout-item md-layout md-alignment-top-right"
                    >
                      <!-- <md-button class="md-info md-round" href="#/2021/blog"
                        >Informations</md-button
                      > -->
                      <md-button
                        class="md-primary md-round"
                        @click="reservation = 'dimanche'"
                        >Réservez</md-button
                      >
                    </div>
                  </div>
                </md-tab>
              </md-tabs>
            </template>
          </nav-tabs-card>
          <!-- <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-primary">
                    <md-icon>tag_faces</md-icon>
                  </div>
                  <h4 class="info-title">Vendredi 13 Mai</h4>
                  <p v-if="labels.planning_vendredi" v-html="labels.planning_vendredi"></p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-primary">
                    <md-icon>tag_faces</md-icon>
                  </div>
                  <h4 class="info-title">Samedi 14 Mai</h4>
                  <p v-if="labels.planning_samedi" v-html="labels.planning_samedi"></p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-primary">
                    <md-icon>tag_faces</md-icon>
                  </div>
                  <h4 class="info-title">Dimanche 15 Mai</h4>
                  <p v-if="labels.planning_dimanche" v-html="labels.planning_dimanche"></p>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <div class="section section-carou">
        <div class="container container-carou" v-if="showCarou">
          <carousel
            :perPageCustom="[
              [300, 1],
              [768, 3],
              [1024, 5],
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
                <div class="carousel-caption">
                  <badge :type="getArtiste(obj.artiste).Type"
                    >{{ getArtiste(obj.artiste).Prenom }}
                    {{ getArtiste(obj.artiste).Nom }}</badge
                  >
                </div>
                <div
                  @click="goToArtiste(obj)"
                  class="md-layout md-alignment-center-center contImg"
                >
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
                  <h4 class="info-title" v-if="labels.titre_culture" v-html="labels.titre_culture"></h4>
                  <p
                    v-if="labels.speech_culture"
                    v-html="labels.speech_culture"
                  ></p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>all_inclusive</md-icon>
                  </div>
                  <h4 class="info-title" v-if="labels.titre_partage" v-html="labels.titre_partage"></h4>
                  <p
                    v-if="labels.speech_partage"
                    v-html="labels.speech_partage"
                  ></p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-primary">
                    <md-icon>tag_faces</md-icon>
                  </div>
                  <h4 class="info-title" v-if="labels.titre_pple" v-html="labels.titre_pple"></h4>
                  <p
                    v-if="labels.speech_pple"
                    v-html="labels.speech_pple"
                  ></p>
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
          <md-button
            :style="{ backgroundColor: network.color + ' !important' }"
          >
            <i :class="network.icon"></i>
            <span>{{ network.name }}</span>
          </md-button>
        </ShareNetwork>
      </div>
    </div>
    <md-snackbar
      md-position="left"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Votre message a bien été envoyé.</span>
      <md-button class="md-simple" @click="showSnackbar = false"
        >Fermer</md-button
      >
    </md-snackbar>

    <md-snackbar
      md-position="left"
      :md-active.sync="showSnackbarReservation"
      md-persistent
    >
      <span>Votre réservation a bien été prise en compte.</span>
      <md-button class="md-simple" @click="showSnackbarReservation = false"
        >Fermer</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import api from "../../api/2022/les-ludions";
import { Badge, NavTabsCard, Modal } from "@/components";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  components: {
    Badge,
    NavTabsCard,
    Modal,
  },
  bodyClass: "index-page",
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
      showSnackbar: false,
      showSnackbarReservation: false,
      labels: {},
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
          "Un festival en Normandie, 7 maisons, 16 artistes, déambulations théatrales",
        description: `Le festival des Ludions du <b>18 - 19 Septembre</b> à Carolles une belle
                opportunité pour une ballade sur les falaises et les
                retrouvailles avec les artistes. Il y aura 16 artistes dans 9
                maisons avec des déambulations théâtrales et des spectacles.
                Peinture, sculpture, mobile métal, céramique.`,
        quote:
          "Un festival en Normandie, 7 maisons, 16 artistes, déambulations théatrales",
        hashtags: "ludions,normandie,culture",
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
      reservations: [],
      reservation: "",
      demande: {
        Prenom: "",
        Nom: "",
        Email: "",
        Phone: null,
        Places: null,
        Spectacle: "",
      },
      reservationSending: false,
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
    demande: {
      Prenom: {
        required,
      },
      Nom: {
        required,
      },
      Email: {
        required,
      },
      Phone: {
        required,
      },
      Places: {
        required,
      },
      Spectacle: {
        required,
      },
    },
  },
  computed: {
    contactFormIsValid() {
      return !this.$v.pigeon.$invalid;
    },
    reservationFormIsValid() {
      return !this.$v.demande.$invalid;
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
    closeReservation() {
      this.reservation = "";
      this.clearFormReservation();
    },
    goToArtiste(art) {
      this.$router.push({ name: "artistes2022", hash: "#" + art.artiste });
    },
    clearForm() {
      this.$v.pigeon.$reset();
      this.pigeon.Auteur = null;
      this.pigeon.Email = null;
      this.pigeon.Contenu = null;
    },
    validatePigeon() {
      this.$v.pigeon.$touch();
      if (!this.$v.pigeon.$invalid) {
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
        this.showSnackbar = true;
      }, 1500);
    },
    clearFormReservation() {
      this.$v.demande.$reset();
      this.demande.Prenom = "";
      this.demande.Email = "";
      this.demande.Nom = "";
      this.demande.Places = null;
      this.demande.Phone = null;
      this.demande.Spectacle = "";
    },
    validateReservation() {
      this.$v.demande.$touch();
      if (!this.$v.demande.$invalid) {
        this.sendReservation();
      }
    },
    sendReservation: function () {
      this.reservationSending = true;
      let input = {
        ...this.demande,
      };
      let label = this.reservations[this.reservation].spectacles.find(s => s.id == input.Spectacle).label;
      api.methods.addDemande(input, this.reservation, label).then((a) => {
        this.clearFormReservation();
        this.reservationSending = false;
        this.reservation = "";
        this.showSnackbarReservation = true;
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
      var typed = this.artistes.map((i) => ({
        ...i,
        Type: ["rose", "default", "info", "success"][
          Math.floor(Math.random() * 4)
        ],
      }));
      return typed.find((a) => a.id == id);
    },
    scrollToElement() {
      if (!this.$route.hash) return true;
      let element_id = document.getElementById(this.$route.hash.substring(1));
      if (element_id) {
        window.scrollTo({
          top: element_id.getBoundingClientRect().top - 70,
          behavior: "smooth",
        });
      }
    },
  },
  async created() {
    this.labels = await api.methods.getLabels();
    this.reservations = await api.methods.getReservations();
    api.methods.getArtistes().then(async (a) => {
      this.artistes = a;
      this.showCarou = true;
    });
  },
  mounted() {
    setTimeout(() => this.scrollToElement(), 100);
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
.subtitle {
      color: #FFFFFF;
}
.cont-titre {
  padding-bottom: 100px;
}
.carousel {
  cursor: pointer;
}
.container-carou {
  padding: 0 20px;
}
.section-planning {
  padding-top: 0;
}
</style>

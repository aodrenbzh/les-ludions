
<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Festival des Ludions</h1>
            <h3 class="title">14 - 16 Mai 2021</h3>
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
            <div class="md-layout-item md-size-100 mx-auto md-layout md-alignment-top-center">
              <img
                :src="logo"
                alt="Logo Image"
                class="logo img-fluid"
              />
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
export default {
  bodyClass: "artistes-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/lude1_1.jpg"),
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
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
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
</style>

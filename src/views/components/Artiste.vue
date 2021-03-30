<template>
  <md-card class="artiste">
    <div class="section profile-content">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 mx-auto">
            <div class="profile">
              <div class="avatar">
                <img
                  v-if="profileImage"
                  :src="profileImage.src"
                  :alt="profileImage.name"
                  class="img-raised rounded-circle img-fluid profile-image"
                />
                <!-- <font-awesome-icon  if="!profileImage"  :icon="['fas', 'user-alt']" class="img-raised rounded-circle img-fluid" /> -->
                <div
                  v-if="!profileImage"
                  class="img-raised rounded-circle profile-image"
                >
                  <img
                    :src="defaultProfileImage"
                    alt="Profile"
                    class="img-fluid default-profile-image"
                  />
                </div>
              </div>
              <div class="name">
                <h3 class="title">{{ donnee.Prenom }} {{ donnee.Nom }}</h3>
                <h6>{{ donnee.Metier }}</h6>

                <template v-for="social in donnee.Socials">
                  <md-button
                    :key="social.id"
                    target="_blank"
                    :href="
                      social.id == 'Twitter'
                        ? 'https://www.twitter.com/' + social.Lien
                        : social.id == 'Instagram'
                        ? 'https://www.instagram.com/' + social.Lien
                        : social.Lien
                    "
                    :class="
                      social.id == 'Twitter'
                        ? 'md-just-icon md-simple md-twitter'
                        : social.id == 'Instagram'
                        ? 'md-just-icon md-simple md-twitter'
                        : 'md-just-icon md-simple md-dribble'
                    "
                    ><i
                      :class="
                        social.id == 'Twitter'
                          ? 'fab fa-twitter'
                          : social.id == 'Instagram'
                          ? 'fab fa-instagram'
                          : 'fab fa-dribble'
                      "
                    ></i
                  ></md-button>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="description text-center">
          <p>
            {{ donnee.Description }}
          </p>
        </div>

        <tabs
          :tab-name="['Galerie', 'Mise en scène', 'Biographie']"
          :tab-icon="['palette', 'emoji_people', 'history_edu']"
          plain
          nav-pills-icons
          color-button="primary"
          class="tab-artiste"
        >
          <!-- here you can add your content for tab-content -->
          <template slot="tab-pane-1">
            <div class="md-layout">
              <div
                v-if="galerie.length > 0"
                class="md-layout-item md-size-50 ml-auto"
              >
                <img
                  v-for="item in galerieHalf1"
                  :key="item.name"
                  class="rounded"
                  :src="item.src"
                />
              </div>
              <div class="md-layout-item md-size-50 mr-auto">
                <template v-if="galerie.length > 1">
                  <img
                    v-for="item in galerieHalf2"
                    :key="item.name"
                    class="rounded"
                    :src="item.src"
                  />
                </template>

              </div>
            </div>
          </template>
          <template slot="tab-pane-2">
            <div class="description text-center">
              <p>
                {{ donnee.Maison }}
              </p>
            </div>
          </template>
          <template slot="tab-pane-3">
            <div class="description text-center">
              <p>
                {{ donnee.Bio }}
              </p>
            </div>
          </template>
        </tabs>
      </div>
    </div>
  </md-card>
</template>

<script>
import { Tabs } from "@/components";
import api from "../../api/les-ludions";

export default {
  components: {
    Tabs,
  },
  bodyClass: "profile-page",
  data() {
    return {
      tabPane1: [
        { image: require("@/assets/img/examples/studio-1.jpg") },
        { image: require("@/assets/img/examples/studio-2.jpg") },
        { image: require("@/assets/img/examples/studio-4.jpg") },
        { image: require("@/assets/img/examples/studio-5.jpg") },
      ],
      tabPane2: [
        { image: require("@/assets/img/examples/olu-eletu.jpg") },
        { image: require("@/assets/img/examples/clem-onojeghuo.jpg") },
        { image: require("@/assets/img/examples/cynthia-del-rio.jpg") },
        { image: require("@/assets/img/examples/mariya-georgieva.jpg") },
        { image: require("@/assets/img/examples/clem-onojegaw.jpg") },
      ],
      tabPane3: [
        { image: require("@/assets/img/examples/mariya-georgieva.jpg") },
        { image: require("@/assets/img/examples/studio-3.jpg") },
        { image: require("@/assets/img/examples/clem-onojeghuo.jpg") },
        { image: require("@/assets/img/examples/olu-eletu.jpg") },
        { image: require("@/assets/img/examples/studio-1.jpg") },
      ],
      galerie: [],
      defaultData: null,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg"),
    },
    defaultProfileImage: {
      type: String,
      default: require("@/assets/img/logo.jpg"),
    },
    donnee: {
      type: Object,
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    galerieHalf1() {
      return this.galerie
        .filter((a) => a.name !== "profile.jpg")
        .slice(0, Math.ceil(this.galerie.length / 2));
    },
    galerieHalf2() {
      return this.galerie
        .filter((a) => a.name !== "profile.jpg")
        .slice(-Math.ceil(this.galerie.length / 2));
    },
    profileImage() {
      return this.galerie.find((a) => a.name == "profile.jpg");
    },
    defaultGalerie() {
      return this.defaultData && this.defaultData.galerie
        ? this.defaultData.galerie
        : null;
    },
  },
  async created() {
    this.galerie = await api.methods.getImagesFromArtiste(this.donnee.id);
    this.defaultData = await api.methods.getDefault();
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
  .tab-artiste {
    max-height: 400px;
  }
}
</style>

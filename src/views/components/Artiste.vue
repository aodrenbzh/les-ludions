<template>
  <md-card class="artiste" md-with-hover>
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
          <p v-if="donnee.Description">
            {{ donnee.Description }}
          </p>
          <h1 v-else>
            <p>À venir</p>
          </h1>
        </div>

        <tabs
          :tab-name="['Galerie', 'Maison', 'Biographie', 'Livre d\'Or']"
          :tab-icon="['palette', 'home', 'history_edu', 'auto_stories']"
          plain
          nav-pills-icons
          color-button="primary"
          class="tab-artiste"
        >
          <!-- here you can add your content for tab-content -->
          <template slot="tab-pane-1">
            <md-card-expand>
              <LightBox
                :media="media"
                ref="lightbox"
                :show-caption="true"
                :show-light-box="false"
                :show-thumbs="false"
                class="lb"
              ></LightBox>
              <div class="md-layout">
                <div
                  v-if="galerie.length > 0"
                  class="md-layout-item md-size-50 ml-auto"
                >
                  <img
                    v-for="item in galerieHalf1.slice(0, 2)"
                    :key="item.name"
                    class="rounded"
                    :src="item.src"
                    @click="openGallery(item)"
                  />
                </div>
                <div class="md-layout-item md-size-50 mr-auto">
                  <template v-if="galerie.length > 1">
                    <img
                      v-for="item in galerieHalf2.slice(0, 2)"
                      :key="item.name"
                      class="rounded"
                      :src="item.src"
                      @click="openGallery(item)"
                    />
                  </template>
                </div>
                <md-card-expand-content ref="card">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-50 mr-auto">
                      <img
                        v-for="item in galerieHalf1.slice(2)"
                        :key="item.name"
                        class="rounded"
                        :src="item.src"
                        @click="openGallery(item)"
                      />
                    </div>
                    <div class="md-layout-item md-size-50 mr-auto">
                      <img
                        v-for="item in galerieHalf2.slice(2)"
                        :key="item.name"
                        class="rounded"
                        :src="item.src"
                        @click="openGallery(item)"
                      />
                    </div>
                  </div>
                </md-card-expand-content>
              </div>
              <div
                v-if="galerie.length > 4"
                class="md-layout md-alignment-center-right"
              >
                <md-card-expand-trigger class="expand-trigger">
                  <md-button class="md-icon-button md-dense md-primary">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </div>
            </md-card-expand>
          </template>
          <template slot="tab-pane-2">
            <div class="description text-center" v-if="donnee.Maison">
              <p>
                {{ donnee.Maison }}
              </p>
            </div>
            <div class="soon text-center" v-else>À venir</div>
          </template>
          <template slot="tab-pane-3">
            <div class="description text-center" v-if="donnee.Bio">
              <p>
                {{ donnee.Bio }}
              </p>
            </div>
            <div class="soon text-center" v-else>À venir</div>
          </template>
          <template slot="tab-pane-4">
            <div class="description text-center" v-if="donnee.Commentaires">
              <p>
                {{ donnee.Commentaires }}
              </p>
            </div>
            <div class="soon text-center" v-else>À venir</div>
          </template>
        </tabs>
      </div>
    </div>
  </md-card>
</template>

<script>
import { Tabs } from "@/components";
import api from "../../api/les-ludions";
import LightBox from "vue-it-bigger";
export default {
  components: {
    Tabs,
    LightBox,
  },
  bodyClass: "profile-page",
  data() {
    return {
      galerie: [],
      defaultData: null,
      loading: true,
    };
  },
  props: {
    defaultProfileImage: {
      type: String,
      default: require("@/assets/img/logo.jpg"),
    },
    donnee: {
      type: Object,
    },
  },
  computed: {
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
    media() {
      return this.galerie;
    },
  },
  methods: {
    openGallery: function (item) {
      this.$refs.lightbox.showImage(
        this.galerie.findIndex((a) => a.name == item.name)
      );
    },
  },
  async created() {
    var that = this;
    api.methods.getImagesFromArtiste(this.donnee.id).then((a) => {
      this.galerie = a;
      this.loading = false;
      setTimeout(() => {
        // that.$refs.card.resizeObserver.disconnect(true);
        that.$refs.card.calculateMarginTopImmediately();
      }, 2000);
    });
    this.defaultData = await api.methods.getDefault();
  },
};
</script>

<style lang="scss" scoped>
.expanded-visible {
  overflow: visible !important;
}
.section {
  padding: 0;
}
.expand-trigger {
  margin: 15px 20px;
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
.soon {
  height: 200px;
  align-items: center;
  justify-content: center;
    display: flex;
}
</style>

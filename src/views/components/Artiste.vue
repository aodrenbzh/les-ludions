<template>
  <md-card class="artiste" md-with-hover>
    <div class="section profile-content">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 mx-auto">
            <div class="profile">
              <div class="avatar">
                <img
                  onContextMenu="return false;"
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
                    onContextMenu="return false;"
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
                v-if="media.length > 0"
                onContextMenu="return false;"
              ></LightBox>
              <div class="md-layout">
                <div
                  v-if="media.length > 0"
                  class="md-layout-item md-size-50 ml-auto"
                >
                  <img
                    onContextMenu="return false;"
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
                      onContextMenu="return false;"
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
                        onContextMenu="return false;"
                        v-for="item in galerieHalf1.slice(2)"
                        :key="item.name"
                        class="rounded"
                        :src="item.src"
                        @click="openGallery(item)"
                      />
                    </div>
                    <div class="md-layout-item md-size-50 mr-auto">
                      <img
                        onContextMenu="return false;"
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
              <p v-html="donnee.Maison">
                {{ donnee.Maison }}
              </p>
            </div>
            <div class="soon text-center" v-else>À venir</div>
          </template>
          <template slot="tab-pane-3">
            <div class="description text-center" v-if="donnee.Bio">
              <p v-html="donnee.Bio">
                {{ donnee.Bio }}
              </p>
            </div>
            <div class="soon text-center" v-else>À venir</div>
          </template>
          <template slot="tab-pane-4">
            <div class="" v-if="donnee.LivreDOR && donnee.LivreDOR.length > 0">
              <Commentaire
                v-for="commentaire in orderedLivreDOR"
                :key="commentaire.id"
                :commentaire="commentaire"
              >
              </Commentaire>
            </div>
            <div class="soon text-center" v-else>Laissez ici vos impressions.</div>

            <md-divider class=""></md-divider>

            <form
              novalidate
              :class="
                (showComment ? 'green-comment' : 'transp-comment') +
                ' md-layout form-comment '
              "
              @submit.prevent="validateComment"
            >
              <transition name="fade">
                <div
                  v-if="showComment"
                  class="md-layout-item md-size-100 md-layout md-gutter"
                >
                  <md-field
                    class="md-layout-item md-size-50 md-form-group fieldd"
                  >
                    <md-icon>face</md-icon>
                    <label>Votre Nom</label>
                    <md-input v-model="comment.Auteur"></md-input>
                  </md-field>
                  <md-field
                    class="md-layout-item md-size-50 md-form-group fieldd"
                  >
                    <md-icon>email</md-icon>
                    <label>Votre E-mail</label>
                    <md-input v-model="comment.Email"></md-input>
                  </md-field>
                </div>
              </transition>
              <div
                v-if="showComment"
                class="md-layout-item md-size-100 md-layout md-gutter"
              >
                <md-field
                  class="md-form-group md-layout-item md-size-100 fieldd"
                >
                  <md-icon>message</md-icon>
                  <label>Votre message</label>
                  <md-textarea
                    md-autogrow
                    v-model="comment.Contenu"
                  ></md-textarea>
                </md-field>
              </div>
              <div
                class="md-layout-item md-size-100 md-layout md-alignment-center-right"
              >
                <md-button
                  type="submit"
                  :class="(showComment ? 'md-white ' : '') + 'md-round'"
                  :disabled="commentSending"
                  >Envoyez votre commentaire</md-button
                >
              </div>
            </form>
          </template>
        </tabs>
      </div>
    </div>
  </md-card>
</template>

<script>
import { Tabs, Commentaire } from "@/components";
import api from "../../api/les-ludions";
import LightBox from "vue-it-bigger";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  components: {
    Tabs,
    LightBox,
    Commentaire,
  },
  mixins: [validationMixin],
  bodyClass: "profile-page",
  data() {
    return {
      galerie: [],
      defaultData: null,
      loading: true,
      comment: {
        Auteur: "",
        Contenu: "",
        Email: "",
      },
      commentSending: false,
      showComment: false,
    };
  },
  validations: {
    comment: {
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
      let filtered = this.galerie
        .filter((a) => !a.name.includes("thumb_profile"));
      return filtered.slice(0, filtered.length / 2);
    },
    galerieHalf2() {
      let filtered = this.galerie
        .filter((a) => !a.name.includes("thumb_profile"));
      return filtered.slice(filtered.length / 2);
    },
    profileImage() {
      return this.galerie.find((a) => a.name.includes("thumb_profile"));
    },
    defaultGalerie() {
      return this.defaultData && this.defaultData.galerie
        ? this.defaultData.galerie
        : null;
    },
    media() {
      return this.galerie.filter((a) => !a.name.includes("thumb_profile"));
    },
    orderedLivreDOR() {
      let temp = [...this.donnee.LivreDOR];
      return temp.sort((a,b) => a.Date - b.Date);
    }
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.comment.Auteur = null;
      this.comment.Email = null;
      this.comment.Contenu = null;
    },
    validateComment() {
      if (!this.showComment) this.showComment = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveComment();
      }
    },
    saveComment: function () {
      this.commentSending = true;
      let input = {
        ...this.comment,
        Date: new Date(),
      };
      api.methods.addComment(input, this.donnee.id).then((a) => {
        this.commentSending = false;
        this.donnee.LivreDOR.push(input);
        this.clearForm();
        this.showComment = false;
      }, 1500);
    },
    openGallery: function (item) {
      this.$refs.lightbox.showImage(
        this.media.findIndex((a) => a.name == item.name)
      );
    },
  },
  async created() {
    var that = this;
    api.methods.getImagesFromArtiste(this.donnee.id).then((a) => {
      this.galerie = a;
      setTimeout(() => {
        // that.$refs.card.resizeObserver.disconnect(true);
              this.loading = false;
        that.$refs.card?.calculateMarginTopImmediately();
      }, 3000);
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
.fieldd {
  padding-left: 0 !important;
}
.form-comment {
  padding: 15px;
}
.green-comment {
  background: linear-gradient(60deg, #66bb6a, #388e3c);
  -webkit-box-shadow: 0 12px 20px -10px rgb(76 175 80 / 28%),
    0 4px 20px 0 rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(76 175 80 / 20%);
  box-shadow: 0 12px 20px -10px rgb(76 175 80 / 28%),
    0 4px 20px 0 rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(76 175 80 / 20%);
  background-repeat: no-repeat;
}
.transp-comment {
  background: transparent;
}
</style>

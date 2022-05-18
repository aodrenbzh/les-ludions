<template>
  <div class="wrapper index-page">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand">
              <h1 v-if="article && article.titre">{{ article.titre }}</h1>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container" v-if="rdy">
          <h3
            :style="{ textAlign: 'center', padding: '20px' }"
            v-html="article.description"
          ></h3>

          <template v-for="(bloc, index) in article.blocs">
            <!-- <div :key="index">
                    <img
                        v-if="bloc.image"
                        :src="bloc.image.src"
                        :alt="bloc.image.name"
                    />
                    <p v-html="bloc.texte"></p>
                </div> -->
            <div
              :key="index"
              :class="
                'md-layout ' +
                  (index % 2 == 0 ? '' : 'inverse') +
                  ' md-alignment-center-space-around content'
              "
            >
              <md-card-media
                v-if="rdy && bloc.image"
                class="md-layout-item md-size-45 md-xsmall-size-100"
              >
                <img
                  class="rounded"
                  :src="bloc.image.src"
                  :alt="bloc.image.name"
                />
              </md-card-media>
              <div
                :class="
                  bloc.image
                    ? 'md-layout-item md-size-45 md-xsmall-size-100 info-event md-layout md-alignment-top-space-between'
                    : 'md-layout-item md-size-100'
                "
                v-html="bloc.texte"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/2022/les-ludions";
export default {
  components: {},
  bodyClass: "blog-page",
  data() {
    return {
      article: null,
      rdy: false
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/carolles1_1.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    blocImage(id) {
      return this.article.image.src;
    }
  },
  async mounted() {
    this.article = await api.methods.getArticle(this.$route.params.id);
    setTimeout(() => (this.rdy = true), 1000);
  },
  methods: {}
};
</script>

<style lang="css">
.inverse {
  flex-direction: row-reverse;
}
.event {
  margin: 20px 0;
}
.events {
  width: 100%;
  padding: 40px;
}
.info-event {
  height: 100%;
}
.content {
  padding-top: 20px;
}
</style>

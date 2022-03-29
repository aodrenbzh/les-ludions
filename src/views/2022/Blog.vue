<template>
  <div class="wrapper index-page">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand">
              <h1>Blog</h1>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div
            v-if="blogs.length > 0"
            class="md-layout md-alignment-top-center events"
          >
            <template v-for="(blog, index) in blogs">
              <md-card :key="blog.id" class="event md-card-plain" :style="{backgroundImage: 'url(' + blog.image + ') !important'}">
                <md-card-content>
                  <div
                    :class="
                      'md-layout ' +
                      (index == 0 ? '' : 'inverse') +
                      ' md-alignment-top-space-around'
                    "
                  >
                    <!-- <md-card-media
                      class="md-layout-item md-size-45 md-xsmall-size-100"
                    >
                      <img class="rounded" :src="blog.image.src" v-if="blog.image" />
                    </md-card-media> -->
                    <div
                      class="md-layout-item md-size-45 md-xsmall-size-100 info-event md-layout md-alignment-top-space-between"
                    >
                      <h3 class="md-layout-item md-size-100">
                        <a :href="`#/blog/${blog.id}/`">{{ blog.titre }}</a>
                      </h3>
                      <p class="md-layout-item md-size-100" v-html="blog.description"></p>
                    </div>
                  </div> 
                </md-card-content>
              </md-card>
            </template>
          </div>
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
      blogs: [],
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/carolles1_1.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    }
  },
  async created() {
    this.blogs = await api.methods.getBlogs();
  },
  methods: {
    onClickReservation(id) {
      this.$router.push({ name: "index", hash: '#reservation' });
    },
  },
};
</script>

<style lang="scss" scoped>
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

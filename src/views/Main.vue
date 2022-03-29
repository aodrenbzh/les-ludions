
<template>
    <div class="wrapper">
        <index2022></index2022>
    </div>
</template>

<script>

import Index2022 from "./2022/Index.vue";
export default {
  components: {
      Index2022
  },
  bodyClass: "index-page",
  mixins: [],
  props: {
  },
  data() {
    return {
    }
  },
  validations: {},
  computed: {},
  methods: {},
  async created() {
  },
  mounted() {
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

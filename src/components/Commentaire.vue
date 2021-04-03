<template>
  <div class="comment-body md-layout">
      <h4 class="md-layout-item md-size-100"> {{commentaire.Auteur}} <small> . {{commentaire.Date | formatDate}}</small></h4>
      <p class="md-layout-item md-size-100">{{commentaire.Contenu}}</p>
  </div>
</template>

<script>
export default {
  props: {
    commentaire: {}
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="css">
</style>

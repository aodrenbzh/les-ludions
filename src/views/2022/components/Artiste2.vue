<template>
  <div class="wrapper md-layout md-gutter md-alignment-left artiste">
    <div id="navigation-pills md-layout-item ">
      <div class="title">
        <h3>Simon Letellier</h3>
        <h3><small>Comédien</small></h3>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-50">
          <tabs
            :tab-name="['Galerie', 'Scéne', 'Coulisse']"
            :tab-icon="['dashboard', 'emoji_people', 'history_edu']"
            plain
            flex-column
            nav-pills-icons
            color-button="primary"
          >
            <!-- here you can add your content for tab-content -->
            <template slot="tab-pane-1"> </template>
            <template slot="tab-pane-2">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />
              Dramatically maintain clicks-and-mortar solutions without
              functional solutions.
            </template>
            <template slot="tab-pane-3"> ELol </template>
          </tabs>
        </div>
        <div class="md-layout-item md-size-50">
          <carousel
            :per-page="1"
            loop
            :speed="700"
            autoplay
            :autoplay-timeout="5000"
            :mouse-drag="false"
            navigationEnabled
            navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
            navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
            class="lude-carousel"
            ref="carousel1"
          >
            <slide>
              <div class="carousel-caption">
                <h4>
                  <md-icon>location_on</md-icon>
                  Somewhere Beyond, United States
                </h4>
              </div>
              <img :src="carousel1" alt="carousel1" />
            </slide>
            <slide>
              <div class="carousel-caption">
                <h4>
                  <md-icon>location_on</md-icon>
                  Yellowstone National Park, United States
                </h4>
              </div>
              <img :src="carousel2" alt="carousel2" />
            </slide>
            <slide>
              <div class="carousel-caption">
                <h4>
                  <md-icon>location_on</md-icon>
                  Yellowstone National Park, United States
                </h4>
              </div>
              <img :src="carousel3" alt="carousel3" />
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";

export default {
  components: {
    Tabs,
  },
  data() {
    return {
      classicModal: false,
      selectedDate: new Date("2018/03/26"),
      carousel1: require("@/assets/img/nature-2.jpg"),
      carousel2: require("@/assets/img/nature.jpg"),
      carousel3: require("@/assets/img/nature-3.jpg"),
    };
  },
  mounted() {
    setTimeout(this.$refs.carousel1.computeCarouselWidth, 300);
  },
};
</script>

<style lang="css">
.artiste {
  height: 85vh;
  max-width: 100%;
  padding: 0 40px;
}
.lude-carousel {
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div class="wrapper index-page">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand">
              <h1>Nos Ateliers</h1>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <h2>Au programme</h2>
          <div
            v-if="events.length > 0"
            class="md-layout md-alignment-top-center events"
          >
            <template v-for="(evt, index) in events">
              <!-- <div
                v-if="evt.display"
                :key="evt.id"
                :class="'event md-layout ' + (index == 0 ? '' : 'inverse')"
              >
                <div class="md-layout-item md-size-50">
                  <h3>{{ evt.titre }}</h3>
                  <p>lol de lol</p>
                </div>
                <img
                  class="rounded md-layout-item md-size-50"
                  :src="evt.image.src"
                />
              </div> -->
              <md-card :key="evt.id" class="event md-card-plain">
                <md-card-content>
                  <div
                    :class="
                      'md-layout ' +
                        (index == 0 ? '' : 'inverse') +
                        ' md-alignment-top-space-around'
                    "
                  >
                    <md-card-media
                      class="md-layout-item md-size-45 md-xsmall-size-100"
                    >
                      <img class="rounded" :src="evt.image.src" />
                    </md-card-media>
                    <div
                      class="md-layout-item md-size-45 md-xsmall-size-100 info-event md-layout md-alignment-top-space-between"
                    >
                      <h3 class="md-layout-item md-size-100">
                        {{ evt.titre }}
                      </h3>
                      <p
                        class="md-layout-item md-size-100"
                        v-html="evt.description"
                      ></p>
                      <div class="md-layout-item md-size-100 md-layout inverse">
                        <md-button
                          v-if="evt.reservable"
                          class="md-primary md-round"
                          @click="onClickReservation(evt.id)"
                          ><md-icon>library_books</md-icon>Réservez</md-button
                        >
                      </div>
                    </div>
                    <div
                      class="md-layout-item md-size-100 content"
                      v-html="evt.content"
                    ></div>
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
      reservations: null,
      events: []
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
    spectacles() {
      let spectacles = [];
      for (const day in this.reservations) {
        spectacles = spectacles.concat(this.reservations[day].spectacles);
      }
      return spectacles;
    }
  },
  async created() {
    this.reservations = await api.methods.getReservations();
    this.events = await api.methods.getEvents();
  },
  methods: {
    onClickReservation(id) {
      this.$router.push({ name: "index2022", hash: "#reservation" });
    }
  }
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

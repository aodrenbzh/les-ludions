<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <a
        class="md-toolbar-section-start"
        href="#/programme"
        @click="scrollToTop()"
      >
        <img :src="logo" alt="Logo transparent Image" class="logo img-fluid" />
        <h3 class="md-title">Carolles, Baie du Mont-Saint-Michel</h3>
      </a>
      <div class="md-toolbar-section-end" :style="{ flex: 0 }">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <md-list-item href="#/test" v-if="false">
                <i class="material-icons">content_paste</i>
                <p>test</p>
              </md-list-item>

              <md-list-item href="#/programme" v-if="!isprogramme">
                <i class="material-icons">history_edu</i>
                <p>Programme</p>
              </md-list-item>

              <md-list-item href="#/blog" v-if="!isBlog">
                <i class="material-icons">art_track</i>
                <p>Blog</p>
              </md-list-item>

              <md-list-item href="#/ateliers" v-if="!isAteliers">
                <i class="material-icons">art_track</i>
                <p>Ateliers</p>
              </md-list-item>

              <!-- <md-list-item href="#/artistes" v-if="!isArtistes">
                <i class="material-icons">view_carousel</i>
                <p>Artistes</p>
              </md-list-item> -->
              <li class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">view_carousel</i>
                        <p>Qui voir ?</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/artistes">
                            <i class="material-icons">brush</i>
                            <p>Artistes</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/auteurs">
                            <i class="material-icons">history_edu</i>
                            <p>Auteurs</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/partenaires">
                            <i class="material-icons">handshake</i>
                            <p>Partenaires</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/parrains">
                            <i class="material-icons">hail</i>
                            <p>Parrains</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
              <!-- <li class="md-list-item" v-if="isArtistes">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">view_carousel</i>
                        <p>Nos artistes</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <template v-for="item in data.artistes">
                          <li :key="'menu_' + item.id" v-if="item.Display">
                            <a
                              href="javascript:void(0)"
                              @click="scrollToElement(item.id)"
                            >
                              <i class="material-icons">{{
                                iconArtiste(item)
                              }}</i>
                              <p>
                                {{ item.Prenom }} {{ item.Nom }} |
                                {{ item.Metier }}
                              </p>
                            </a>
                          </li>
                        </template>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li> -->

              <li class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">history</i>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/2021/programme">Edition 2021</a>
                        </li>
                        <li>
                          <a href="#/2022/programme">Edition 2022</a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <md-list-item
                href="javascript:void(0)"
                @click="goToBoucheAOreille()"
              >
                <i class="material-icons">share</i>
                <!-- <p>Bouche-à-oreille</p> -->
                <md-tooltip md-direction="bottom">Bouche-à-oreille</md-tooltip>
              </md-list-item>

              <md-list-item
                href="https://www.facebook.com/festi.ludions"
                target="_blank"
              >
                <i class="fab fa-facebook-square"></i>
                <p class="hidden-lg">Facebook</p>
                <md-tooltip md-direction="bottom">Facebook</md-tooltip>
              </md-list-item>
              <md-list-item
                href="https://www.facebook.com/festi.ludions"
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
                <p class="hidden-lg">Instagram</p>
                <md-tooltip md-direction="bottom">Instagram</md-tooltip>
              </md-list-item>

              <md-list-item v-if="false" href="#/login">
                <i class="fas fa-user"></i>
                <p class="hidden-lg">Se connecter</p>
                <md-tooltip md-direction="bottom">Se connecter</md-tooltip>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}
import api from "../../api/2023/les-ludions";
import MobileMenu from "@/layout/MobileMenu";
export default {
  components: {
    MobileMenu,
  },
  props: {
    logo: {
      type: String,
      default: require("@/assets/img/logo-transparent.png"),
    },
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info",
        ].includes(value);
      },
    },
    colorOnScroll: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      data: {
        artistes: [],
      },
    };
  },
  computed: {
    isArtistes() {
      const excludedRoutes = ["artistes2023"];
      return excludedRoutes.some((r) => r === this.$route.name);
    },
    isprogramme() {
      const excludedRoutes = ["index2023"];
      return excludedRoutes.some((r) => r === this.$route.name);
    },
    isBlog() {
      const excludedRoutes = ["blog2023"];
      return excludedRoutes.some((r) => r === this.$route.name);
    },
    isAteliers() {
      const excludedRoutes = ["ateliers2023"];
      return excludedRoutes.some((r) => r === this.$route.name);
    },
  },
  methods: {
    iconArtiste(artiste) {
      switch (artiste.Metier) {
        case "Comédien":
          return "emoji_people";
        case "Photographe":
          return "camera";
        default:
          return "history_edu";
      }
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    goToBoucheAOreille() {
      var that = this;
      if (this.$route.name !== "index")
        this.$router.push({ name: "index2023" });
      setTimeout(() => that.scrollToElement("boucheAOreille"), 100);
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement(section) {
      let element_id = document.getElementById(section);
      if (element_id) {
        element_id.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
    api.methods.getArtistes().then((a) => {
      this.data.artistes = a;
    });
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
};
</script>
<style lang="scss" scoped>
.logo {
  height: 40px;
  width: 40px;
}
</style>

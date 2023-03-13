import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Main from "./views/Main.vue";
import Artistes from "./views/Artistes.vue";
import Components from "./views/Components.vue";
import Profile from "./views/Profile.vue";
import Blog from "./views/Blog.vue";
import Article from "./views/Article.vue";
import Ateliers from "./views/Ateliers.vue";
import Login from "./views/Login.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

import Index2022 from "./views/2022/Index.vue";
import Artistes2022 from "./views/2022/Artistes.vue";
import Components2022 from "./views/2022/Components.vue";
import Profile2022 from "./views/2022/Profile.vue";
import Blog2022 from "./views/2022/Blog.vue";
import Article2022 from "./views/2022/Article.vue";
import Ateliers2022 from "./views/2022/Ateliers.vue";
import Login2022 from "./views/2022/Login.vue";
import MainNavbar2022 from "./layout/2022/MainNavbar.vue";
import MainFooter2022 from "./layout/2022/MainFooter.vue";

import Index2023 from "./views/2023/Index.vue";
import Artistes2023 from "./views/2023/Artistes.vue";
import Components2023 from "./views/2023/Components.vue";
import Profile2023 from "./views/2023/Profile.vue";
import Blog2023 from "./views/2023/Blog.vue";
import Article2023 from "./views/2023/Article.vue";
import Ateliers2023 from "./views/2023/Ateliers.vue";
import Login2023 from "./views/2023/Login.vue";
import MainNavbar2023 from "./layout/2023/MainNavbar.vue";
import MainFooter2023 from "./layout/2023/MainFooter.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "main",
            components: { default: Main, header: MainNavbar2023, footer: MainFooter2023 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/programme",
            name: "index2023",
            components: { default: Index2023, header: MainNavbar2023, footer: MainFooter2023 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/artistes",
            name: "artistes2023",
            components: { default: Artistes2023, header: MainNavbar2023, footer: MainFooter2023 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/parrains",
            name: "parrains2023",
            components: { default: Artistes2023, header: MainNavbar2023, footer: MainFooter2023},
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/partenaires",
            name: "partenaires2023",
            components: { default: Artistes2023, header: MainNavbar2023, footer: MainFooter2023},
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/auteurs",
            name: "auteurs2023",
            components: { default: Artistes2023, header: MainNavbar2023, footer: MainFooter2023 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/ateliers",
            name: "ateliers2023",
            components: { default: Ateliers2023, header: MainNavbar2023, footer: MainFooter2023},
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/blog",
            name: "blog2023",
            components: { default: Blog2023, header: MainNavbar2023, footer: MainFooter2023 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/blog/:id",
            name: "article2023",
            components: { default: Article2023, header: MainNavbar2023, footer: MainFooter2023 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2021/programme",
            name: "index",
            components: { default: Index, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2021/artistes",
            name: "artistes",
            components: { default: Artistes, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2021/ateliers",
            name: "ateliers",
            components: { default: Ateliers, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2021/blog",
            name: "blog",
            components: { default: Blog, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2021/blog/:id",
            name: "article",
            components: { default: Article, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2022/programme",
            name: "index",
            components: { default: Index2022, header: MainNavbar2022, footer: MainFooter2022 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2022/artistes",
            name: "artistes",
            components: { default: Artistes2022, header: MainNavbar2022, footer: MainFooter2022 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2022/ateliers",
            name: "ateliers",
            components: { default: Ateliers2022, header: MainNavbar2022, footer: MainFooter2022 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2022/blog",
            name: "blog",
            components: { default: Blog2022, header: MainNavbar2022, footer: MainFooter2022 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/2022/blog/:id",
            name: "article",
            components: { default: Article2022, header: MainNavbar2022, footer: MainFooter2022 },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/test",
            name: "test",
            components: { default: Components, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        },
        {
            path: "/login",
            name: "login",
            components: { default: Login, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 }
            }
        },
        {
            path: "/profile",
            name: "profile",
            components: { default: Profile, header: MainNavbar, footer: MainFooter },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" }
            }
        }
    ],
    scrollBehavior: to => {
        return { x: 0, y: 0 };
    }
});
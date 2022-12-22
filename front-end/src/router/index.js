import { createWebHistory, createRouter } from "vue-router";
import RegisterView from "../view/register.view.vue";
import LoginView from "../view/login.view.vue";
import HomeView from "../view/home.view.vue";
import MessageView from "../view/message.view.vue";
import ProfileView from "../view/own-profile.view.vue";
import applicationView from "../view/application.view.vue";
import CompanyProfileView from "../view/companyProfile.view.vue";
import PeopleProfileView from "../view/peopleProfile.view.vue";
import applyView from "../view/apply.view.vue";
import AdminView from "../view/admin.view.vue";
import offerView from "../view/offer.view.vue";
import updateAdView from "../view/updateAd.view.vue";

const routes = [
    {
        path: "/register",
        name: "Register",
        component: RegisterView,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView
    },
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/messages",
        name: "message",
        component: MessageView,
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfileView
    },
    {
        path: "/applications",
        name: "application",
        component: applicationView ,
    },
    {
        path: "/company/profile/:id",
        name: "company-profile",
        component: CompanyProfileView
    },
    {
        path: "/people/profile/:id",
        name: "people-profile",
        component: PeopleProfileView
    },
    {
        path: "/apply/:adId/:peopleId/:companyName",
        name: "apply",
        component: applyView ,
        props: true
    },
    {
        path: "/admin",
        name: "admin-panel",
        component: AdminView
    },
    {
        path: "/offer",
        name: "offer",
        component: offerView
    },
    {
        path: "/offer/:adId/:companyId",
        name: "update-ad",
        component: updateAdView,
        props: true
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

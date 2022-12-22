import "bootstrap/dist/css/bootstrap.min.css"
import "./style/main.css"
import "bootstrap"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
//import { faBuilding } from '@fortawesome/free-regular-svg-icons'
import {
    faMagnifyingGlass,
    faLocationDot,
    faUser,
    faBriefcase,
    faHouse,
    faMessage,
    faBuilding,
    faMoneyBill,
    faXmark,
    faCheck,
    faEllipsis,
    faHeart,
    faFileArrowUp,
    faPaperPlane,
    faRightFromBracket,
    faEnvelope,
    faPhone,
    faCity,
    faBold,
    faItalic,
    faUnderline,
    faStrikethrough,
    faParagraph,
    faListUl,
    faListOl,
    faArrowTurnDown,
    faEraser,
    faRotateLeft,
    faRotateRight, 
    faPen, 
    faTrash, 
    faCirclePlus,
    faUserLock,
    faHand,
    faDownload
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {useCookies} from "vue3-cookies";
const { cookies } = useCookies();



library.add(faUser, faMagnifyingGlass, faLocationDot, faBriefcase, faHouse, faMessage,
    faBuilding, faMoneyBill, faXmark, faPaperPlane, faCheck, faEllipsis, faHeart, faRightFromBracket,
    faFileArrowUp, faEnvelope, faPhone, faCity, faBold, faItalic, faUnderline, faStrikethrough,
    faParagraph, faListUl, faPen, faTrash, faCirclePlus, faListOl, faArrowTurnDown, faEraser, faRotateLeft, faRotateRight,
    faUserLock, faHand, faDownload)

createApp(App)
    .provide('Cookie_global_key', cookies.keys()[0])
    .provide('Cookie_global_value', cookies.get(cookies.keys()[0]))
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');





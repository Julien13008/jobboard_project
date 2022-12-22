<template>
  <div class="container">
    <div v-if="!this.cookie" class="row">
      <unlogged-side-bar-component />
      <router-view />
    </div>
    <div v-else class="row">
      <logged-side-bar-component/>
      <router-view />
    </div>
  </div>
</template>

<script>
import loggedSideBarComponent from "./components/sideBar/loggedSideBar.component.vue";
import unloggedSideBarComponent from "./components/sideBar/unloggedSideBar.component.vue";
import {inject} from "vue";

export default {
  components: {unloggedSideBarComponent, loggedSideBarComponent},
  data() {
    return {
      cookie: inject("Cookie_global_key")
    }
  }
}
</script>
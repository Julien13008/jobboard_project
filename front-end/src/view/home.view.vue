<template>
  <div class="col-11">
    <div class="row">
      <div v-if="!this.cookie && !seeJobList">
        <unlogged-home-content-component @seeJobList="updateSeeJobList"/>
<!--        <search-bar-component :logged="false"/>-->
      </div>
      <div v-else>
        <search-bar-component
            v-bind:searchArray="searchArray"
            v-on:get:searchArray="searchArray = $event"
            :logged="true"/>
        <logged-home-content-component :searchArray="searchArray" :isAllowed="isAllowed"/>
      </div>
    </div>
  </div>

</template>

<script>
import unloggedSideBarComponent from "../components/sideBar/unloggedSideBar.component.vue";
import unloggedHomeContentComponent from "../components/home/unloggedHomeContent.component.vue";
import searchBarComponent from "../components/home/searchBar.component.vue";
import loggedSideBarComponent from "../components/sideBar/loggedSideBar.component.vue";
import loggedHomeContentComponent from "../components/home/loggedHomeContent.component.vue";
import {inject} from "vue";

export default {
  name: "home.view",
  components: {
    unloggedSideBarComponent,
    unloggedHomeContentComponent,
    searchBarComponent,
    loggedSideBarComponent,
    loggedHomeContentComponent
  },
  watch:{
    searchArray:{
      handler(val, oldVal){
        this.searchArray = val;
      },
      deep: true
    }
  },
  data() {
    return {
      cookie : inject("Cookie_global_key"),
      searchArray : [],
      isAllowed: true,
      seeJobList: false,
    }
  },
  mounted() {
    this.initialize();
  },
  methods : {
    initialize() {
      if (this.cookie) { this.seeJobList = true; }
      this.setAllowed();
    },
    setAllowed() {
      if(!this.cookie || this.cookie !== 'JWT_People') { this.isAllowed = false; }
    },
    updateSeeJobList() {
      console.log('update')
      this.seeJobList = true;
    }
  }
}
</script>


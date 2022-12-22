<template>
    <div id="double-card-container" v-if="this.tokenDecode" class="col-11 row mt-3" >
      <people-applications-list-component v-if="this.cookie == 'JWT_People'" :id=this.tokenDecode.id />
      <company-application-list-component v-else-if="this.cookie == 'JWT_Company'" :id=this.tokenDecode.id />
      <div v-else><not-allowed-component/></div>
    </div>
</template>

<script>
import notAllowedComponent from "../error/notAllowed.component.vue";

import adInfosHeaderComponent from "../adInfosHeader.component.vue";
import peopleApplicationsListComponent from "./peopleApplicationsList.component.vue";
import companyApplicationListComponent from "./companyApplicationList.component.vue";


import EntityUser from "../../script/EntityUser.script";
import {inject} from "vue";

const entityUser = new EntityUser();

export default {
  components: {adInfosHeaderComponent, peopleApplicationsListComponent, companyApplicationListComponent, notAllowedComponent},
  name: "applicationContent.component",
  data() {
    return {
      cookie: inject("Cookie_global_key"),
      token: inject("Cookie_global_value"),
      tokenDecode: null
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      entityUser.decode(this.token).then( res => { this.tokenDecode = res; })
    }
  }
}
</script>

<style src="../../style/application-content.css"></style>
<style src="../../style/double-content.css"></style>

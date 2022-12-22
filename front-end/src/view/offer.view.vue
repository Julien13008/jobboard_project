<template>
  <div id="job-offer-container" v-if="this.tokenDecode" class="col-10 ms-5 mt-3 border-effect ">
    <job-offer-component v-if="this.cookie == 'JWT_Company'" :id=this.tokenDecode.id />
    <div v-else><not-allowed-component/></div>
  </div>
</template>

<script>

import EntityUser from "../script/EntityUser.script";
const entityUser = new EntityUser();

import jobOfferComponent from "../components/advertisement/jobOffer.component.vue";
import notAllowedComponent from "../components/error/notAllowed.component.vue";
import {inject} from "vue";

export default {
  components: {jobOfferComponent, notAllowedComponent},
  name: "offer.view",
  data() {
    return {
      content : '',
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
      entityUser.decode(this.token).then(res => { this.tokenDecode = res; })
    }
  }
}
</script>

<style scoped>

</style>
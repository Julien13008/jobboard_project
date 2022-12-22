<template>
  <div id="double-card-container" class="col-11 row mt-3 ms-2 p-3 border-effect">
    <div v-if="this.cookie == 'JWT_People'" class="my-5">
      <PeopleProfile v-if="this.tokenDecode" :token=this.tokenDecode />
    </div>
    <div v-else-if="this.cookie == 'JWT_Company'" class="my-5">
      <CompanyProfile v-if="this.tokenDecode" :token=this.tokenDecode />
    </div>
    <div v-else>
      <not-allowed-component/>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import PeopleProfile from "./people/peopleOwnProfile.component.vue";
import CompanyProfile from "./company/companyOwnProfile.component.vue";
import notAllowedComponent from "./error/notAllowed.component.vue";
import {inject} from "vue";

export default {
  name: "Profile",
  components: {CompanyProfile, PeopleProfile, notAllowedComponent},
  data() {
    return {
      cookie: inject("Cookie_global_key"),
      token: inject("Cookie_global_value"),
      tokenDecode: null
    }
  },
  mounted() {
    axios.post("http://localhost:3000/api/decode", {token: this.token})
    .then(data => {
      this.tokenDecode = data.data
    })
  }
}
</script>

<style scoped>

</style>
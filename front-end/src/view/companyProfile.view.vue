<template>
  <div v-if='this.cookie =="JWT_People"' class="col-11">
    <CompanyProfile :id="this.id" />
  </div>
  <div v-else class="col-11">
    <not-allowed-component/>
  </div>
</template>

<script>
import CompanyProfile from "../components/company/companyProfile.component.vue"
import {inject} from "vue";
import notAllowedComponent from "../components/error/notAllowed.component.vue";

export default {
  name: "CompanyProfileView",
  components: {CompanyProfile, notAllowedComponent},
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      cookie: inject("Cookie_global_key"),
      id: this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
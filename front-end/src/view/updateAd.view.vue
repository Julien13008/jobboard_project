<template>
  <div v-if="adId && companyId" id="job-offer-container" class="col-10 ms-5 mt-3 border-effect ">
    <update-ad-form-component :company-id="companyId" :adId="adId" />
  </div>
  <div v-else><not-allowed-component/></div>
</template>

<script>
import updateAdFormComponent from "../components/advertisement/updateAdForm.component.vue";
import notAllowedComponent from "../components/error/notAllowed.component.vue";

export default {
  components: {updateAdFormComponent, notAllowedComponent},
  props: ['companyId', 'adId' ],
  name: "updateAd.view",
}
</script>

<style scoped></style>
<template>
  <apply-form-component v-if="adId && peopleId && companyName" :adId="adId" :peopleId="peopleId" :companyName="companyName"/>
  <div v-else> <not-allowed-component/> </div>
</template>

<script>
import applyFormComponent from "../components/apply/applyForm.component.vue";
import notAllowedComponent from "../components/error/notAllowed.component.vue";

export default {
  props: ['adId', 'peopleId', 'companyName'],
  name: "apply.view",
  components: {applyFormComponent, notAllowedComponent}
}
</script>

<style scoped>

</style>
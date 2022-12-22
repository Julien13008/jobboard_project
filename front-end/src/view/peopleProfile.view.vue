<template>
  <div v-if='this.cookie =="JWT_Company"' class="col-11">
    <PeopleProfile :id="this.id" />
  </div>
  <div v-else class="col-11">
    <not-allowed-component/>
  </div>
</template>

<script>
import notAllowedComponent from "../components/error/notAllowed.component.vue";
import PeopleProfile from "../components/people/peopleProfile.component.vue"
import {inject} from "vue";

export default {
  name: "PeopleProfileView",
  components: {PeopleProfile, notAllowedComponent},
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
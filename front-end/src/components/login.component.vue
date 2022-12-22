<template>
    <PeopleLogin v-if="stateModel == 'people'"/>
    <CompanyLogin v-else />
</template>

<script>

import PeopleLogin from "./people/peopleLoginForm.component.vue";
import CompanyLogin from "./company/companyLoginForm.component.vue";

export default {
  name: "login",
  components: {CompanyLogin, PeopleLogin},
  props: {
    stateModel: {
      type: String
    }
  }
}
</script>

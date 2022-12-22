<template>
  <PeopleRegister v-if="stateModel == 'people'"/>
  <CompanyRegister v-else />
</template>

<script>

  import PeopleRegister from "./people/peopleRegisterForm.component.vue";
  import CompanyRegister from "./company/companyRegisterForm.component.vue";

  export default {
    name: "login",
    components: {CompanyRegister, PeopleRegister},
    props: {
      stateModel: {
        type: String
      }
    }
  }
</script>

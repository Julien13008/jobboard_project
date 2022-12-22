<template>
  <div class="col-11 my-4" v-if="this.companyData">
    <div class="row">
      <div class="col-12 row mb-4">
        <div class="col-6 fs-1 fw-bold d-flex align-items-center">{{this.companyData.name}}</div>
        <img :src="this.path" id="logo" alt="No logo" class="img-fluid img-thumbnail rounded col-6 image d-flex ms-auto"/>
      </div>
      <div class="card">
        <div class="col-6"><font-awesome-icon icon="fa-solid fa-envelope" /> {{this.companyData.email}}</div>
      </div>
    </div>
  </div>
  <div v-else>
    Company not found
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "companyProfile.component.vue",
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return{
      companyData: null,
      path: ''
    }
  },

  async mounted() {
    await axios.get("http://localhost:3000/api/company/" + this.$props.id)
        .then(data => {
          this.companyData = data.data;
        })
    .catch(e => {
    });

    if(this.companyData){
      await axios.post('http://localhost:3000/api/company/get-file', {entity: "company", email: this.companyData.email})
          .then(data => {
            this.path = data.data + this.companyData.logo;
          })
    }

  },
}
</script>

<style scoped src="../../style/profile.css">

</style>
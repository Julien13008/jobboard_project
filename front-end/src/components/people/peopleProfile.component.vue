<template>
  <div class="col-11" v-if="this.peopleData">
    <div class="row">
      <div class="col-12 row">
        <div class="col-6 row">
          <div class="col-12 row">
            <div class="col-6 fs-1 fw-bold d-flex align-items-center">{{this.peopleData.firstName}} {{this.peopleData.name}}</div>
            <img :src="this.pathPP" id="logo" alt="No logo" class="img-fluid img-thumbnail rounded col-6 image d-flex ms-auto"/>
          </div>
          <div class="card">
            <div class="col-12 my-1"><font-awesome-icon icon="fa-solid fa-envelope" /> {{ this.peopleData.email }}</div>
            <div class="col-12 my-1"><font-awesome-icon icon="fa-solid fa-location-dot" /> {{ this.peopleData.address }}</div>
            <div class="col-12 my-1"><font-awesome-icon icon="fa-solid fa-city" /> {{ this.peopleData.city }} ({{ this.peopleData.postalCode }})</div>
            <div class="col-12 my-1"><font-awesome-icon icon="fa-solid fa-phone" /> {{ this.peopleData.phone }}</div>
          </div>
        </div>
        <iframe class="col-6" v-if="this.peopleData.CV" :src="this.pathCV" />
      </div>
    </div>
  </div>
  <div v-else>
    People not found
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "PeopleProfile",
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return{
      peopleData: null,
      pathPP: '',
      pathCV: ''
    }
  },

  async mounted() {
    await axios.get("http://localhost:3000/api/people/" + this.$props.id)
        .then(data => {
          this.peopleData = data.data;
        })
        .catch(e => {
          console.log(e.message);
        });

    if(this.peopleData){
      await axios.post('http://localhost:3000/api/people/get-file', {entity: "people", email: this.peopleData.email})
          .then(data => {
            this.pathPP = data.data + this.peopleData.profilePicture;
            this.pathCV = data.data + this.peopleData.CV
          })
    }

  },
}
</script>

<style scoped src="../../style/profile.css">

</style>
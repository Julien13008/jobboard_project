<template>
  <div class="row">
    <div class="col-2 mt-2">
     <img :src="this.path" id="logo" alt="No logo" class="img-fluid img-thumbnail rounded d-block image" height="20" width="20">
    </div>
      <p class="col-8 mt-3 company-name">{{companyData.name}}</p>
    <div class="col-6 mt-4 mb-4">
      <input v-model="jobOfferData.title" type="text" id="title" class="form-control form-input p-2" placeholder="Application title">
    </div>
    <div class="col-6 mt-4 mb-4">
      <input v-model="jobOfferData.location" type="text" id="job-location" class="form-control form-input p-2" placeholder="Location">
    </div>
  </div>
  <div class="row d-flex align-items-center">
    <div v-for="(item, key) in object" class="col-4 mt-3">
      <select v-on:change="setData(item.value, $event)" class="form-select grey-select p-2" aria-label="Default select example">
        <option selected >{{ key }}</option>
        <option v-for="option in item.data" :value="option">{{option}}</option>
      </select>
    </div>
  </div>
  <div class="row mb-5">
    <div class="form-check form-switch col-4 d-flex align-items-center justify-content-center">
      <div>
        <label class="form-check-label mt-2" for="part-time">Part Time</label>
        <input v-model="jobOfferData.isPartTime" class="form-check-input mt-3" type="checkbox" id="part-time">
      </div>
    </div>
    <div class="form-check form-switch col-4 d-flex align-items-center justify-content-center">
      <div>
        <label class="form-check-label mt-2" for="remote">Remote</label>
        <input v-model="jobOfferData.remote" class="form-check-input mt-3" type="checkbox" id="remote">
      </div>
    </div>
    <div class="form-check form-switch col-4 d-flex align-items-center justify-content-center">
      <div>
        <label class="form-check-label mt-2" for="remote">Active</label>
        <input v-model="jobOfferData.active" class="form-check-input mt-3" type="checkbox" id="active">
      </div>
    </div>
  </div>
</template>

<script>
import Company from "../../script/Company.script";

const company = new Company();
export default {
  props : ['companyData'],
  name: "jobOfferForm.component",
  data() {
    return {
      object: {
        'Type of contract': {value : 'type', data : ['CDD', 'CDI', 'Apprentissage']},
        'Salary':{value : 'salarie', data :  ['15K to 30K', '30K to 45K', '45K to 75K']},
        'Years of experience':{value : 'experience', data :  ['junior', '0 - 2', '3 - 5', '5 - 10', 'senior']}
      },
      jobOfferData : {},
      path: ''
    }
  },
  mounted() {
    this.initialize();
  },
  watch:{
    jobOfferData: {
      handler(content, oldContent){
        this.$emit('update:jobOfferData', this.jobOfferData)
      },
      deep: true
    }
  },
  methods : {
    initialize() {
      this.setFile();
    },
    setFile() {
      company.getFile('company', this.companyData.email).then(res => {
        this.path = res.data + this.companyData.logo;
      })
    },
    setData(name, e) {
      this.jobOfferData[name] = e.target.value;
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div id="search-container" class="border-effect input-group m-2 p-2">
    <span class="p-3"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
    <input class="form-control border-0" v-model="searchOfferData.title" type="search" placeholder="Developer...">
    <div class="vr"></div>
    <span  class="p-3"><font-awesome-icon icon="fa-solid fa-location-dot" /></span>
    <input class="form-control border-0" v-model="searchOfferData.location" type="search" placeholder="London...">
    <div class="vr"></div>
    <span class="input-group-append p-2">
      <button class="btn" @click="onSubmit" type="submit">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <span class="p-2">Search</span>
      </button>
    </span>
  </div>
  <div v-if="logged" class="row ">
    <div v-for="(item, key) in object" class="col-2 mt-3">
      <select v-on:change="setData(item.value, $event)" class="form-select white-select p-2" aria-label="Default select example">
        <option selected >{{ key }}</option>
        <option v-for="option in item.data" :value="option">{{option}}</option>
      </select>
    </div>
    <div class="form-check form-switch col-2 d-flex align-items-center justify-content-end">
      <div>
        <label class="form-check-label mt-2" for="part-time">Part Time</label>
        <input class="form-check-input mt-3" v-model="searchOfferData.isPartTime" type="checkbox" id="part-time">
      </div>
    </div>
    <div class="form-check form-switch col-2  d-flex align-items-center justify-content-end">
      <div>
        <label class="form-check-label mt-2" for="remote">Remote</label>
        <input class="form-check-input mt-3" v-model="searchOfferData.remote" type="checkbox" id="remote">
      </div>
    </div>
  </div>
</template>
<script>

import Advertisement from "../../script/Advertisement.script.js";
import Company from '../../script/Company.script.js';

const ads = new Advertisement();
const company = new Company();

export default {
  props: ['logged'],
  name: "searchBar.component",
  data() {
    return {
      object: {
        'Type of contract': {value : 'type', data : ['CDD', 'CDI', 'Apprentissage']},
        'Salary':{value : 'salarie', data :  ['15K to 30K', '30K to 45K', '45K to 75K']},
        'Years of experience':{value : 'experience', data :  ['junior', '0 - 2', '3 - 5', '5 - 10', 'senior']},
        'Publication date': {value: 'createdAt', data: ['Today', '1 week', '1 month', '3 months']}
      },
      searchOfferData: {}
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault();

      ads.search(this.searchOfferData)
      .then(data => {
        data = this.setAdCompany(data);
        this.$emit("get:searchArray", data);
      });
    },
    setData(name, e) {
      this.searchOfferData[name] = e.target.value;
    },
    setAdCompany(searchArray) {
      searchArray.forEach(function (element, index) {
        company.getOneById(element.companyId).then(res => {
          searchArray[index].company = res;
        }).catch(err =>{ console.log(err)} );
      });

      return searchArray;
    }
  }
}
</script>

<style src="../../style/job-search-bar.css"></style>
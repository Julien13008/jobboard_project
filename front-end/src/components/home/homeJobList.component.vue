<template>
  <div id="job-container" class="col-4 overflow-auto pe-4">
    <div v-for="ad in adsList" v-on:click="setSelectedAd(ad)" id="tiny-job-card" class="card border-effect mb-3">
      <div class="card-body">
        <h5 class="card-title mb-4">{{ ad.title }}</h5>
        <p v-if="ad.company" id="company">{{ad.company.name}}</p>
        <p id="location">{{ ad.salarie }}</p>
        <p id="location">{{ ad.location }}</p>
        <p id="contract-info">{{ ad.type }}</p>
        <p id="time" class="card-text text-muted">Offer published {{ moment(ad.createdAt).startOf('day').fromNow() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Advertisement from "../../script/Advertisement.script";
import Company from "../../script/Company.script";
import moment from 'moment';

let company = new Company();
let advertisement = new Advertisement();

export default {
  name: "homeJobList.component",
  props: ['searchArray'],
  data() {
    return {
      adsList: [],
      moment: moment
    }
  },
  mounted() {
    this.initializeAds();
  },
  watch:{
    '$props.searchArray':{
      handler(val, oldVal){
        this.adsList = val;
      },
      deep: true
    }
  },
  methods: {
    initializeAds() {
      this.getAllAds().then( res => {
        this.setAdCompany();
      });
    },
    getAllAds() {
      let self = this;
      return new Promise(function (resolve, reject) {
        advertisement.getAll()
            .then(res => {
              self.adsList = res;
              self.setSelectedAd(res[0]);
              resolve()
            })
            .catch(err => {
              console.log(err); });
      })
    },
    setSelectedAd(ad) {
      this.$emit('update:ad', ad)
    },
    setAdCompany() {
      let self = this;
      this.adsList.forEach(function (element, index) {
        company.getOneById(element.companyId).then(res => { self.adsList[index].company = res; })
            .catch(err =>{ console.log(err)} );
      })
    }
  }
}
</script>

<style src="../../style/job-list.css"></style>
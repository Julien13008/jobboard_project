<template>
    <div id="job-card" class="card col-8 border-effect">
      <div class="card-body">
        <div class="row">
          <div class="col-8">
            <div class="row">
              <font-awesome-icon v-if="isFavourite" class="text-danger mt-1 col-1" @click="toggleFavourite" icon="fa-solid fa-heart"/>
              <font-awesome-icon v-else @click="toggleFavourite" class="col-1 mt-1" icon="fa-solid fa-heart"/>
              <h5 class="card-title col-6">{{ ad.title }}</h5>
            </div>
            <p id="time" class="card-text">Offer published {{moment(ad.createdAt).startOf('day').fromNow()}}</p>
            <p v-if="ad.company" id="company">{{ ad.company.name }}</p>
            <p id="location">{{ ad.location }}</p>
            <p id="contract-info">{{ ad.type }} {{ duration }} {{ remote }}</p>
            <p id="salary">{{ ad.salarie }}</p>
            <p id="Title" class="card-title">Job description</p>
            <div v-if="isAllowed">
              <button v-if="hasApplied" class="yellow-button btn mt-2 mb-2 pt-2 pb-2 ps-4 pe-4 disabled">Application sent !</button>
              <button v-else @click="applyAd" class="blue-button btn mt-2 mb-2 pt-2 pb-2 ps-4 pe-4">Apply</button>
            </div>
            <div v-else-if="!cookie">
              <button @click="redirectRegister" class="blue-button btn mt-2 mb-2 pt-2 pb-2 ps-4 pe-4">register to apply !</button>
            </div>
          </div>
          <div class="col-4 ">
            <img v-if="ad.company" :src=setLogo(ad.company) alt="no logo" class="img-fluid rounded-circle">
          </div>
        </div>
        <div id="job-card-content" class="overflow-auto">
          <p class="card-text" v-html="ad.description"></p>
        </div>
      </div>
    </div>
</template>

<script>
import People from "../../script/People.script";
import Company from "../../script/Company.script";
import Favori from "../../script/Favori.script";
import JobApplication from "../../script/JobApplication.script";
import {inject} from "vue";
import moment from 'moment';


const jobApplication = new JobApplication();
const people = new People();
const company = new Company();
const favori = new Favori();

export default {
  name: "homeJobCard.component",
  props: ['ad', 'isAllowed'],
  data() {
    return {
      duration : '',
      remote : '',
      token: inject("Cookie_global_value"),
      cookie: inject('Cookie_global_key'),
      tokenDecode : null,
      isFavourite : false,
      hasApplied : false,
      favoriId : null,
      moment: moment,
    }
  },
  mounted() {
    this.initializeData(this.token);
  },
  watch : {
    ad(newAd, oldAd) {
      this.setRemote(newAd);
      this.setDuration(newAd);
      if (this.tokenDecode) {
        this.isAlreadyFavourite(this.tokenDecode.id);
        this.isAlreadyApplied(this.ad.id, this.tokenDecode.id)
      };
    },
  },
  methods : {
    initializeData(token) {
      people.decode(token).then( res => {
        this.tokenDecode = res;
        this.isAlreadyFavourite(res.id);
        this.isAlreadyApplied(this.ad.id, res.id)
      }).catch(err => {
        console.log(err)
      })
    },
    setRemote(ad) {
      if(!ad.remote) { this.remote = 'On site'} else { this.remote = "Remote"}
    },
    setDuration(ad) {
      if(!ad.isPartTime) { this.duration = 'Full time'} else { this.duration = 'Part time'}
    },
    applyAd() {
      this.$router.push({path: `/apply/${this.ad.id}/${this.tokenDecode.id}/${this.ad.company.name}`});
    },
    redirectRegister() {
      this.$router.push('/register');
    },
    isAlreadyApplied(adId, peopleId) {
      jobApplication.peopleHasAlreadyApplied(adId, peopleId).then(res => {this.hasApplied = res;})
          .catch(err => {console.log(err)});
    },
    setLogo(ad){
      return company.getImagePath("company", ad.email, ad.logo);
    },
    isAlreadyFavourite(id) {
      favori.isAlreadyFavourite(this.ad.id, id).then(res => {
        this.isFavourite = res.isFavourite;
        this.favoriId = res.favoriId;
      }).catch( err => {console.log(err)});
    },
    toggleFavourite() {
      if (!this.isFavourite) {
        let data = { advertisementId: this.ad.id, peopleId: this.tokenDecode.id }
        favori.create(data).then(res => { this.isAlreadyFavourite(this.tokenDecode.id); })
      } else {
        favori.delete(this.favoriId).then( res => { this.isAlreadyFavourite(this.tokenDecode.id); })
      }
    }
  }
}
</script>

<style src="../../style/home-job-card.css"></style>
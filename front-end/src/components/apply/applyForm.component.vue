<template>
  <div class="col-10 ms-5 mt-3 border-effect apply-container">
    <div class="apply-content col p-4">
      <p id="ad-title">{{ adData.title}}</p>
      <p id="time">Offer published {{ moment(adData.createdAt).startOf('day').fromNow() }}</p>
      <ad-infos-header-component
          :company-name="companyName" :salary="adData.salarie"
          :location="adData.location"  :infos="[adData.type, remote, duration]"
      />
      <div class="row apply-form-container">
        <form class="col-5 " @submit="onSubmit">
          <div class="row">
            <div class="col-6 mt-4 mb-4">
              <input type="text" v-model="peopleData.name" id="name" class="form-control form-input" placeholder="Name"/>
            </div>
            <div class="col-6 mt-4 mb-4">
              <input type="text" v-model="peopleData.firstName" id="firstName" class="form-control form-input" placeholder="First name"/>
            </div>
            <div class="col-6 mt-4 mb-4">
              <input type="text" v-model="peopleData.phone" id="phone" class="form-control form-input" placeholder="Phone number">
            </div>
            <div class="col-6 mt-4 mb-4">
              <input type="email" v-model="peopleData.email" id="email" class="form-control form-input" placeholder="Email">
            </div>

            <div class="input-group mt-4 mb-4 col-12 row ms-1">
              <label class="input-group-text file-label"  for="CV">
                <input type="file" class="form-control form-input file-input" v-on:change="handleCVUpload" ref="file" id="CV" >
                <font-awesome-icon class="me-5" icon="fa-solid fa-file-arrow-up" />
                CV</label>
            </div>

            <div class="input-group mt-4 mb-5 col-12 row ms-1" >
              <label class="input-group-text file-label" for="ML">
                <input type="file" class="form-control form-input file-input" v-on:change="handleLMUpload" ref="file" id="ML">
                <font-awesome-icon class="me-5" icon="fa-solid fa-file-arrow-up" />
                Motivation letter</label>
            </div>

            <div class="row mt-5 d-flex justify-content-evenly">
              <button class="yellow-button btn p-2 col-5" @click="cancel">Cancel</button>
              <input type="submit" value="Apply" class="blue-button btn p-2 col-5">
            </div>
          </div>
        </form>
        <div  class="col-7 mb-2 mt-4 row container file-container d-flex">
          <iframe class="col-6 mb-4" :src="this.pathCV"></iframe>
          <iframe class="col-6 mb-4" src="./src/assets/image/CV.pdf"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adInfosHeaderComponent from "../adInfosHeader.component.vue";
import People from "../../script/People.script";
import Advertisement from "../../script/Advertisement.script";
import JobApplication from "../../script/JobApplication.script";
import moment from "moment";

const people = new People();
const advertisement = new Advertisement();
const jobApplication = new JobApplication();

export default {
  components: { adInfosHeaderComponent },
  props: ['adId', 'peopleId', 'companyName'],
  name: "applyForm.component",
  data() {
    return {
      peopleData: {},
      peopleDataCopy: {},
      adData: {},
      pathCV: "",
      availability: null,
      experience: null,
      CV: null,
      ML: null,
      remote: null,
      duration: null,
      moment: moment
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      await people.getOneById(this.peopleId).then(res => {
        this.peopleData = res;
        this.peopleDataCopy = res;
      });

      people.getFile("people", this.peopleData.email)
      .then(data => {
        this.pathCV = data.data + this.peopleData.CV;
      })

      advertisement.getOneById(this.adId).then(res => {
        this.adData = res;
        this.setDuration(this.adData.remote);
        this.setRemote(this.adData.isPartTime);
      })
    },
    setRemote(remote) {
      if(!remote) { this.remote = 'On site'} else { this.remote = "Remote"}
    },
    setDuration(isPartTime) {
      if(!isPartTime) { this.duration = 'Full time'} else { this.duration = 'Part time'}
    },
    handleCVUpload(e) {
      this.CV = e.target.files[0];
    },
    handleLMUpload(e) {
      this.ML = e.target.files[0];
    },
    onSubmit(e) {
      e.preventDefault();
      if (this.peopleDataCopy !== this.peopleData) {  people.update(this.peopleData.id, this.peopleData).then(res => { }) }
      let dataToSend = { "status": 'en cours', "advertisementId": this.adData.id, "peopleId": this.peopleData.id}
      jobApplication.create(dataToSend).then(res => {
        jobApplication.update(res.data.id, {"status": "en cours", "advertisementId": res.data.advertisementId, "peopleId": res.data.peopleId, "motivationLetter": this.ML }).then(data => {
              this.$router.push({path: `/`});
            }
        )
      })
    },
    cancel() {
      this.$router.push({path: `/`});
    }

  }
}
</script>

<style src="../../style/applyForm.css"></style>
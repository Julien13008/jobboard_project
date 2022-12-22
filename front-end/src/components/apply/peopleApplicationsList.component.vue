<template>
    <div id="list-container" class="col-3 ms-2 mt-1 mb-1 card border-effect ">
      <div class="row d-flex align-items-center justify-content-center text-center">
        <p class="mt-3">Applications</p>
      </div>
      <hr>
      <div id="list" class="overflow-auto">
        <div @click="setSelectedApp(application)" v-if="jobApplicationList" v-for="application in jobApplicationList" class="row d-flex align-items-center justify-content-center list-item m-2">
          <p id="company" class="col-6 mt-3">{{ application.company.name }}</p>
          <p class="date col-3 mt-3">{{ moment(application.createdAt).format("D-MM") }}</p>
        </div>
      </div>
    </div>
    <div v-if="jobApplicationSelected" id="content" class="col-8 ms-5 mt-1 mb-1 card border-effect container pt-4 pe-4 ps-4">
        <div class="col-9">
          <h5 class="card-title">{{jobApplicationSelected.advertisement.title}}</h5>
          <p id="time" class="card-text">Offer published {{ moment(jobApplicationSelected.advertisement.createdAt).startOf('day').fromNow() }}</p>
          <p class="date card-text">You applied this offer {{ moment(jobApplicationSelected.createdAt).startOf('day').fromNow() }}</p>
        </div>
      <ad-infos-header-component
          :company-name="jobApplicationSelected.company.name"
          :salary="jobApplicationSelected.advertisement.salarie"
          :location="jobApplicationSelected.advertisement.location"
          :infos="[jobApplicationSelected.advertisement.type, remote, duration]"
      />
      <hr>
      <div class="row">

        <p class="col-9" v-if="jobApplicationSelected.status == 'accepted'">Congratulations you got the job !</p>
        <p class="col-9" v-else-if="jobApplicationSelected.status == 'rejected'">You weren't shortlisted for the job. Don't give up!</p>
        <p class="col-9" v-else>Your application is being processed</p>
      </div>
      <hr>
      <div class="content-wrapper overflow-auto">
        <p v-html="jobApplicationSelected.advertisement.description"></p>
      </div>

    </div>
</template>

<script>
import adInfosHeaderComponent from "../adInfosHeader.component.vue";
import JobApplication from "../../script/JobApplication.script";
import moment from "moment";
import Company from "../../script/Company.script";
import Advertisement from "../../script/Advertisement.script";

const jobApplication = new JobApplication();
const company = new Company();
const advertisement = new Advertisement();

export default {
  props: ['id'],
  components: {adInfosHeaderComponent},
  name: "peopleApplicationsList.component",
  data() {
    return {
      moment: moment,
      inProgress : false,
      rejected : true,
      accepted : false,
      peopleData: {},
      jobApplicationList: null,
      jobApplicationSelected: null,
      duration : '',
      remote : '',
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      this.setJobList().then(res => {
        this.setData();
        this.setRemote(this.jobApplicationSelected);
        this.setDuration(this.jobApplicationSelected);
      })
    },
    setJobList() {
      let self = this;
      return new Promise(function (resolve, reject) {
        jobApplication.getByEntity('people', self.id).then(res => {
          self.jobApplicationList = res;
          self.jobApplicationSelected = res[0];
          resolve();
        })
      });
    },
    setSelectedApp(application) {
      this.jobApplicationSelected = application;
      this.setRemote(application.advertisement);
      this.setDuration(application.advertisement);
    },
    setData() {
      let self = this;
      this.jobApplicationList.forEach(function (element, index) {
        advertisement.getOneById(element.advertisementId).then(res => {
          self.jobApplicationList[index].advertisement = res;
          company.getOneById(res.companyId).then(r => { self.jobApplicationList[index].company = r })
        });
      })
    },
    setRemote(ad) {
      if(!ad.remote) { this.remote = 'On site'} else { this.remote = "Remote"}
    },
    setDuration(ad) {
      if(!ad.isPartTime) { this.duration = 'Full time'} else { this.duration = 'Part time'}
    }
  }
}
</script>

<style scoped>

</style>
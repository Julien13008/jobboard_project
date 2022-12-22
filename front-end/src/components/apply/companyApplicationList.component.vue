<template>
  <div id="list-container" class="col-3 ms-2 mt-1 mb-1 card border-effect ">
    <div class="row d-flex align-items-center justify-content-center text-center">
      <p class="mt-3">Applications</p>
    </div>
    <hr>
    <button @click="redirectJobOffer" class="btn btn-outline-secondary">add new offer</button>
    <div id="list" class="overflow-auto">
      <div v-if="advertisementList" v-for="ad in advertisementList">
        <div v-if="ad.jobApplication" @click="setSelectedAd(ad)" class="row d-flex align-items-center justify-content-center  list-item m-2">
          <button class="btn border-0 pt-3 pb-3 p-2" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + ad.id"
                  aria-expanded="false" aria-controls="collapseExample">
            {{ ad.title }}
          </button>
        </div>
        <div class="collapse" :id="'collapse' + ad.id">
          <div v-for="app in ad.jobApplication" @click="setSelectedJobApplication(app)"
               class="row d-flex align-items-center justify-content-center sub-list-item m-2">
            <p v-if="app.people" class="pt-3 text-center">{{ app.people.name }} {{ app.people.firstName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="jobApplicationSelected" id="content"
       class="col-8 s-5 mt-1 mb-1 card border-effect container pt-4 pe-4 ps-4">
    <div class="row mb-5">
      <div class="col-9">
        <h5 class="card-title">{{ jobApplicationSelected.people.firstName }} {{ jobApplicationSelected.people.name }}</h5>
        <p class="date card-text">
          Applied this Offer{{ moment(jobApplicationSelected.createdAt).startOf('day').fromNow() }}</p>
        <p>{{ jobApplicationSelected.people.email }}</p>
        <p>{{ jobApplicationSelected.people.phone }}</p>
      </div>
      <img :src="pathPP" class="img-fluid img-thumbnail rounded d-block col-3" height="50" width="50">
      <div class="row">
        <a href="#" class="col-4 m-2 btn yellow-button" download>
          <font-awesome-icon class="me-5" icon="fa-solid fa-download" />CV
        </a>
        <a href="#" class="col-4 m-2 btn blue-button" download>
          <font-awesome-icon class="me-5" icon="fa-solid fa-download" />Motivation Letter
        </a>
        <button class="col-8 m-2 btn btn-outline-secondary " data-bs-toggle="modal" data-bs-target="#exampleModal2">
          <font-awesome-icon class="me-5" icon="fa-solid fa-paper-plane" />Send Message
        </button>
      </div>
    </div>

    <div class="content-wrapper overflow-auto">
      <iframe v-if="pathML" :src="pathML"></iframe>
      <iframe v-if="pathCV" :src="pathCV"></iframe>
    </div>
  </div>
  <div v-else-if="selectedAd" id="content"
       class="col-8 ms-5 mt-1 mb-1 card border-effect container pt-4 pe-4 ps-4">
    <div class="row mb-5">
      <div class="col-9">
        <h5 class="card-title">{{ selectedAd.title }}</h5>
        <p>{{ selectedAd.location }}</p>
        <p>{{ selectedAd.experience }} of experience</p>
        <div class="form-check form-switch col-2 mb-4 d-flex align-items-center justify-content-end">
          <div>
            <label class="form-check-label mt-2" for="Active">Active</label>
            <input @change="setStatus" v-model="selectedAd.active" class="form-check-input mt-3" type="checkbox" id="active">
          </div>
        </div>
        <div class="row d-flex mt-2">
          <button class="col-3 me-5 btn blue-button" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
          <button class="col-3 ms-5 btn yellow-button" @click="updateAd">Update</button>
        </div>
      </div>
    </div>
    <ad-infos-header-component
        :company-name="''" :salary="selectedAd.salarie"
        :location="selectedAd.location"  :infos="[selectedAd.type, remote, duration]"
    />
    <div class="content-wrapper overflow-auto mt-3">
     <p  v-html="selectedAd.description"></p>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this ad ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn blue-button" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn yellow-button" @click="deleteAd">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="jobApplicationSelected" class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New message to {{ jobApplicationSelected.people.firstName }} {{ jobApplicationSelected.people.name }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ selectedAd}}</p>
          <textarea class="form-control form-input" v-model="message" rows="6" placeholder="Write your message..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn blue-button" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn yellow-button" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adInfosHeaderComponent from "../adInfosHeader.component.vue";
import moment from "moment";
import JobApplication from "../../script/JobApplication.script";
import Advertisement from "../../script/Advertisement.script";
import People from "../../script/People.script";
import Message from "../../script/Message.script";

const jobApplication = new JobApplication();
const advertisement = new Advertisement();
const people = new People();
const message = new Message();

export default {
  props: ['id'],
  components: {adInfosHeaderComponent},
  name: "companyApplicationList.component",
  data() {
    return {
      moment: moment,
      inProgress: false,
      rejected: true,
      accepted: false,
      advertisementList: null,
      jobApplicationSelected: null,
      selectedAd: null,
      duration: '',
      remote: '',
      message:'',
      pathPP: null,
      pathCV: null,
      pathML:null
    }
  },
  watch: {
    jobApplicationSelected(newData, oldData) {
      this.setData();
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      this.setAdList().then(res => {
        this.setApplicationByAd();
        this.setData();
      })
    },
    setData() {
      if(this.jobApplicationSelected.people) {
        people.getFile("people",this.jobApplicationSelected.people.email)
            .then(data => {
              this.pathPP = data.data + this.jobApplicationSelected.people.profilePicture
              this.pathCV = data.data + this.jobApplicationSelected.people.CV
            })
      }
    },
    setRemote(ad) {
      if(!ad.remote) { this.remote = 'On site'} else { this.remote = "Remote"}
    },
    setDuration(ad) {
      if(!ad.isPartTime) { this.duration = 'Full time'} else { this.duration = 'Part time'}
    },
    setAdList() {
      let self = this;
      return new Promise(async function (resolve) {
        advertisement.getByEntity('company', self.id).then(res => {
          self.advertisementList = res;
          resolve();
        });
      })
    },
    setApplicationByAd() {
      this.advertisementList.forEach(function (element) {
        jobApplication.getByEntity('advertisement', element.id).then(res => {
          if (res.length !== 0) {
            res.forEach(function (el) {
              people.getOneById(el.peopleId).then(r => {
                el.people = r;
                element.jobApplication = res;
              })
            })
          } else {
            element.jobApplication = res;
          }
        });
      })
    },
    setSelectedAd(ad) {
      this.jobApplicationSelected = null;
      this.setRemote(ad);
      this.setDuration(ad);
      this.selectedAd = ad;
    },
    setSelectedJobApplication(application) {
      this.selectedAd = null;
      this.jobApplicationSelected = application;
    },
    redirectJobOffer() {
      this.$router.push('/offer');
    },
    deleteAd() {
      advertisement.delete(this.selectedAd.id).then(res => { window.location.href = "/applications" })
    },
    updateAd() {
      this.$router.push(`/offer/${this.selectedAd.id}/${this.id}`);
    },
    setStatus() {
      advertisement.update(this.selectedAd.id, {active: this.selectedAd.active}).then(res => {})
    },
    sendMessage() {
     let messageData = {
        "message": this.message,
        "sender": "Company",
        "peopleId": this.jobApplicationSelected.people.id,
        "companyId": this.id,
        "advertisementId": this.jobApplicationSelected.advertisementId
      }
      message.create(messageData).then(res => { window.location.href = '/applications' ; }
      )
    }
  }
}
</script>
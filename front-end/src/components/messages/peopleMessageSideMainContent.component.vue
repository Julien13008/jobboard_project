<template>
  <div v-if="conversationSelected" id="content"
       class="col-8 ms-5 mt-1 mb-1 card border-effect container pt-4 pe-4 ps-4">
    <div class="row">
      <img v-if="path" :src="path" class="col-2 img-fluid company-logo rounded-circle">
      <div class="col-9">
        <p class="mt-3">{{ conversationSelected[0].ad.title }}</p>
        <p class="mt-3">{{ companyData.name }}</p>
      </div>
    </div>
    <hr>
    <div class="msg-content content-wrapper overflow-auto">
      <div v-for="content in conversationSelected">
        <div v-if="content.sender == 'Company'" class="row message-item d-flex">
          <p class="date col-7 ms-4">{{ moment(content.createdAt).format("MMM Do YYYY") }}</p>
          <p class="company-message col-7 p-3 ms-3">{{ content.message }}</p>
        </div>
        <div v-else class="row message-item d-flex justify-content-end">
          <p class="date col-7">{{ moment(content.createdAt).format("MMM Do YYYY") }}</p>
          <p class="people-message col-7 p-3 me-3">{{ content.message }}</p>
        </div>
      </div>

    </div>
    <hr>
    <div v-if="conversationSelected" class="row justify-content-end">
      <textarea v-model="message" class="form-control border-0 col-9" id="message" rows="3"
                placeholder="Write your message..."></textarea>
      <div>
        <button @click="sendMessage" class="btn m-2 btn-outline-secondar">
          <font-awesome-icon class="me-3" icon="fa-solid fa-paper-plane"/>
          Send
        </button>
      </div>
    </div>
  </div>
  <div v-else id="content" class="col-8 ms-5 mt-1 mb-1 card border-effect container pt-4 pe-4 ps-4">
    <p>No conversation selected</p>
  </div>
</template>

<script>
import Message from "../../script/Message.script";
import moment from "moment";
import Company from "../../script/Company.script";

const message = new Message();
const company = new Company();

export default {
  key: 1,
  props: ['conversationSelected', 'companyData', 'id'],
  name: "peopleMessageSideMainContent.component",
  data() {
    return {
      moment: moment,
      message: null,
      path: null
    }
  },
  watch: {
    companyData(newData, oldData) {
      this.setFile();
    }
  },
  mounted() {
    if (this.companyData) {
      this.setFile();
    }
  },
  methods: {
    sendMessage() {
      message.create(this.getData()).then(res => {
        this.$emit('update');
      });
    },
    setFile() {
      company.getFile('company', this.companyData.email).then(res => {
        this.path = res.data + this.companyData.logo;
      })
    },
    getData() {
      return {
        sender: 'People', companyId: this.companyData.id, peopleId: this.id,
        advertisementId: this.conversationSelected[0].advertisementId, message: this.message
      }
    },
  }
}
</script>

<style scoped>

</style>
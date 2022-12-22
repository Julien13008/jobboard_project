<template>
  <div v-if="conversationSelected" id="content" class="col-8 ms-5 mt-1 mb-1 card border-effect container pt-4 pe-4 ps-4">
    <div class="row">
      <img v-if="pathPP" :src="pathPP" class="col-2 img-fluid company-logo rounded-circle">
      <div class="col-9 row">
        <p class="mt-3 col-12">{{conversationSelected[0].people.name}} {{conversationSelected[0].people.firstName}}</p>
        <div class="col-6 row">
          <font-awesome-icon class="col-1 mt-4" icon="fa-solid fa-envelope" />
          <p class="mt-3 col-7">{{conversationSelected[0].people.email}}</p>
        </div>
        <div class="col-6 row">
          <font-awesome-icon class="col-1 mt-4" icon="fa-solid fa-phone" />
          <p class="mt-3 col-7">{{conversationSelected[0].people.phone}}</p>
        </div>
      </div>
    </div>
    <hr>
    <div class="msg-content content-wrapper overflow-auto">
      <div  v-for="content in conversationSelected">
        <div v-if="content.sender == 'People'" class="row message-item d-flex">
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
import moment from "moment/moment";
import People from "../../script/People.script";

const message = new Message();
const people = new People();

export default {
  props: ['conversationSelected', 'id'],
  name: "companyMessageSideMainContent.component",
  data() {
    return {
      moment: moment,
      message: null,
      pathPP: null
    }
  },
  watch: {
    conversationSelected(newData, oldData) {
      this.setData();
    }
  },
  mounted() {
    //this.setData();
  },
  methods : {
    sendMessage() {
      message.create(this.getData()).then(res => { this.$emit('update') });
    },
    setData() {
      if(this.conversationSelected[0].people) {
        people.getFile("people",this.conversationSelected[0].people.email)
            .then(data => {
              this.pathPP = data.data + this.conversationSelected[0].people.profilePicture
            })
      }
    },
    getData() {
      return {
        sender: 'Company', companyId: this.id, peopleId: this.conversationSelected[0].people.id,
        advertisementId: this.conversationSelected[0].advertisementId, message: this.message
      }
    }
  }
}
</script>

<style scoped>

</style>
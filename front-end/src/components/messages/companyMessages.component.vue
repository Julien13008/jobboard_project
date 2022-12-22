<template>
  <company-message-list-component
      v-if="messageData" :messageData="messageData"
      v-bind:conversationSelected="conversationSelected" v-on:update:conversationSelected="conversationSelected = $event"

  />
  <company-message-side-main-content-component
      :key="updateKey" @update="forceUpdate" :id="id"
      :conversationSelected="conversationSelected"
  />

</template>

<script>
import companyMessageListComponent from "./companyMessageList.component.vue";
import companyMessageSideMainContentComponent from "./companyMessageSideMainContent.component.vue";
import Message from "../../script/Message.script";
import People from "../../script/People.script";

const people = new People();
const message = new Message();

export default {
  props: ['id'],
  components: {companyMessageSideMainContentComponent, companyMessageListComponent},
  name: "companyMessages.component",
  data() {
    return {
      messageData: null,
      peopleData: null,
      updateKey: 0,
      conversationSelected: null,
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      this.messageData = await message.filterCompanyMessages(this.id);
    },
    forceUpdate() {
      this.updateKey += 1;
    }

  }
}
</script>
<template>
  <people-message-list-component v-if="messageData" :messageData="messageData"
      v-bind:conversationSelected="conversationSelected" v-on:update:conversationSelected="conversationSelected = $event"
      v-bind:companyData="companyData" v-on:update:companyData="companyData = $event"
  />
  <people-message-side-main-content-component :key="updateKey" :id="id"
      :company-data="companyData"  :conversationSelected="conversationSelected"
  />
</template>

<script>
import Message from "../../script/Message.script";
import peopleMessageSideMainContentComponent from "./peopleMessageSideMainContent.component.vue";
import peopleMessageListComponent from "./peopleMessageList.component.vue";

const message = new Message();

export default {
  props: ['id'],
  components: {peopleMessageListComponent, peopleMessageSideMainContentComponent},
  name: "peopleMessages.component",
  data() {
    return {
      companyData: null,
      conversationSelected: null,
      updateKey: 0,
      messageData: null
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      this.messageData = await message.filterPeopleMessages( this.id);
    },
    forceUpdate() {
      this.updateKey += 1;

    }
  }
}
</script>
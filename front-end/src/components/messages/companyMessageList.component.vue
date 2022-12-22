<template>
  <div id="list-container" class="col-3 ms-2 mt-1 mb-1 card border-effect ">
    <div class="row d-flex align-items-center justify-content-center text-center">
      <p class="mt-3">Messages</p>
    </div>
    <hr>
    <div v-if="messageData" @click="setConversation(item)" v-for="(item, index) in messageData" id="list"
         class="overflow-auto">
      <div class="d-flex align-items-center justify-content-center list-item m-2">
        <p id="company" class="mt-3">{{ index }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import People from "../../script/People.script";

const people = new People();

export default {
  props: ['messageData'],
  name: "companyMessageList.component",
  methods : {
    setConversation(conversation) {
        this.$emit('update:conversationSelected', conversation);
    }
  }
}
</script>

<style scoped>

</style>
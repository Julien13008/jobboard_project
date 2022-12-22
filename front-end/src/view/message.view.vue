<template>
  <div class="col-11">
    <message-content-component/>
  </div>
</template>

<script>

import messageContentComponent from "../components/messages/messageContent.component.vue";
import loggedSideBarComponent from "../components/sideBar/loggedSideBar.component.vue";

export default {
  name: "message.view.vue",
  components: {
    messageContentComponent,
    loggedSideBarComponent
  },
  data() {
    return {
      isLoggeg: false
    }
  }

}
</script>
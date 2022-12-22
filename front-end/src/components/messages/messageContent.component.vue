<template>
  <div id="double-card-container" v-if="this.tokenDecode" class="col-11 row mt-3" >
    <people-messages-component v-if="this.cookie == 'JWT_People'" :id=this.tokenDecode.id />
    <company-messages-component v-else-if="this.cookie == 'JWT_Company'" :id=this.tokenDecode.id />
    <div v-else>
      <not-allowed-component/>
    </div>
  </div>
</template>

<script>
import peopleMessagesComponent from "./peopleMessages.component.vue";
import companyMessagesComponent from "./companyMessages.component.vue";
import notAllowedComponent from "../error/notAllowed.component.vue";

import EntityUser from "../../script/EntityUser.script";
import {inject} from "vue";

const entityUser = new EntityUser();

export default {
  components : {peopleMessagesComponent, companyMessagesComponent, notAllowedComponent},
  name: "messageContent.component",
  data() {
    return {
      cookie: inject("Cookie_global_key"),
      token: inject("Cookie_global_value"),
      tokenDecode: null
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      entityUser.decode(this.token).then( res => {
        this.tokenDecode = res;
      })
    }
  }
}
</script>

<style src="../../style/message-content.css"></style>
<style src="../../style/double-content.css"></style>

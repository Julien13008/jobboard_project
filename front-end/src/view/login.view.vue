<template>
  <div class="col-11 d-flex justify-content-center align-items-center">
      <div v-if="!this.cookie" class="text-center mt-5 ms-5 border-effect login-container row">
        <div class="row mb-5">
          <button v-if="stateModel === 'people'" v-on:click="stateModel = 'people'" className="toggle-user-button-true p-3 col-6">People</button>
          <button v-else v-on:click="stateModel = 'people'" className="toggle-user-button-false p-3 col-6">People</button>
          <button v-if="stateModel === 'company'" v-on:click="stateModel = 'company'" className="toggle-user-button-true p-3 col-6">Company</button>
          <button v-else v-on:click="stateModel = 'company'" className="toggle-user-button-false p-3 col-6">Company</button>
        </div>
        <Login :state-model="stateModel"/>
      </div>
      <div v-else >
        <already-logged-component/>
      </div>
  </div>
</template>

<script>
import Login from "../components/login.component.vue";
import {inject} from "vue";
import AlreadyLoggedComponent from "../components/error/alreadyLogged.component.vue";
export default {
  components: { Login, AlreadyLoggedComponent },
  props: {
    stateModel: {
      type: String,
      default: "people"
    }
  },
  data() {
    return {
      cookie: inject("Cookie_global_key")
    }
  },
  methods : {
  }
}
</script>

<style src="../style/login-register.style.css" ></style>

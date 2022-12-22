<template>
  <div class="col-11 d-flex justify-content-center align-items-center" >
    <div v-if="this.cookie" >
      <already-logged-component/>
    </div>
    <div v-else class="col-6 mt-3 ms-5 border-effect row">
      <div class="text-center col-12 my-2">
        <div class="row mb-5">
          <button v-if="stateModel === 'people'" v-on:click="stateModel = 'people'" className="toggle-user-button-true p-3 col-6">People</button>
          <button v-else v-on:click="stateModel = 'people'" className="toggle-user-button-false p-3 col-6">People</button>
          <button v-if="stateModel === 'company'" v-on:click="stateModel = 'company'" className="toggle-user-button-true p-3 col-6">Company</button>
          <button v-else v-on:click="stateModel = 'company'" className="toggle-user-button-false p-3 col-6">Company</button>
        </div>
        <Register :state-model="stateModel" class="col-12"/>
      </div>
    </div>
  </div>
</template>

<script>
import Register from "../components/register.component.vue";
import AlreadyLoggedComponent from "../components/error/alreadyLogged.component.vue";
import {inject} from "vue";

export default {
  components: {Register, AlreadyLoggedComponent},
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
  }
}
</script>

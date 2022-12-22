<template>
    <div class="text-danger">{{ message }}</div>
    <form @submit="onSubmit" class="col-12">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <input type="email" v-model="email" id="email" class="form-control form-input mt-3" placeholder="Email">
          </div>
          <div class="col-12">
            <input type="password" v-model="password" id="password" class="form-control form-input mt-3" placeholder="Password"/>
          </div>
          <div>
            <input type="submit" value="Login" class="btn px-5 blue-button mt-5 mb-5 py-2">
          </div>
        </div>
      </div>
    </form>
</template>

<script>
import People from "../../script/People.script.js";
import {inject} from "vue";

let people = new People();

export default {
  name: "PeopleLogin",
  props: {
    stateModel: {
      type: String
    }
  },
  data() {
    return {
      email: '',
      password: '',
      message: '',
      cookie: inject("Cookie_global_key"),
      token: inject("Cookie_global_value"),
      tokenDecode: null
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      let peopleData = people.setData(this.$data);
      people.login(peopleData)
          .then(data => { window.location.href = "/"; })
          .catch(err => { this.message = err; });
    }
  }
}
</script>

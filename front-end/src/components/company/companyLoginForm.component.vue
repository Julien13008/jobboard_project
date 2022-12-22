<template>
  <div class="text-danger">{{message}}</div>
  <form @submit="onSubmit">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <input type="email" v-model="email" id="email" class="form-control form-input mt-3" placeholder="Email">
        </div>
        <div class="col-12">
          <input type="password" v-model="password" id="password" class="form-control form-input mt-3" placeholder="Password" />
        </div>
        <div>
          <input type="submit" value="Login" class="btn blue-button px-5 mt-5 mb-5 py-2">
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Company from "../../script/Company.script.js";
import {inject} from "vue";

let company = new Company();

export default {
  name: "CompanyLogin",
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
      cookie: inject("Cookie_global_key")
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      let companyData = company.setData(this.$data);
      company.login(companyData)
          .then(data => {
            window.location.href = "/"
          })
          .catch(err => { this.message = err; });
    }
  }
}
</script>

<template>
  <div class="col-11 d-flex justify-content-center align-items-center">
    <div v-if="!this.cookie" class="text-center mt-5 ms-5 border-effect login-container row">
      <button className="toggle-user-button-true p-3 col-12 mb-5">Admin</button>

      <div class="text-danger">{{ message }}</div>
      <form @submit="onSubmit" class="col-12">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <input type="email" v-model="email" id="email" class="form-control form-input mt-3" placeholder="Email">
            </div>
            <div class="col-12">
              <input type="password" v-model="password" id="password" class="form-control form-input mt-3"
                     placeholder="Password"/>
            </div>
            <div>
              <input type="submit" value="Login" class="btn px-5 blue-button mt-5 mb-5 py-2">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Admin from "../../script/Admin.script.js";

const admin = new Admin();

export default {
  name: "AdminLogin",
  data() {
    return {
      email: '',
      password: '',
      message: '',
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      let adminData = admin.setData(this.$data);
      admin.login(adminData)
          .then(data => {
            window.location.href = "/admin";
          })
          .catch(err => {
            this.message = err;
          });
    }
  }
}
</script>

<style scoped>

</style>
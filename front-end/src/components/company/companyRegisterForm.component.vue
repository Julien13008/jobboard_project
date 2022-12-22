<template>
  <div class="text-danger">{{message}}</div>
  <form @submit="onSubmit">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <input type="text" v-model="name" id="name" class="form-control form-input mt-4 py-2" placeholder="Name"/>
        </div>
        <div class="col-6">
          <input type="password" v-model="password" id="password" class="form-control form-input mt-4 py-2" placeholder="Password" />
        </div>
        <div class="col-6">
          <input type="password" v-model="confirmPassword" id="confirmPassword" class="form-control form-input mt-4 py-2" placeholder="Confirm Password"/>
        </div>
        <div class="col-12">
          <input type="email" v-model="email" id="email" class="form-control form-input mt-4 py-2" placeholder="Email">
        </div>
        <div class="input-group mt-4 mb-4 col-12 row ms-1">
          <label class="input-group-text file-label"  for="File">
            <input type="file" class="form-control form-input file-input" v-on:change="handleFileUpload" ref="file" id="File" >
            <font-awesome-icon class="me-5" icon="fa-solid fa-file-arrow-up" />
            Logo</label>
        </div>
        <div>
          <input type="submit" value="Register" class="btn yellow-button mt-4">
        </div>
      </div>
    </div>
  </form>
</template>

<script>

import Company from '../../script/Company.script.js';

let company = new Company();

export default {
  name: "CompanyRegister",
  data(){
    return{
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      logo: '',
      message: ''
    }
  },
  methods: {
    async onSubmit(e){
      e.preventDefault();

      let companyData = company.setData(this.$data);
      if(this.password == this.confirmPassword){
        companyData.test = "test";
        await company.create(companyData)
            .then(data => {
              this.$router.push({path: '/login'});
            })
            .catch(err => { this.message = err; });

      } else {
        this.message = "Password isn't the same";
      }

    },
    handleFileUpload(e){
      this.logo = e.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>
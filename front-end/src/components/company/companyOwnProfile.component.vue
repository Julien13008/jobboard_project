<template>
  <form @submit="onSubmit">
      <div class="row">
        <div class="text-danger text-center">{{message}}</div>
        <div class="col-12">
          <img :src="this.path" id="logo" alt="No logo" class="img-fluid img-thumbnail rounded d-block image" height="100" width="100"/>
        </div>
        <div class="row my-5">
          <div class="col-6">
            <input type="text" v-model="name" id="name" class="form-control form-input" placeholder="Company name"/>
          </div>
          <div class="col-6 mb-5">
            <input type="email" v-model="email" id="email" class="form-control form-input" placeholder="Email">
          </div>
          <div class="input-group my-2 col-12 pb-5 input-file" >
            <label class="input-group-text col-12 py-3 file-label" for="inputGroupFile02">
              <input type="file" class="form-control form-input file-input" v-on:change="handleFileUpload" ref="file" id="inputGroupFile02">
              <font-awesome-icon class="mx-5" icon="fa-solid fa-file-arrow-up" />
              Logo</label>
          </div>
        </div>
        <div class="pt-5 row justify-content-md-center">
          <input type="button" value="Cancel" :onclick="cancel" class="btn blue-button mt-2 me-5 px-5 col-2 button" />
          <div class="col-4"></div>
          <input type="submit" value="Update" class="btn yellow-button mt-2 py-2 px-5 col-2 button" />
        </div>
      </div>
  </form>
</template>

<script>
import axios from "axios";
import Company from '../../script/Company.script.js';

let company = new Company();

export default {
  name: "CompanyOwnProfile",
  props: {
    token: {
      type: Array
    }
  },
  data() {
    return{
      companyData: null,
      name: '',
      email: '',
      logo: '',
      path: '',
      message: ''
    }
  },
  async mounted() {
    await axios.get("http://localhost:3000/api/company/" + this.$props.token.id)
        .then(data => {
          this.companyData = data.data;
          this.name = this.companyData.name;
          this.email = this.companyData.email;
          this.logo = this.companyData.logo;
        });
    await axios.post('http://localhost:3000/api/company/get-file', {entity: "company", email: this.email})
        .then(data => {
          this.path = data.data + this.logo;
        })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      let companyUpdateData = company.setData(this.$data);

      if(this.companyData.email == ""){
        return this.message = "Email cannot be empty";
      }

      company.update(this.companyData.id, companyUpdateData)
      .then(() => {
        this.$router.go();
      });
    },
    handleFileUpload(e){
      this.logo = e.target.files[0];
    },
    cancel(){
      this.$router.push('/');
    }
  }
}
</script>

<style scoped src="../../style/profile.css">

</style>
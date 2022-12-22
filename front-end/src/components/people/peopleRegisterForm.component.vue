<template>
  <div class="text-danger">{{message}}</div>
  <form @submit="onSubmit" enctype="multipart/form-data">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <input type="text" v-model="name" id="name" class="form-control form-input mt-4 py-2" placeholder="Name"/>
        </div>
        <div class="col-6">
          <input type="text" v-model="firstName" id="firstName" class="form-control form-input mt-4 py-2" placeholder="First Name"/>
        </div>
        <div class="col-6">
          <input type="password" v-model="password" id="password" class="form-control form-input mt-4 py-2" placeholder="Password" />
        </div>
        <div class="col-6">
          <input type="password" v-model="confirmPassword" id="confirmPassword" class="form-control form-input mt-4 py-2" placeholder="Confirm Password" />
        </div>
        <div class="col-12">
          <input type="email" v-model="email" id="email" class="form-control form-input mt-4 py-2" placeholder="Email">
        </div>
        <div class="col-6">
          <input type="text" v-model="address" id="address" class="form-control form-input mt-4 py-2" placeholder="Address"/>
        </div>
        <div class="col-6">
          <input type="text" v-model="postalCode" id="postalCode" class="form-control form-input mt-4 py-2" placeholder="Postal Code">
        </div>
        <div class="col-6">
          <input type="text" v-model="city" id="city" class="form-control form-input mt-4 py-2" placeholder="City">
        </div>
        <div class="col-6">
          <input type="text" v-model="phone" id="phone" class="form-control form-input mt-4 py-2" placeholder="Phone Number">
        </div>
        <div class="input-group mt-4 mb-4 col-12 row ms-1">
          <label class="input-group-text file-label"  for="File02">
            <input type="file" class="form-control form-input file-input" v-on:change="handlePPUpload" ref="file" id="File02" >
            <font-awesome-icon class="me-5" icon="fa-solid fa-file-arrow-up" />
            Profile Picture</label>
        </div>
        <div class="input-group mt-4 mb-4 col-12 row ms-1">
          <label class="input-group-text file-label"  for="File03">
            <input type="file" class="form-control form-input file-input" v-on:change="handleCVUpload" ref="file" id="File03" >
            <font-awesome-icon class="me-5" icon="fa-solid fa-file-arrow-up" />
            CV</label>
        </div>
        <div>
          <input type="submit" value="Register" class="btn blue-button mt-4">
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import People from "../../script/People.script.js";

let people = new People();

export default {
  name: "PeopleRegister",
  props: {
    stateModel: {
      type: String
    }
  },
  data() {
    return {
      name: '',
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: '',
      postalCode: '',
      city: '',
      message: '',
      profilePicture: '',
      CV: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      let peopleData = people.setData(this.$data);
      if(this.password == this.confirmPassword){

        people.create(peopleData)
            .then(data => { this.$router.push({path: '/login'}); })
            .catch(err => { this.message = err; });

      } else {
        this.message = "Password isn't the same"
      }
    },
    handlePPUpload(e){
      this.profilePicture = e.target.files[0];
    },
    handleCVUpload(e){
      this.CV = e.target.files[0];
    }
  }
}
</script>
<template>
  <form @submit="onSubmit">
      <div class="row">
        <div class="col-5">
          <div class="row">
            <div class="text-danger text-center">{{message}}</div>
            <div class="col-12">
              <img v-if="this.pathPP" :src="this.pathPP" id="profilePicture" alt="No PP" class="img-fluid img-thumbnail rounded d-block image" height="100" width="100"/>
            </div>
            <div class="pt-4 col-6">
              <input type="text" v-model="peopleData.name" id="name" class="form-control form-input" placeholder=""/>
            </div>
            <div class="pt-4 col-6">
              <input type="text" v-model="peopleData.firstName" id="firstName" class="form-control form-input" placeholder="First Name"/>
            </div>
            <div class="pt-4 col-12">
              <input type="email" v-model="peopleData.email" id="email" class="form-control form-input" placeholder=" Email">
            </div>
            <div class="pt-4 col-6">
              <input type="text" v-model="peopleData.address" id="address" class="form-control form-input" placeholder="Address" />
            </div>
            <div class="pt-4 col-6">
              <input type="text" v-model="peopleData.postalCode" id="postalCode" class="form-control form-input" placeholder="Postal Code">
            </div>
            <div class="pt-4 col-6">
              <input type="text" v-model="peopleData.city" id="city" class="form-control form-input" placeholder="City">
            </div>
            <div class="pt-4 col-6">
              <input type="text" v-model="peopleData.phone" id="phone" class="form-control form-input" placeholder="Phone number">
            </div>
            <div class="input-group col-12 mt-3 mb-1 input-file" >
              <label class="input-group-text col-12 py-3 file-label" for="inputGroupFile02">
                <input type="file" class="form-control form-input file-input" v-on:change="handleFileUpload" ref="file" id="inputGroupFile02">
                <font-awesome-icon class="mx-5" icon="fa-solid fa-file-arrow-up" />
                Profile Picture</label>
            </div>
            <div class="input-group col-12 mt-3 mb-1 input-file" >
              <label class="input-group-text col-12 py-3 file-label" for="inputGroupFile02">
                <input type="file" class="form-control form-input file-input" v-on:change="handleCVUpload" ref="file" id="inputGroupFile02">
                <font-awesome-icon class="mx-5" icon="fa-solid fa-file-arrow-up" />
                CV</label>
            </div>
            <div class="row justify-content-md-center mt-2">
              <input type="button" value="Cancel" :onclick="cancel" class="btn yellow-button mt-2 me-5 col-3 button" />
              <div class="col-4"></div>
              <input type="submit" value="Update" class="btn blue-button mt-2 py-2 col-3 button" />
            </div>
          </div>
        </div>
        <div class="col-6 py-2 px-4">
          <iframe class="cv-preview"  :src="this.pathCV" />
        </div>
      </div>
  </form>
</template>

<script>
import People from "../../script/People.script.js";

const people = new People();

export default {
  name: "PeopleOwnProfile",
  props: {
    token: {
      type: Object
    }
  },
  data() {
    return{
      peopleData: {},
      pathPP: '',
      pathCV: '',
      message: ''
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      let peopleUpdateData = people.setData(this.$data);

      if(this.peopleData.email == ""){
        return this.message = "Email cannot be empty";
      }
      people.update(this.peopleData.id, peopleUpdateData.peopleData)
          .then((data) => {
            window.location.href = "/"
          });
    },
    handleFileUpload(e){
      this.peopleData.profilePicture = e.target.files[0];
    },
    handleCVUpload(e){
      this.peopleData.CV = e.target.files[0];
    },
    cancel(){
      this.$router.push('/');
    },
    async initializeData(e) {
      await people.getOneById(this.$props.token.id)
          .then((data) => {
            this.peopleData = data;
          });

      await people.getFile("people", this.peopleData.email)
      .then(data => {
        this.pathCV = data.data + this.peopleData.CV;
        this.pathPP = data.data + this.peopleData.profilePicture
      })

    }
  }
}
</script>

<style scoped src="../../style/profile.css">

</style>
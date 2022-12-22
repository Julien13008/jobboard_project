<template>
  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-6 align-items-center justify-content-center p-2">
      <h1 class="m-4">The perfect match is also professional</h1>
      <h2 class="m-4">Find out which IT and digital job offers match your profile and choose your next squad!</h2>
      <button @click="redirectRegister" class="blue-button col-5 align-self-start btn m-4 p-2">I'm registering</button>
      <button @click="setSeeJobList" class="yellow-button col-5 align-self-end btn m-4 p-2">Start find job now !</button>
    </div>
    <div class="col-6">
      <img src="../../assets/image/logo/big-logo-rounded-crop.png" id="logo" class="img-fluid m-4" alt="...">
    </div>
  </div>
</template>
<script>
export default {
  name: "unloggedHomeContent.component",
  methods: {
    redirectRegister() {
      this.$router.push('/register')
    },
    setSeeJobList() {
      this.$emit('seeJobList');
    }
  }
}
</script>

<style src="../../style/home-content.css"></style>
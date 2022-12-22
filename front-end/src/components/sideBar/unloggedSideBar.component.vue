<template>
    <ul class="col-1 nav flex-column d-flex justify-content-start align-items-center text-center">
      <li class="nav-item p-3">
        <router-link :to="'/'">
          <img src="../../assets/image/logo/job_match_logo.png" class="logo img-fluid" alt="...">
        </router-link>
      </li>
      <li class="nav-item p-3">
        <router-link :to="'/login'">
          <font-awesome-icon class="icon" icon="fa fa-user" />
          <p class="side-subtitle">Log In</p>
        </router-link>
      </li>
    </ul>
</template>
<script>
export default {
  name: "unloggedSideBar.component",
  data() {
    return {
      isLoggeg : true,
    }
  },
}
</script>

<style src="../../style/side-bar.css"></style>
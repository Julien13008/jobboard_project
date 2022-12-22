<template>
  <ul class="col-1 nav flex-column d-flex mt-2 justify-content-between align-items-center text-center">
    <li class="nav-item">
      <router-link :to="'/'">
        <img src="../../assets/image/logo/job_match_logo.png" class="logo img-fluid" alt="...">
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="'/'">
        <font-awesome-icon class="icon" icon="fa-solid fa-house" />
        <p class="side-subtitle">Home</p>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="'/profile'">
        <font-awesome-icon class="icon" icon="fa fa-user" />
        <p class="side-subtitle">Profile</p>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="'/applications'">
        <font-awesome-icon class="icon" icon="fa-solid fa-briefcase" />
        <p class="side-subtitle">Apply</p>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="'/messages'">
        <font-awesome-icon class="icon" icon="fa-solid fa-message" />
        <p class="side-subtitle">Messages</p>
      </router-link>
    </li>
    <li class="nav-item">
        <div :onclick="this.logout" class="logout">
          <font-awesome-icon class="icon" icon="fa-solid fa-right-from-bracket" />
          <p class="side-subtitle">Logout</p>
        </div>
    </li>
  </ul>
</template>

<script>

import User from "../../script/EntityUser.script";

const user = new User();

export default {
  name: "loggedSideBar",
  methods:{
    logout(){
      user.logout();
      window.location.href = "/"
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="col-11">
    <application-content-component/>
  </div>
</template>

<script>
import loggedSideBarComponent from "../components/sideBar/loggedSideBar.component.vue";
import applicationContentComponent from "../components/apply/applicationContent.component.vue";

export default {
  name: "application.view",
  components: {
    loggedSideBarComponent,
    applicationContentComponent
  },
}
</script>
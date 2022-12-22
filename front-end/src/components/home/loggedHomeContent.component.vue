<template>
  <div class="row mt-5">
    <home-job-list-component
        v-bind:ad="selectedAd" v-on:update:ad="selectedAd = $event"
        :searchArray="this.$props.searchArray" />
    <home-job-card-component :ad="selectedAd" :isAllowed="isAllowed" />
  </div>
</template>

<script>
import homeJobListComponent from "./homeJobList.component.vue";
import homeJobCardComponent from "./homeJobCard.component.vue";

export default {
  name: "loggedHomeContent",
  components: {
    homeJobListComponent,
    homeJobCardComponent
  },
  props: ['searchArray', 'isAllowed'],
  watch:{
    '$props.searchArray':{
      handler(val, oldVal){
        this.$props.searchArray = val;
      },
      deep: true
    }
  },
  data() {
    return {
      selectedAd : {}
    }
  }
}
</script>

<style scoped>

</style>
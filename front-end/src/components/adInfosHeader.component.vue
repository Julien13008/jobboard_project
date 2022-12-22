<template>
  <div class="row align-items-center justify-content-between">
    <div class="col-3 icon-text-wrapper container row d-flex align-items-center justify-content-center">
      <font-awesome-icon class="col-1 tiny-icon" icon="fa-solid fa-building" />
      <p class="col-9 mt-3" id="company">{{ companyName }}</p>
    </div>
    <div class="col-3 icon-text-wrapper container row d-flex align-items-center justify-content-center">
      <font-awesome-icon class="col-1 tiny-icon" icon="fa-solid fa-location-dot" />
      <p class="col-9 mt-3" id="location">{{ location }}</p>
    </div>
    <div class="col-3 icon-text-wrapper container row d-flex align-items-center justify-content-center">
      <font-awesome-icon class="col-1 tiny-icon" icon="fa-solid fa-briefcase" />
      <p class="col-9 mt-3" id="contract-info">{{ infos[0] }}, {{ infos[1] }}, {{ infos[2] }}</p>
    </div>
    <div class="col-3 icon-text-wrapper container row d-flex align-items-center justify-content-center">
      <font-awesome-icon class="col-1 tiny-icon" icon="fa-solid fa-money-bill" />
      <p class="col-9 mt-3" id="salary">{{ salary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['companyName', 'location', 'infos', 'salary'],
  name: "adInfosHeader.component"
}
</script>

<style scoped>

</style>
<template>
  <div class="row mt-3" v-if="advertisementData">
    <div class="col-12 form-title"><p>Update advertisement</p></div>
    <div class="col-6 mt-1">
      <input v-model="advertisementData.title" type="text" id="title" class="form-control form-input p-2" placeholder="Application title">
    </div>
    <div class="col-6 mt-1">
      <input v-model="advertisementData.location" type="text" id="title" class="form-control form-input p-2" placeholder="Location">
    </div>
    <div v-for="(item, key) in object" class="col-4 mt-3">
      <select v-model="advertisementData[item.value]" class="form-select grey-select" aria-label="Default select example">
        <option >{{ key }}</option>
        <option v-for="option in item.data" :value="option">{{option}}</option>
      </select>
    </div>
    <div class="form-check form-switch col-4 mt-2 mb-4 d-flex align-items-center justify-content-center">
      <div>
        <label class="form-check-label mt-2" for="part-time">Part Time</label>
        <input v-model="advertisementData.isPartTime" class="form-check-input mt-3" type="checkbox" id="part-time">
      </div>
    </div>
    <div class="form-check form-switch col-4 mt-2 mb-4 d-flex align-items-center justify-content-center">
      <div>
        <label class="form-check-label mt-2" for="remote">Remote</label>
        <input v-model="advertisementData.remote" class="form-check-input mt-3" type="checkbox" id="remote">
      </div>
    </div>
    <div class="form-check form-switch col-4 mt-2 mb-4 d-flex align-items-center justify-content-center">
      <div>
        <label class="form-check-label mt-2" for="active">Active</label>
        <input v-model="advertisementData.active" class="form-check-input mt-3" type="checkbox" id="active">
      </div>
    </div>
    <editor-component
        :adContent="advertisementData.description"
        v-bind:content="content"
        v-on:update:content="content = $event"
    />
    <div class="col-12">
    </div>
  </div>
</template>

<script>
import editorComponent from "./editor.component.vue";
import Advertisement from "../../script/Advertisement.script";
const advertisement = new Advertisement();

export default {
  components: {editorComponent},
  props: ['adId', 'companyId'],
  name: "updateAdForm.component",
  data() {
    return {
      advertisementData: null,
      object: {
        'Type of contract': {value : 'type', data : ['CDD', 'CDI', 'Apprentissage']},
        'Salary':{value : 'salarie', data :  ['15K to 30K', '30K to 45K', '45K to 75K']},
        'Years of experience':{value : 'experience', data :  ['junior', '0 - 2', '3 - 5', '5 - 10', 'senior']}
      },
      content: '',
    }
  },
  mounted() {
    this.getData();
  },
  watch:{
    content(newContent, oldContent) {
      this.advertisementData.description = newContent;
      this.updateData();
    }
  },
  methods: {
    getData() {
     advertisement.getOneById(this.adId).then(res => { this.advertisementData = res; });
    },
    cancel() {

    },
    updateData() {
      advertisement.update(this.adId, this.advertisementData).then(res => { console.log(res) })
    }
  }
}
</script>

<style scoped>

</style>
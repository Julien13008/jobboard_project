<template>
    <job-offer-form-component
        v-bind:jobOfferData="jobOfferData"
        v-on:update:jobOfferData="jobOfferData = $event"
        v-if="companyData" :companyData="companyData"
    />
    <editor-component
        :adContent="''"
        v-bind:content="content"
        v-on:update:content="content = $event"
    />
</template>

<script>
import editorComponent from "./editor.component.vue";
import jobOfferFormComponent from "./jobOfferForm.component.vue";

import Company from "../../script/Company.script";
import Advertisement from "../../script/Advertisement.script";

const company = new Company();
const advertisement = new Advertisement();

export default {
  props : ['id'],
  components: {editorComponent, jobOfferFormComponent},
  name: "jobOffer.component",
  data() {
    return {
      content : '',
      companyData : null,
      jobOfferData: {}
    }
  },
  watch:{
    content(newContent, oldContent) {
      this.jobOfferData.description = newContent;
      this.jobOfferData.companyId = this.id
      advertisement.create(this.jobOfferData).then(res => {
        console.log('Success');
      }).catch(err => {
        console.log('An error has occurred');
      })
    },
  },
  mounted() {
    this.initialize()
  },
  methods : {
    async initialize()  {
      this.companyData = await company.getOneById(this.id);
    }
  }

}
</script>

<style src="../../style/job-offer.css"></style>
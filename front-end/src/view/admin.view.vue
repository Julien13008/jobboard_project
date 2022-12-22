<template>
  <AdminLogin v-if="!this.cookies"/>
  <div v-else class="col-10 row admin-container ms-3 my-2 border-effect">
    <div class="col-12 d-flex justify-content-between">
      <div class="" @click="setActive(oneModel)" v-for="oneModel in this.allModel">
        <button v-if="objectModel[oneModel].value" v-on:click="model = oneModel" className="pt-4 admin-active-button">
          {{ oneModel }}
        </button>
        <button v-else v-on:click="model = oneModel" className="pt-4 admin-inactive-button">{{ oneModel }}</button>
      </div>
    </div>
    <div class="col-12 ">
      <AdminPanel :model="model"/>
    </div>
  </div>
</template>

<script>

import AdminLogin from "../components/admin/adminLogin.component.vue";
import AdminPanel from "../components/admin/admin-panel.component.vue";
import {inject} from "vue";

export default {
  key: 1,
  name: "Admin",
  components: {AdminPanel, AdminLogin},
  inject: ['Cookie_global_key'],
  mounted() {
  },
  props: {
    model: {
      type: String,
      default: "Admin"
    }
  },
  data() {
    return {
      cookies: this.Cookie_global_key,
      allModel: ["Admin", "Company", "People", "Advertisement", "Favori", "JobApplication", "Message"],
      objectModel: {
        "Admin": {value: true},
        "Company": {value: false},
        "People": {value: false},
        "Advertisement": {value: false},
        "Favori": {value: false},
        "JobApplication": {value: false},
        "Message": {value: false}
      }
    }
  },
  watch: {
    objectModel(newContent, oldContent) {
      this.objectModel = newContent;
    }
  },
  methods: {
    setActive(key) {
      for (let model in this.objectModel) {
        if (key === model) {
          this.objectModel[model].value = true;
          console.log(this.objectModel[model].value)
          this.key += 1
        } else {
          console.log('else')
          this.objectModel[model].value = false;

          console.log(this.objectModel[model].value)

          this.key += 1
        }
      }
      console.log(this.objectModel)
    }
  }
}
</script>

<style src="../style/admin.css"></style>
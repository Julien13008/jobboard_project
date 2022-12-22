<template>
  <button data-bs-toggle="modal" data-bs-target="#modalCreate" class="btn blue-button btn-icon my-3"><font-awesome-icon class="icon btn-icon me-2" icon="fa-solid fa-circle-plus" />Add</button>
  <div class="table-responsive table-container">
    <table class="table table-striped">
      <thead>
      <tr>
        <th class="p-4" v-for="key in this.key" scope="col">{{key}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data) in this.allData">
        <td v-for="(oneData , key) in data">
          <p v-if="key === 'createdAt'">--</p>
          <p v-else-if="key === 'updatedAt'">++</p>
          <p v-else>{{oneData}}</p>
        </td>
        <td>
          <button data-bs-toggle="modal" v-on:click="setSoloData(data)" data-bs-target="#modalUpdate" class="btn btn-link"><font-awesome-icon class="blue-item" icon="fa-solid fa-pen" /></button>
        </td>
        <td>
          <button data-bs-toggle="modal" v-on:click="setSoloData(data)" data-bs-target="#modalDelete" class="btn btn-link"><font-awesome-icon class="yellow-item" icon="fa-solid fa-trash" /></button>
        </td>
      </tr>
      </tbody>
    </table>
    <table class="table-striped ">


      <AdminModalCreate :model="this.$props.model" />
      <AdminModalUpdate :dataSend="this.soloData" :model="this.$props.model"/>
      <AdminModalDelete :dataSend="this.soloData" :model="this.$props.model"/>
    </table>
  </div>

</template>

<script>

import AdminModalUpdate from "./admin-modal-update.component.vue";
import AdminModalDelete from "./admin-modal-delete.component.vue";
import AdminModalCreate from "./admin-modal-create.component.vue";
import moment from 'moment';


export default {
  name: "AdminPanel",
  components:{AdminModalCreate, AdminModalUpdate, AdminModalDelete},
  props: {
    model:{
      type: String,
    },
    dataSend:{
      type: Object
    }
  },
  data(){
    return{
      allData: '',
      model: '',
      key: [],
      soloData: '',
      moment: moment
    }
  },
  watch:{
    '$props':{
      handler: function (val, oldVal) {
        this.setData()
      },
      deep: true
    }
  },
  mounted() {
    this.setData()
  },
  methods:{
    async setData() {
      this.key = [];
      const Model = await import(`../../script/${this.$props.model}.script.js`);
      const model = new Model.default;

      model.getAll().then(data => {
        if(data.length > 0){
          for (const dataKey in data[0]) {
            this.key.push(dataKey);
          }
        }
        this.allData = data;
      })
    },
    setSoloData(data){
      this.soloData = data;
    }
  }
}
</script>

<style scoped>

</style>
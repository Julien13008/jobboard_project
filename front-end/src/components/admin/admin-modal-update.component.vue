<template>
  <div class="modal fade" id="modalUpdate" tabindex="-1" aria-labelledby="modalUpdate" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{dataSend.email}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div v-for="(data, index) in this.soloData">
              <label v-if="index === 'createdAt' || index === 'updatedAt'" :for="index" class="form-label d-none">{{index}}</label>
              <label v-else :for="index" class="form-label">{{index}}</label>
              <input v-if="index === 'CV' || index === 'profilePicture' || index === 'logo'" type="file" v-on:change="handleFile($event, index)" ref="file" :id="index" class="form-control" />
              <input v-else-if="index === 'createdAt' || index === 'updatedAt'" class="d-none" v-model="soloData[index]" :id="index" />
              <div v-else-if="index.substring(index.length - 2) === 'Id'">
                <select v-on:change="setSelect($event, index)">
                  <option selected>{{index}}</option>
                  <option v-for="(model, id) in this.relation[index]" :value="model.id">{{model[Object.keys(model)[1]]}}</option>
                </select>
              </div>
              <input v-else type="text" v-model="soloData[index]" :id="index" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn blue-button" data-bs-dismiss="modal">Close</button>
            <button type="submit" v-on:click="onUpdate" class="btn yellow-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminModalUpdate",
  props:{
    dataSend:{
      type: Object
    },
    model:{
      type: String,
    },
  },
  data(){
    return{
      soloData: "",
      relation: [],

    }
  },
  watch:{
    '$props.dataSend':{
      handler: async function (val, oldVal) {
        this.soloData = val;

        const Model = await import(`../../script/${this.$props.model}.script.js`);
        const model = new Model.default;

        this.modelForm = model.schema;
        for (let modelKey in this.modelForm) {
          if(modelKey.substring(modelKey.length - 2) === 'Id'){
            let relation = await this.setRelation(modelKey, this.relation);
            this.relation[modelKey] = relation;
          }
        }

      },
      deep: true
    }
  },
  methods:{
    async onUpdate(e){
      e.preventDefault();

      const Model = await import(`../../script/${this.$props.model}.script.js`);
      const model = new Model.default;


      let dataUpdate = model.setData(this.soloData);

      model.update(dataUpdate.id, dataUpdate)
      .then(data => {
      })
    },
    handleFile(e, index){

      this.soloData[index] = e.target.files[0]
    },
    async setRelation(relationId){

      let script = relationId.substring(0, relationId.length - 2).charAt(0).toUpperCase() + relationId.substring(0, relationId.length - 2).slice(1);

      const Model = await import(`../../script/${script}.script.js`);
      const model = new Model.default;

      let allData = [];

      await model.getAll().then(data => {
        allData = data;
      });

      return allData
    },
    setSelect(e, relation) {
      this.soloData[relation] = e.target.value;
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="modal fade" id="modalCreate" tabindex="-1" aria-labelledby="modalCreate" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create {{this.$props.model}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div>Create form</div>
            <div>{{message}}</div>
            <div v-for="(data, index) in this.modelSchema">
              <label :for="index" class="form-label">{{index}}</label>
              <input v-if="index === 'CV' || index === 'profilePicture' || index === 'logo'" type="file" v-on:change="handleFile($event, index)" ref="file" :id="index" class="form-control" />
              <input v-else-if="index === 'createdAt' || index === 'updatedAt'" class="d-none" v-model="modelSchema[index]" :id="index" />
              <input v-else-if="typeof data == 'boolean'" type="checkbox" v-model="modelSchema[index]"/>
              <div v-else-if="index.substring(index.length - 2) === 'Id'">
                <select v-on:change="setSelect($event, index)">
                  <option selected>{{index}}</option>
                  <option v-for="(model, id) in this.relationArray[index]" :value="model.id">{{model[Object.keys(model)[1]]}}</option>
                </select>
              </div>
              <input v-else type="text" v-model="modelSchema[index]" :id="index" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn blue-button" data-bs-dismiss="modal">Close</button>
            <button type="submit" v-on:click="onCreate" class="btn yellow-button">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminModalCreate",
  props:{
    model:{
      type: String,
    },
  },
  data(){
    return{
      model: "",
      modelSchema: {},
      message : "",
      relationArray: []
    }
  },
  async mounted() {
    const Model = await import(`../../script/${this.$props.model}.script.js`);
    const model = new Model.default;

    this.modelSchema = model.schema;
  },
  watch:{
    '$props.model':{
      handler: async function (val, oldVal) {
        this.model = val;

        const Model = await import(`../../script/${this.$props.model}.script.js`);
        const model = new Model.default;

        this.modelSchema = model.schema;
        for (let modelKey in this.modelSchema) {
          if(modelKey.substring(modelKey.length - 2) === 'Id'){
            let relation = await this.setRelation(modelKey, this.relationArray);
            this.relationArray[modelKey] = relation;
          }
        }
      },
      deep: true
    }
  },
  methods:{
    async onCreate(e){
      e.preventDefault();

      const Model = await import(`../../script/${this.$props.model}.script.js`);
      const model = new Model.default;

      if(this.modelSchema.password){
        this.modelSchema.confirmPassword = this.modelSchema.password;
      }

      let dataCreated = model.setData(this.modelSchema);

      model.create(dataCreated)
          .then(data => {
          })
    },
    handleFile(e, index){
      this.modelSchema[index] = e.target.files[0]
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
      this.modelSchema[relation] = e.target.value;
    }
  }
}
</script>

<style scoped>

</style>
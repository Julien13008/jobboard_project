<template>
  <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDelete" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{dataSend.email}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Do you want to delete {{this.$props.dataSend.email}} ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn blue-button" data-bs-dismiss="modal">Close</button>
          <button type="button" v-on:click="this.onDelete()" class="btn yellow-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminModalDelete",
  props:{
    dataSend:{
      type: Object
    },
    model:{
      type: String,
    },
  },
  methods:{
    async onDelete(){
      const Model = await import(`../../script/${this.$props.model}.script.js`);
      const model = new Model.default;

      await model.delete(this.dataSend.id)
      .then(data => {
      })
    }
  }
}
</script>

<style scoped>

</style>
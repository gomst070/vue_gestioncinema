<template>
  <div v-if="currentSalle" class="edit-form">
    <h4>Modifier une salle</h4>
    <form>
      <div class="form-group">
        <label for="name">Nom de la salle</label>
        <input type="text" class="form-control" id="name" v-model="currentSalle[0].name"/>
      </div>
      <div class="form-group">
       <label for="extra">3D</label>
       <input type="checkbox" class="form-control" id="extra" v-model="currentSalle[0].extra"/>
      </div>
    </form>
    <button type="submit" class="btn btn-success" @click="updateSalle">Valider</button>
    <a href="/salles" style="cursor:pointer; margin-left: 10px;" class="btn btn-danger">Annuler</a>
    <div>
      <br>
      <span style="color: green;">{{ message }}</span><br>
    </div>
  </div>
</template>

<script>
import SalleDataService from "../services/SalleDataService";

export default {
  name: "salle",
  data() {
    return {
      currentSalle: null,
      message: "",
    };
  },
  methods: {
    getSalle(id) {
      SalleDataService.get(id)
        .then(response => {
          this.currentSalle = response.data.salles;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSalle() {
      SalleDataService.update(this.currentSalle[0].id, this.currentSalle[0])
        .then(response => {
          console.log(response.data);
          this.message = 'La salle a été mise à jour!';
        })
        .catch(e => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.message = '';
    this.getSalle(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
}
</style>
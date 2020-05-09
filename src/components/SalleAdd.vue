<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <h4>Ajouter une salle</h4>
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" class="form-control" id="name" required v-model="salle.name" name="name"/>
      </div>
      <div class="form-group">
        <label for="extra">3D</label>
        <input type="checkbox" class="form-control" id="extra" required v-model="salle.extra" name="extra"/>
      </div>

      <button @click="saveSalle" class="btn btn-success">Ajouter</button>
      <a href="/salles" style="margin-left:10px" class="btn btn-danger">Annuler</a>
    </div>

    <div v-else>
      <br>
      <span style="color: green;">{{ message }}</span><br>
      <a href="/salles" class="btn btn-info">Retour</a>
    </div>
  </div>
</template>

<script>
import SalleDataService from "../services/SalleDataService";

export default {
  name: "add-salle",
  data() {
    return {
      salle: {
        id: null,
        name: "",
        extra:"",
        message:"",
      },
      submitted: false
    };
  },
  methods: {
    saveSalle() {
      var data = {
        name: this.salle.name,
        extra: this.salle.extra,
      };

      SalleDataService.create(data)
        .then(response => {
          this.salle.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.message = 'La salle a été ajoutée!'
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newSalle() {
      this.submitted = false;
      this.salle = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <h4>Ajouter un genre de film</h4>
      <div class="form-group">
        <label for="name">Nom du genre</label>
        <input type="text" class="form-control" id="name" required v-model="categorie.name" name="name"/>
      </div>

      <button @click="saveCategorie" class="btn btn-success">Ajouter</button>
      <a href="/categories" style="margin-left:10px" class="btn btn-danger">Annuler</a>
    </div>

    <div v-else>
      <br>
      <span style="color: green;">{{ message }}</span><br>
      <a href="/categories" class="btn btn-info">Retour</a>
    </div>
  </div>
</template>

<script>
import CategorieDataService from "../services/CategorieDataService";

export default {
  name: "add-categorie",
  data() {
    return {
      categorie: {
        id: null,
        name: "",
        message:"",
      },
      submitted: false
    };
  },
  methods: {
    saveCategorie() {
      var data = {
        name: this.categorie.name,
      };

      CategorieDataService.create(data)
        .then(response => {
          this.categorie.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.message = 'Le genre a été ajouté!'
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCategorie() {
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
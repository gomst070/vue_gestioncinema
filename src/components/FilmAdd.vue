<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <h4>Ajouter un film</h4>
      <div class="form-group">
        <label for="title">Titre du film</label>
        <input type="text" class="form-control" id="title" required v-model="film.title" name="title"/>
      </div>
      <div class="form-group">
        <label for="genre">Genre du film</label>
        <!--<input class="form-control" id="id_categorie" required v-model="film.id_categorie" name="id_categorie"/>-->
        <select v-model="film.id_categorie" class="form-control" :required="true">
          <option v-for="(categorie, index) in categories" :key="index" v-bind:value="categorie.id">
            {{categorie.name}}
          </option>
        </select>
      </div>
      <button @click="saveFilm" class="btn btn-success">Ajouter</button>
      <a href="/films" style="cursor:pointer; margin-left: 10px;" class="btn btn-danger">Annuler</a>
    </div>
    <div v-else>
      <br>
      <span style="color:green;">{{ message }}</span><br>
      <a href="/films" class="btn btn-info">Retour</a>
    </div>
  </div>
</template>

<script>
import FilmDataService from "../services/FilmDataService";
import CategorieDataService from "../services/CategorieDataService";

export default {
  name: "add-film",
  data() {
    return {
      film: {
        id: null,
        title: "",
        id_categorie: "",
        message:"",
        
      },
      categories: [],
      submitted: false
    };
  },
  methods: {
    saveFilm() {
      var data = {
        title: this.film.title,
        id_categorie: this.film.id_categorie
      };

      FilmDataService.create(data)
        .then(response => {
          this.film.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.message = 'Le film a été ajouté!'
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveCategories() {
      CategorieDataService.getAll()
        .then(response => {
          this.categories = response.data.categories;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newFilm() {
      this.submitted = false;
      this.film = {};
    }
  },
  mounted() {
      this.retrieveCategories();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
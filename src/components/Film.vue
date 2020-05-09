<template>
  <div v-if="currentFilm" class="edit-form">
    <h4>Modifier un film</h4>
    <form>
      <div class="form-group">
        <label for="title">Titre du film</label>
        <input type="text" class="form-control" id="title" v-model="currentFilm[0].title"/>
      </div>
      <div class="form-group">
        <label for="genre">Genre</label>
        <!--<input type="text" class="form-control" id="id_categorie" v-model="currentFilm[0].genre"/>-->
        <select v-model="currentFilm[0].genre" class="form-control" :required="true">
          <option v-for="(categorie, index) in categories" :key="index" v-bind:value="categorie.id">
            {{categorie.name}}
          </option>
        </select>
      </div>
    </form>
    <button type="submit" class="btn btn-success" @click="updateFilm">Valider</button>
    <a href="/films" style="cursor:pointer; margin-left: 10px;" class="btn btn-danger">Annuler</a>
    <div>
      <br>
      <span style="color: green;">{{ message }}</span><br>
    </div>
  </div>
</template>

<script>
import FilmDataService from "../services/FilmDataService";
import CategorieDataService from "../services/CategorieDataService";

export default {
  name: "film",
  data() {
    return {
      currentFilm: null,
      categories: [],
      message: "",
      i:"",
    };
  },
  methods: {
    getFilm(id) {
      FilmDataService.get(id)
        .then(response => {
          this.currentFilm = response.data.films; 
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateFilm() {
      FilmDataService.update(this.currentFilm[0].id, this.currentFilm[0])
        .then(response => {
          console.log(response.data);
          this.message = 'Le film a été mis à jour!';
          //this.$router.push({ name: "films" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    retrieveCategories() {
      CategorieDataService.getAll()
        .then(response => {
          this.categories = response.data.categories;
          for(this.i=0; this.i < this.categories.length; this.i++){
            if (this.currentFilm[0].genre === this.categories[this.i].name)
            {
              this.currentFilm[0].genre = this.categories[this.i].id;
            }
          } 
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getFilm(this.$route.params.id);
    this.retrieveCategories();
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
}
</style>
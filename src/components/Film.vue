<template>
  <div v-if="currentFilm" class="edit-form">
    <a href="/films">Retour</a>
    <h4>Modifier un film</h4>
    <form>
      <div class="form-group">
        <label for="title">Titre du film</label>
        <input type="text" class="form-control" id="title" v-model="currentFilm[0].title"/>
      </div>
      <div class="form-group">
        <label for="genre">Genre</label>
        <input type="text" class="form-control" id="id_categorie" v-model="currentFilm[0].genre"/>
      </div>
    </form>

    <button type="submit" class="badge badge-success" @click="updateFilm">
      Update
    </button>
    
    <div>
      <br>
      <span style="color: green;">{{ message }}</span><br>
      
    </div>
  </div>
  <div v-else>
    <br />
    <p>Oups.. Petite erreur!</p>
    <a href="/">Back</a>
  </div>
</template>

<script>
import FilmDataService from "../services/FilmDataService";

export default {
  name: "film",
  data() {
    return {
      currentFilm: null,
      message: "",
    };
  },
  methods: {
    getFilm(id) {
      FilmDataService.get(id)
        .then(response => {
          this.currentFilm = response.data.films;
          console.log(response.data);
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

  },
  mounted() {
    this.message = '';
    this.getFilm(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
<template>
  <div v-if="currentSeance" class="edit-form">
    <h4>Modifier une séance</h4>
    <form>
      <div class="form-group">
        <label for="title">Date</label><br>
        <input type="date" class="form-control" id="title" v-model="currentSeance[0].date"/>
      </div>
      <div class="form-group">
        <label for="genre">Heures</label>
        <input type="time" class="form-control" id="id_categorie" v-model="currentSeance[0].heures"/>
      </div>
      <div class="form-group">
        <label for="title">Titre du film</label>
        <select v-model="currentSeance[0].title" class="form-control" :required="true">
          <option v-for="(film, index) in films" :key="index" v-bind:value="film.id">
            {{film.title}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="genre">Salle</label>
        <select v-model="currentSeance[0].name" class="form-control" :required="true">
          <option v-for="(salle, index) in salles" :key="index" v-bind:value="salle.id">
            {{salle.name}}
          </option>
        </select>
      </div>
    </form>

    <button type="submit" class="btn btn-success" @click="updateSeance">Update</button>
    <a href="/seances" style="cursor:pointer; margin-left: 10px;" class="btn btn-danger">Annuler</a>
    <div>
      <br>
      <span style="color: green;">{{ message }}</span><br>
    </div>
  </div>
</template>

<script>
import SeanceDataService from "../services/SeanceDataService";
import FilmDataService from "../services/FilmDataService";
import SalleDataService from "../services/SalleDataService";

export default {
  name: "seance",
  data() {
    return {
      currentSeance: null,
      films:[],
      salles:[],
      i:"",
      j:"",
      message: "",
    };
  },
  methods: {
    getSeance(id) {
      SeanceDataService.get(id)
        .then(response => {
          this.currentSeance = response.data.seances;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSeance() {
      SeanceDataService.update(this.currentSeance[0].id, this.currentSeance[0])
        .then(response => {
          console.log(response.data);
          this.message = 'La séance a été mise à jour!';
          //this.$router.push({ name: "seances" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveFilms() {
      FilmDataService.getAll()
        .then(response => {
          this.films = response.data.films;
          for(this.i=0; this.i < this.films.length; this.i++){
            if (this.currentSeance[0].title === this.films[this.i].title)
            {
              this.currentSeance[0].title = this.films[this.i].id;
            }
          } 
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveSalles() {
      SalleDataService.getAll()
        .then(response => {
          this.salles = response.data.salles;
          for(this.j=0; this.j < this.salles.length; this.j++){
            if (this.currentSeance[0].name === this.salles[this.j].name)
            {
              this.currentSeance[0].name = this.salles[this.j].id;
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
    this.getSeance(this.$route.params.id);
    this.retrieveFilms();
    this.retrieveSalles();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
}
</style>
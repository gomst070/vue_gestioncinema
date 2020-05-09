<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <h4>Ajouter une séance</h4>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" class="form-control" id="date" required v-model="seance.date" name="date"/>
      </div>
      <div class="form-group">
        <label for="heures">Heures</label>
        <input type="time" class="form-control" id="heures" required v-model="seance.heures" name="heures"/>
      </div>
      <div class="form-group">
        <label for="id_film">Film</label>
        <!--<input class="form-control" id="id_film" required v-model="seance.id_film" name="id_film"/>-->
        <select v-model="seance.id_film" class="form-control" :required="true">
          <option v-for="(film, index) in films" :key="index" v-bind:value="film.id">
            {{film.title}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="id_salle">Salle</label>
        <!--<input type="text" class="form-control" id="id_salle" required v-model="seance.id_salle" name="id_salle"/>-->
        <select v-model="seance.id_salle" class="form-control" :required="true">
          <option v-for="(salle, index) in salles" :key="index" v-bind:value="salle.id">
            {{salle.name}}
          </option>
        </select>
      </div>
      <button @click="saveSeance" class="btn btn-success">Ajouter</button>
      <a href="/seances" style="cursor:pointer; margin-left: 10px;" class="btn btn-danger">Annuler</a>
    </div>

    <div v-else>
      <br>
      <span style="color: green;">{{ message }}</span><br>
      <a href="/seances" class="btn btn-info">Retour</a>
    </div>
  </div>
</template>

<script>
import SeanceDataService from "../services/SeanceDataService";
import FilmDataService from "../services/FilmDataService";
import SalleDataService from "../services/SalleDataService";

export default {
  name: "add-seance",
  data() {
    return {
      seance: {
        id: null,
        date: "",
        heures: "",
        id_salle: "",
        id_film: "",
        message:"",
      },
      films: [],
      salles: [],
      submitted: false
    };
  },
  methods: {
    saveSeance() {
      var data = {
        date: this.seance.date,
        heures: this.seance.heures,
        id_salle: this.seance.id_salle,
        id_film: this.seance.id_film
      };

      SeanceDataService.create(data)
        .then(response => {
          this.seance.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.message = 'La seance a été ajoutée!'
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveSalles() {
      SalleDataService.getAll()
        .then(response => {
          this.salles = response.data.salles;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveFilms() {
      FilmDataService.getAll()
        .then(response => {
          this.films = response.data.films;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newSeance() {
      this.submitted = false;
      this.seance = {};
    }
  },
  mounted() {
      this.retrieveSalles();
      this.retrieveFilms();   
  }
};
</script>

<style>
.submit-form {
  max-width: 400px;
}
</style>
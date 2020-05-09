<template>
  <div class="list row">
    <div class="col-md-8">
      <a href="/oldseance" class="btn btn-info">Voir les séances archivées</a><br />
      <a style="margin-top:.5rem;" href="/addseance" class="btn btn-success">Ajouter une nouvelle séance</a>
    </div>
    <div style="margin-top: 10px" class="col-md-6">
      <h4>Listes des séances</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(seance, index) in seances" :key="index" @click="setActiveSeance(seance, index)">
          <label>Date:</label>
          {{seance.date}}<br />
          <label>Heures:</label>
          {{seance.heures}}<br />
          <label>Film:</label>
          {{seance.title}}<br />
          <label>Salle:</label>
          {{ seance.name }}
        </li>
      </ul>
    </div>
    <div style="margin-top:35px; margin-bottom: 25px;" class="col-md-6">
      <div v-if="currentSeance">
        <h4>Séance</h4>
        <div>
          <label><strong>Date:</strong></label>  
          {{ currentSeance.date }}
        </div>
        <div>
          <label><strong>Heures:</strong></label>
          {{ currentSeance.heures }}
        </div>
        <div>
          <label><strong>Titre:</strong></label>  
          {{ currentSeance.title }}
        </div>
        <div>
          <label><strong>Salle:</strong></label>
          {{ currentSeance.name }}
        </div>
        <a class="btn btn-warning" :href="'/seances/' + currentSeance.id">Modifier</a>
        <a style="margin-left: 10px; color:white;" class="btn btn-danger" @click="deleteSeance">Supprimer</a>
      </div>
      <div v-else>
        <br />
        <p>Cliquez sur une séance pour voir les détails.</p>
      </div>
    </div>
    <div class="col-md-8" style="margin-top: 1rem;">
    </div>
  </div>
</template>

<script>
import SeanceDataService from "../services/SeanceDataService";

export default {
  name: "seances-list",
  data() {
    return {
      seances: [],
      currentSeance: null,
      currentIndex: -1,
    };
  },
  methods: {
    retrieveSeances() {
      SeanceDataService.getAll()
        .then(response => {
          this.seances = response.data.seances;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    setActiveSeance(seance, index) {
      this.currentSeance = seance;
      this.currentIndex = index;
    },

    deleteSeance() {
      SeanceDataService.delete(this.currentSeance.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveSeances();
      this.currentSeance = null;
      this.currentIndex = -1;
    },
    
  },
  mounted() {
    this.retrieveSeances();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 850px;
  margin: auto;
}

.list-group-item.active{
        background-color: #0092ac !important;
        border-color:  #0092ac !important;
}
</style>
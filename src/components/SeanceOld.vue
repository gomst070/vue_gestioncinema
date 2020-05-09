<template v-on:click="currentSeance = null">
  <div class="list row">
    <div class="col-md-6">
      <a href="/seances" class="btn btn-info">Retour</a><br/>
      <h4 style="margin-top:1rem">Listes des séances archivées</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(seance, index) in seancesold" :key="index" @click="setActiveSeance(seance, index)">
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
    <div style="margin-top:3.3rem" class="col-md-6">
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
      </div>
      
      <div v-else>
        <br />
        <p>Cliquez sur une séance pour voir les détails.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SeanceDataService from "../services/SeanceDataService";

export default {
  name: "seances-list",
  data() {
    return {
      seancesold: [],
      currentSeance: null,
      currentIndex: -1,
    };
  },
  methods: {
    retrieveSeances() {
      SeanceDataService.getAllOld()
        .then(response => {
          this.seancesold = response.data.seancesold;
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
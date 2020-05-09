<template>
  <div class="list row">
    <div class="col-md-8">
      <a href="/addsalle" class="btn btn-success">Ajouter une nouvelle salle</a>
    </div>
    <div style="margin-top: 10px" class="col-md-6">
      <h4>Listes des salles</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(salle, index) in salles" :key="index" @click="setActiveSalle(salle, index)">
          {{salle.name}}
        </li>
      </ul>
    </div>
    <div style="margin-top:35px; margin-bottom: 25px;" class="col-md-6">
      <div v-if="currentSalle">
        <h4>Salle</h4>
        <div>
          <label><strong>Nom de la salle :</strong></label>  
          {{ currentSalle.name }}
        </div>
        <div>
          <label><strong>3D :</strong></label>
          <span v-if="currentSalle.extra"> Oui</span>
          <span v-else> Non</span>
        </div>
        <div>
          <label><strong>Description:</strong></label> 
          <p style="text-align: justify">Nulla sed facilisis magna. Mauris tempus efficitur lorem, ut convallis felis convallis sit amet. Duis lorem nunc, rhoncus nec sollicitudin et, porttitor eu dui.</p>
        </div>

        <a class="btn btn-warning" :href="'/salles/' + currentSalle.id">
          Modifier
        </a>

        <a style="cursor:pointer; margin-left: 10px; color:white" class="btn btn-danger" @click="deleteSalle">
          Supprimer
        </a>
      </div>
      
      <div v-else>
        <br />
        <p>Cliquez sur une salle pour voir les détails.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SalleDataService from "../services/SalleDataService";

export default {
  name: "salles-list",
  data() {
    return {
      salles: [],
      currentSalle: null,
      currentIndex: -1,
    };
  },
  methods: {
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

    setActiveSalle(salle, index) {
      this.currentSalle = salle;
      this.currentIndex = index;
    },

    deleteSalle() {
      SalleDataService.delete(this.currentSalle.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveSalles();
      this.currentSalle = null;
      this.currentIndex = -1;
    },
    
  },
  mounted() {
    this.retrieveSalles();
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
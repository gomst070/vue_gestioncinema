<template>
  <div class="list row">
    <div class="col-md-8">
      <a href="/addcategorie" class="btn btn-success">Ajouter un nouveau genre de film</a>
    </div>
    <div style="margin-top: 10px" class="col-md-6">
      <h4>Listes des genres de films</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(categorie, index) in categories" :key="index" @click="setActiveCategorie(categorie, index)">
          {{ categorie.name }}
        </li>
      </ul>
    </div>
    <div style="margin-top:35px; margin-bottom: 25px;" class="col-md-6">
      <div v-if="currentCategorie">
        <h4>Genre du film</h4>
        <div>
          <label><strong>Nom du genre :</strong></label>  
          {{ currentCategorie.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> 
          <p style="text-align: justify">Nulla sed facilisis magna. Mauris tempus efficitur lorem, ut convallis felis convallis sit amet.</p>
        </div>
        <a class="btn btn-warning" :href="'/categories/' + currentCategorie.id">Modifier</a>
        <a style="cursor:pointer; margin-left: 10px; color:white" class="btn btn-danger" @click="deleteCategorie">Supprimer</a>
      </div>
      
      <div v-else>
        <br />
        <p>Cliquez sur un genre pour voir les détails.</p>
      </div>
    </div>
  </div>
</template>

<script>
import CategorieDataService from "../services/CategorieDataService";

export default {
  name: "categories-list",
  data() {
    return {
      categories: [],
      currentCategorie: null,
      currentIndex: -1,
    };
  },
  methods: {
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

    setActiveCategorie(categorie, index) {
      this.currentCategorie = categorie;
      this.currentIndex = index;
    },

    deleteCategorie() {
      CategorieDataService.delete(this.currentCategorie.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveCategories();
      this.currentSalle = null;
      this.currentIndex = -1;
    },
    
  },
  mounted() {
    this.retrieveCategories();
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
<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recherchez un film" v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Lancer
          </button>
        </div>
      </div>
      <a href="/addfilm" class="btn btn-success">Ajouter un nouveau film</a>
    </div>
    <div style="margin-top: 10px" class="col-md-6">
      <h4>Listes des films</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(film, index) in films"
            :key="index" 
            @click="setActiveFilm(film, index)">
            {{ film.title }}
        </li>
      </ul>
    </div>
    <div style="margin-top:35px; margin-bottom: 25px;" class="col-md-6">
      <div v-if="currentFilm">
        <h4>Détails du film</h4>
        <div>
          <label><strong>Titre:</strong></label>  
          {{ currentFilm.title }}
        </div>
        <div>
          <label><strong>Genre:</strong></label>
          {{ currentFilm.genre }}
        </div>
        <div>
          <label><strong>Description:</strong></label> 
          <p style="text-align: justify">Nulla sed facilisis magna. Mauris tempus efficitur lorem, ut convallis felis convallis sit amet. Duis lorem nunc, rhoncus nec sollicitudin et, porttitor eu dui. Nullam posuere dolor nulla, sed sollicitudin risus dapibus eget. In hac habitasse platea dictumst. Ut suscipit magna quis tortor vehicula malesuada. Vivamus sed lacinia risus.</p>
        </div>

        <a class="btn btn-warning" :href="'/films/' + currentFilm.id">Modifier</a>
        <button style="margin-left: 10px;" class="btn btn-danger" @click="deleteFilm">Supprimer</button>
      </div>
      <div v-else>
        <br />
        <p>Cliquez sur un film pour voir les détails.</p>
      </div>
    </div>
  </div>
</template>

<script>
import FilmDataService from "../services/FilmDataService";

export default {
  name: "films-list",
  data() {
    return {
      films: [],
      currentFilm: null,
      currentIndex: -1,
      title:"",
    };
  },
  methods: {
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

    setActiveFilm(film, index) {
      this.currentFilm = film;
      this.currentIndex = index;
    },
  
    searchTitle() {
      FilmDataService.findByTitle(this.title)
        .then(response => {
          this.films = response.data.films;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteFilm() {
      FilmDataService.delete(this.currentFilm.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveFilms();
      this.currentFilm = null;
      this.currentIndex = -1;
    }, 
  },
  mounted() {
    this.retrieveFilms();
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
<template>
  <div v-if="currentCategorie" class="edit-form">
    <h4>Modifier un genre de film</h4>
    <form>
      <div class="form-group">
        <label for="name">Nom du genre de film</label>
        <input type="text" class="form-control" id="name" v-model="currentCategorie[0].name"/>
      </div>
    </form>
    <button type="submit" class="btn btn-success" @click="updateCategorie">Valider</button>
    <a href="/categories" style="cursor:pointer; margin-left: 10px;" class="btn btn-danger">Annuler</a>
    <div>
      <br>
      <span style="color: green;">{{ message }}</span>
    </div>
  </div>
</template>

<script>
import CategorieDataService from "../services/CategorieDataService";

export default {
  name: "categorie",
  data() {
    return {
      currentCategorie: null,
      message: "",
    };
  },
  methods: {
    getCategorie(id) {
      CategorieDataService.get(id)
        .then(response => {
          this.currentCategorie = response.data.categories;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCategorie() {
      CategorieDataService.update(this.currentCategorie[0].id, this.currentCategorie[0])
        .then(response => {
          console.log(response.data);
          this.message = 'Le genre a été mis à jour!';
        })
        .catch(e => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.message = '';
    this.getCategorie(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
}
</style>
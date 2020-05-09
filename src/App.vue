<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/home" class="nav-link">Accueil</a>
        </li>
        <li class="nav-item">
          <a href="/films" class="nav-link">Films</a>
        </li>
        <li class="nav-item">
          <a href="/seances" class="nav-link">Séances</a>
        </li>
        <li class="nav-item">
          <a href="/salles" class="nav-link">Salles</a>
        </li>
        <li class="nav-item">
          <a href="/categories" class="nav-link">Genres</a>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
  .navbar{
    background-color: #0092ac;
  }
  .nav-item > a{
    color: white !important;
    font-size: 1.2rem;
  }

  .nav-item > a:hover{
    text-decoration: underline;
  }

  .container {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .list{
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
</style>
<script>
export default {
  name: 'app'
}
</script>
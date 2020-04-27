<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/home" class="navbar-brand">steven</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/films" class="nav-link">Films</a>
        </li>
        <li class="nav-item">
          <a href="/seances" class="nav-link">Séances</a>
        </li>
        <li class="nav-item">
          <a href="/categories" class="nav-link">Genres</a>
        </li>
        <li class="nav-item">
          <a href="/salles" class="nav-link">Salles</a>
        </li>
        <li class="nav-item">
          <a href="/users" class="nav-link">Utilisateurs</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
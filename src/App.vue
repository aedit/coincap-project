<template>
  <nav>
    <h3>CoinCap</h3>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
body {
  background-color: #2c3e50
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ccc;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ccc;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

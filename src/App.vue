<template>
  <div id="app">
    <Nav />

    <router-view></router-view>

    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Nav,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-block-start: 20px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  block-size: 100vh;
}

h1 {
  font-size: 2.5rem;
  margin-block-end: 20px;
}

h1 .bi {
  color: #42b983;
}
</style>

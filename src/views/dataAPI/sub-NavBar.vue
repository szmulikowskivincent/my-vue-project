<template>
    <nav class="sub-navbar">
      <ul class="nav-links">
        <li><a href="https://backend-tic.devapp.be/docs/api#/operations/tracks.store" target="_blank" rel="noopener noreferrer">Documentation API</a></li>
        <li><router-link to="/corbeille">Corbeille</router-link></li>
        <li><a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Documentation Vue JS</a></li>
        <li><a href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" target="_blank" rel="noopener noreferrer">Documentation Bootstrap</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'SubNavbar',
  };
  </script>
  
  <style scoped>
  .sub-navbar {
    background-color: #f8f9fa;
    padding: 10px;
  }
  
  .nav-links {
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-links li {
    margin: 0 10px;
  }
  
  .nav-links a,
  .nav-links router-link {
    text-decoration: none;
    color: #0056b3;
    font-size: 16px;
  }
  
  .nav-links a:hover,
  .nav-links router-link:hover {
    color: #0056b3;
  }
  </style>
  
 
  
<template>
    <div>
      <!-- Bouton repositionné pour être au-dessus du footer -->
      <button
        class="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow"
        @click="redirect"
        style="position: fixed; bottom: 120px; right: 20px; z-index: 9999; opacity: 0.9;"
      >
        <i class="bi bi-arrow-right-circle me-2"></i> Go to All Data
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "RedirectButton",
    methods: {
      redirect() {
        window.location.href = "http://localhost:5173/allData";
      },
    },
  };
  </script>
  
  <style>
  /* Animation et amélioration du design */
  button:hover {
    opacity: 1;
    transform: translateY(-5px); /* Effet de levée au survol */
    transition: all 0.3s ease-in-out;
  }
  </style>
  
  
  
  
  
<template>
  <div style=" margin-left: 200px; margin-top: -810px;">
    <ul class="genres-list">
      <li v-for="(genre, index) in genres" :key="genre.id" :class="'genre-' + (index % 5)">{{ genre.name }}</li>
    </ul>
    <br />
    <button style="margin-left: -750px;" hidden @click="prevPage" :disabled="currentPage === 1">Précédent</button>
    <button @click="nextPage" hidden :disabled="currentPage === totalPages">Suivant</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      genres: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  created() {
    this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await axios.get('https://backend-tic.devapp.be/api/genres', {
          headers: {
           'Authorization': `Bearer 3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692`
          },
          params: {
            page: this.currentPage,
          },
        });
        this.genres = response.data.data;
        this.totalPages = response.data.meta.last_page;
      } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchGenres();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchGenres();
      }
    },
  },
};
</script>

<style scoped>
.genres-list {
  display: flex;
  overflow-x: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.genres-list li {
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  color: white;
  flex: 0 0 auto;
}
.genre-0 { background-color: #442727; } 
.genre-1 { background-color: #04350d; } 
.genre-2 { background-color: #020827; } 
.genre-3 { background-color: #50042d; } 
.genre-4 { background-color: #5f2b04; }
</style>


  
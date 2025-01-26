<template>
  <div class="container mt-5">

    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement...</span>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      Erreur lors du chargement des artistes : {{ error.message }}
    </div>

    <div v-if="!loading && !error">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="artisteSelect" class="form-label"></label>
            <select style="margin-block-start: -210px; margin-left: -25px;" class="form-select" id="artisteSelect"
              v-model="selectedArtiste" @change="openModal">
              <option value="">--🎧 Sélectionner un artiste --</option>
              <option v-for="artiste in artistes" :key="artiste.id" :value="artiste.id">
                🎧 {{ artiste.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
      style="display: block; margin-left: 15px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedArtisteData.name }}</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center mb-3">
              <div class="avatar"
                style="width: 80px; height: 80px; background-color: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px;">
                {{ getInitials(selectedArtisteData.name) }}
              </div>
            </div>
            <p><strong>Nombre de concerts:</strong> {{ randomConcerts }}</p>
            <p><strong>Nombre de fans:</strong> {{ randomFans }}</p>
            <p><strong>Compagnie de disque:</strong> {{ randomRecordLabel }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      artistes: [],
      loading: true,
      error: null,
      selectedArtiste: '',
      showModal: false,
      selectedArtisteData: null,
      randomConcerts: 0,
      randomFans: 0,
      randomRecordLabel: '',
    };
  },
  mounted() {
    this.fetchArtistes();
  },
  methods: {
    async fetchArtistes() {
      try {
        const response = await axios.get('https://backend-tic.devapp.be/api/artists/all', {
          headers: {
            'Authorization': `Bearer 3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692`
          },
        });
        this.artistes = response.data;
        this.loading = false;
      } catch (err) {
        this.error = err;
        this.loading = false;
      }
    },
    openModal() {
      const artiste = this.artistes.find(a => a.id === this.selectedArtiste);
      if (artiste) {
        this.selectedArtisteData = artiste;
        this.randomConcerts = this.getRandomInt(10, 100); 
        this.randomFans = this.getRandomInt(1000, 100000); 
        this.randomRecordLabel = this.getRandomRecordLabel();
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.selectedArtisteData = null;
    },
    getInitials(name) {
      const parts = name.split(' ');
      return parts.map(part => part[0].toUpperCase()).join('');
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomRecordLabel() {
      const labels = ['Universal Music', 'Sony Music', 'Warner Music', 'EMI', 'Atlantic Records'];
      return labels[Math.floor(Math.random() * labels.length)];
    }
  },
};
</script>

<style scoped>
.container {
  margin-inline-start: 25px;
}

.avatar {
  font-weight: bold;
  font-size: 24px;
}
</style>

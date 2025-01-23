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
            <select style="margin-block-start: 80px;" class="form-select" id="artisteSelect" v-model="selectedArtiste">
              <option value="">--🎧 Sélectionner un artiste --</option>
              <option v-for="artiste in artistes" :key="artiste.id" :value="artiste.id">
                🎧 {{ artiste.name }}
              </option>
            </select>
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
    };
  },
  mounted() {
    this.fetchArtistes();
  },
  methods: {
    async fetchArtistes() {
      try {
        const response = await axios.get('https://backend-tic.devapp.be/public/api/artists/all', {
          headers: {
            'Authorization': `Bearer 409|eIkidCLVUYZjrOwzzQCX7AOP5nvKbIFurTJqOz8v7bf2f0dc`,
          },
        });
        this.artistes = response.data;
        this.loading = false;
      } catch (err) {
        this.error = err;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-inline-start: 25px;
}
</style>
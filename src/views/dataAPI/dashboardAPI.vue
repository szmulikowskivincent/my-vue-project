<template>
  <div class="background-container">
    <SelectAllArtistes />
    <div class="container mt-5">
      <h1 style="margin-inline-start: -2090px; margin-block-start: -150px;" class="text-center">
        <i class="bi bi-house-door"></i> Dashboard API
      </h1>
      <div class="row">
        <div class="col-md-12">
          <Albums />
          <postAlbums />
          <RechercheAlbumsID />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Albums from '../dataAPI/albums.vue';
import SelectAllArtistes from '../dataAPI/selectAllArtistes.vue';
import PostAlbums from './postAlbums.vue';
import RechercheAlbumsID from '../dataAPI/rechercheAlbumsID.vue';

export default {
  components: {
    Albums,
    SelectAllArtistes,
    PostAlbums,
    RechercheAlbumsID,
  },
};
</script>

<style scoped>
.background-container {
  background-image: url('https://img.freepik.com/premium-vector/harp-neon-icon-music-glowing-sign-musical-instrument-concept-vector-illustration-sound-recording-studio-design-advertising-signboards-vocal-studio_98480-2631.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.75;
  inline-size: 100%;
  block-size: 100vh;
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.container {
  position: relative;
  z-index: 1;
}
</style>
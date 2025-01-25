<template>
    <div class="background-container">
      <img src="https://jouretnuit.paris/wp-content/uploads/2016/10/spotify-banniere.png" />
      <div class="container my-5">
        <h1 class="text-center mb-4">
          <i class="bi bi-archive me-2"></i>
          All Data
        </h1>
  
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
  
        <div v-else>
          <div v-for="(data, key) in allData" :key="key" class="mb-5 text-start">
            <h2 class="mb-3 text-capitalize">
              <i :class="icons[key]" class="me-2"></i>{{ key }}
            </h2>
            <div v-if="data && data.length > 0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th v-for="header in getHeaders(data)" :key="header">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-for="header in getHeaders(data)" :key="header">
                      {{ item[header] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="text-danger">
              <p>No data available for {{ key }}.</p>
            </div>
          </div>
        </div>
      </div>
  
      <div
        class="navigation-buttons"
        style="position: fixed; bottom: 120px; left: 20px; z-index: 9999; display: flex; gap: 10px;"
      >
        <button class="btn btn-secondary btn-lg" @click="goToPreviousPage">
          Previous
        </button>
        <button class="btn btn-primary btn-lg" @click="goToDashboard">
          Go to Dashboard
        </button>
        <button class="btn btn-secondary btn-lg" @click="goToNextPage">
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AllData",
    data() {
      return {
        loading: true,
        allData: {},
        icons: {
          albums: "bi bi-disc",
          artists: "bi bi-person",
          genres: "bi bi-music-note",
          "media-types": "bi bi-collection-play",
          tracks: "bi bi-file-music",
        },
      };
    },
    methods: {
      async fetchData() {
        const urls = {
          albums: "https://backend-tic.devapp.be/api/albums",
          artists: "https://backend-tic.devapp.be/api/artists",
          genres: "https://backend-tic.devapp.be/api/genres",
          "media-types": "https://backend-tic.devapp.be/api/media-types",
          tracks: "https://backend-tic.devapp.be/api/tracks",
        };
  
        try {
          const requests = Object.entries(urls).map(async ([key, url]) => {
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer 3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692`,
              },
            });
            return [key, Array.isArray(response.data) ? response.data : []];
          });
  
          const results = await Promise.all(requests);
          this.allData = Object.fromEntries(results);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          this.loading = false;
        }
      },
      getHeaders(data) {
        if (!Array.isArray(data) || data.length === 0) {
          return [];
        }
        return Object.keys(data[0]);
      },
  
      goToPreviousPage() {
        window.location.href = "http://localhost:5173/beforePage"; 
      },
      goToDashboard() {
        window.location.href = "http://localhost:5173/dashboardAPI";
      },
      goToNextPage() {
        window.location.href = "http://localhost:5173/nextPage"; 
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  
  <style>
  .background-container {
    background-image: url("https://img.freepik.com/premium-vector/harp-neon-icon-music-glowing-sign-musical-instrument-concept-vector-illustration-sound-recording-studio-design-advertising-signboards-vocal-studio_98480-2631.jpg");
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
  
  img {
    inline-size: 2480px;
    block-size: auto;
  }
  
  .navigation-buttons {
    position: fixed;
    bottom: 120px; 
    left: 20px;
    z-index: 9999;
    display: flex;
    gap: 10px;
  }
  
  .navigation-buttons button {
    padding: 10px 20px;
    transition: all 0.3s ease-in-out;
  }
  
  .navigation-buttons button:hover {
    transform: translateY(-5px); 
    opacity: 1;
  }
  </style>
  
  
  
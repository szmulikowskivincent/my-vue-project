<template>
  <div class="background-container">
    <div class="container-fluid my-5">
      <div class="d-flex align-items-center justify-content-center mb-4" style="margin-left: -35px;">
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/224/002/original/spotify-3d-logo-free-png.png"
          alt="Spotify Logo"
          width="3%"
          class="ms-3"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <h1 class="mb-0">
          <i class="bi bi-archive me-2"></i>
          All Data
        </h1>
      </div>

      <div class="d-flex justify-content-center align-items-center mb-4">
        <button class="btn btn-secondary me-3" :disabled="historyIndex <= 0" @click="goBack">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <button class="btn btn-secondary" :disabled="historyIndex >= searchHistory.length - 1" @click="goForward">
          Forward <i class="bi bi-arrow-right"></i>
        </button>
      </div>

      <div class="mb-4 position-relative">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          @focus="showAutocomplete = true"
          @blur="hideAutocomplete"
          type="text"
          class="form-control"
          placeholder="🔎 Search by Albums, Artists, Genres, Types, Tracks ..."
        />

        <ul v-if="showAutocomplete && filteredSuggestions.length" class="list-group position-absolute w-100" style="z-index: 10; top: 100%;">
          <li
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
            @mousedown="useSuggestion(suggestion)"
          >
            {{ suggestion }}
            <button class="btn btn-danger btn-sm" @click.stop="removeFromHistory(suggestion)">
              <i class="bi bi-x"></i>
            </button>
          </li>
        </ul>
      </div>

      <div v-for="(data, key) in filteredData" :key="key" class="section mb-5">
        <h2 class="text-center mb-3">
          <i :class="icons[key]" class="me-2"></i>
          {{ capitalize(key) }}
        </h2>

        <div v-if="data && data.length > 0">
          <table :class="'table ' + getSectionColorClass(key)" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th
                  v-for="header in getHeaders(data)"
                  :key="header"
                  :style="{ width: getColumnWidth(header) }"
                  style="padding: 12px; text-align: left; background-color: #f8f9fa; border: 1px solid #ddd;"
                >
                  <i :class="getIconClass(header)" class="me-2"></i>
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index" :class="{'bg-light': index % 2 === 1}">
                <td
                  v-for="header in getHeaders(data)"
                  :key="header"
                  :style="{ width: getColumnWidth(header) }"
                  style="padding: 10px; text-align: left; border: 1px solid #ddd;"
                >
                  {{ item[header] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-danger">
          <p>No data available for {{ key }}.</p>
        </div>

        <hr class="section-divider my-4" />
      </div>
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
      searchQuery: "",
      searchHistory: [],
      historyIndex: -1,
      showAutocomplete: false,
      icons: {
        albums: "bi bi-disc",
        artists: "bi bi-person",
        genres: "bi bi-music-note",
        "media-types": "bi bi-collection-play",
        tracks: "bi bi-file-music",
      },
    };
  },
  computed: {
    filteredData() {
      if (!this.searchQuery || !this.icons[this.searchQuery]) return this.allData;

      const query = this.searchQuery.toLowerCase();
      const categoryData = this.allData[query];

      return { [query]: categoryData };
    },
    filteredSuggestions() {
      if (!this.searchQuery) return this.searchHistory;

      const query = this.searchQuery.toLowerCase();
      return this.searchHistory.filter((item) =>
        item.toLowerCase().startsWith(query)
      );
    },
  },
  methods: {
    capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async fetchData() {
      const urls = {
        albums: "https://backend-tic.devapp.be/api/albums/all",
        artists: "https://backend-tic.devapp.be/api/artists/all",
        genres: "https://backend-tic.devapp.be/api/genres/all",
        "media-types": "https://backend-tic.devapp.be/api/media-types/all",
        tracks: "https://backend-tic.devapp.be/api/tracks/all",
      };

      try {
        const requests = Object.entries(urls).map(async ([key, url]) => {
          const response = await axios.get(url, {
            headers: {
              Authorization:
                "Bearer 3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692",
            },
          });
          return [key, Array.isArray(response.data) ? response.data : [response.data]];
        });

        const results = await Promise.all(requests);
        this.allData = Object.fromEntries(results);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(
          "Une erreur est survenue lors de la récupération des données. Vérifiez les logs pour plus de détails."
        );
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      if (
        this.icons[this.searchQuery] &&
        this.searchQuery !== this.searchHistory[this.historyIndex]
      ) {
        if (this.historyIndex < this.searchHistory.length - 1) {
          this.searchHistory = this.searchHistory.slice(0, this.historyIndex + 1);
        }
        this.searchHistory.push(this.searchQuery);
        this.historyIndex = this.searchHistory.length - 1;
        localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
      }
    },
    goBack() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.searchQuery = this.searchHistory[this.historyIndex];
      }
    },
    goForward() {
      if (this.historyIndex < this.searchHistory.length - 1) {
        this.historyIndex++;
        this.searchQuery = this.searchHistory[this.historyIndex];
      }
    },
    useSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.showAutocomplete = false;
    },
    hideAutocomplete() {
      setTimeout(() => (this.showAutocomplete = false), 100);
    },
    removeFromHistory(suggestion) {
      this.searchHistory = this.searchHistory.filter(
        (item) => item !== suggestion
      );
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
    loadSearchHistory() {
      const history = localStorage.getItem("searchHistory");
      if (history) {
        this.searchHistory = JSON.parse(history);
        this.historyIndex = this.searchHistory.length - 1;
      }
    },
    getHeaders(data) {
      if (!Array.isArray(data) || data.length === 0) {
        return [];
      }
      return Object.keys(data[0]);
    },
    getSectionColorClass(key) {
      const colorClasses = {
        albums: "table-success",
        artists: "table-info",
        genres: "table-warning",
        "media-types": "table-dark",
        tracks: "table-danger",
      };
      return colorClasses[key] || "table-light";
    },
    getIconClass(header) {
      const icons = {
        name: "bi bi-person",
        title: "bi bi-music-note",
        genre: "bi bi-collection",
        album: "bi bi-disc",
        duration: "bi bi-clock",
        type: "bi bi-folder",
      };
      return icons[header.toLowerCase()] || "bi bi-info-circle";
    },
    getColumnWidth(header) {
      const widthMapping = {
        id: "50px",
        name: "200px",
        title: "300px",
        genre: "150px",
        album: "250px",
        duration: "100px",
        type: "150px",
        default: "150px",
      };

      return widthMapping[header.toLowerCase()] || widthMapping.default;
    },
  },
  mounted() {
    this.fetchData();
    this.loadSearchHistory();
  },
};
</script>

<style>
.background-container {
  background-color: #f1f1f1;
  min-block-size: 100vh;
  padding: 20px;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.section-divider {
  border: 1px solid #ddd;
  opacity: 0.6;
}

.table {
  table-layout: fixed;
  word-wrap: break-word;
}

th,
td {
  padding: 12px;
  text-align: start;
  border: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}
</style>











  
  
  
  
  
  
  
  
  
  
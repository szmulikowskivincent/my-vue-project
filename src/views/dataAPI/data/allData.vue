<template>
    <div class="background-container">
      <div class="container-fluid my-5">
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
          <div v-for="(data, key) in allData" :key="key" class="mb-5">
            <h2 class="text-center mb-3">
              <i :class="icons[key]" class="me-2"></i>
              {{ capitalize(key) }}
            </h2>
  
            <div v-if="data && data.length > 0">
              <table :class="'table ' + getSectionColorClass(key)" style="width: 100%; border-collapse: collapse;">
                <thead :class="getSectionColorClass(key)">
                  <tr>
                    <th v-for="header in getHeaders(data)" :key="header" style="padding: 12px; text-align: center; background-color: #f8f9fa; border: 1px solid #ddd;">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data" :key="index">
                    <td v-for="header in getHeaders(data)" :key="header" style="padding: 10px; text-align: center; border: 1px solid #ddd;">
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
          
          <!-- Button to export data to Excel -->
          <button class="btn btn-success" @click="exportToExcel">Export to Excel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import * as XLSX from 'xlsx'; // Import xlsx for Excel export
  
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
      // Capitalize first letter of string
      capitalize(str) {
        if (!str) return ''; // Check if string is empty
        return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter
      },
  
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
  
            return [key, Array.isArray(response.data) ? response.data : [response.data]];
          });
  
          const results = await Promise.all(requests);
          this.allData = Object.fromEntries(results);
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Error fetching data. Please check the console for more information.");
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
  
      getSectionColorClass(key) {
        const colorClasses = {
          albums: "table-success",
          artists: "table-info",
          genres: "table-warning",
          "media-types": "table-dark",
          tracks: "table-danger",
        };
        return colorClasses[key] || "table-light"; // Default to light if no section color is set
      },
  
      // Export data to Excel
      exportToExcel() {
        const wsData = [];
  
        Object.keys(this.allData).forEach(key => {
          const data = this.allData[key];
          const headers = this.getHeaders(data);
          const rows = data.map(item => headers.map(header => item[header]));
  
          // Add header and data to worksheet
          wsData.push([key]); // Title of section
          wsData.push(headers); // Headers
          rows.forEach(row => wsData.push(row)); // Rows
          wsData.push([]); // Empty row to separate sections
        });
  
        // Create worksheet from data
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "All Data");
  
        // Export to Excel file
        XLSX.writeFile(wb, "all_data.xlsx");
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
  /* Style remains the same */
  </style>
  
  
  
  
  
  
  
  
  
  
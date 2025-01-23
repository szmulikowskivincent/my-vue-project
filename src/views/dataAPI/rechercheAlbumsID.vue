<template>
    <div class="search-albums-container mt-4 p-4 rounded"
        style="background-color: rgba(255, 255, 255, 0.8); width: 550px;">
        <!-- Barre de recherche -->
        <div class="mb-3">
            <input style="margin-top: -390px; margin-left: 155px; width: 970px;" type="number" v-model="searchId"
                @input="filterAlbums" class="form-control" placeholder="🆔 Entrez un ID d'album :" />
        </div>

        <!-- Résultats de recherche -->
        <ul class="list-group" v-if="filteredAlbums.length > 0">
            <li v-for="album in filteredAlbums" :key="album.id" class="list-group-item">
                <strong>ID :</strong> {{ album.id }}<br />
                <strong>Artiste ID :</strong> {{ album.artist_id }}<br />
                <strong>Titre :</strong> {{ album.title }}
            </li>
        </ul>
        <!-- Message si aucun album trouvé -->
        <div style="margin-left: 150px; width: 975px;" v-else-if="searchId" class="alert alert-warning mt-3">
            Aucun album trouvé pour l'ID recherché.
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            albums: [],
            filteredAlbums: [],
            searchId: "",
            token: "Bearer 409|eIkidCLVUYZjrOwzzQCX7AOP5nvKbIFurTJqOz8v7bf2f0dc",
        };
    },
    methods: {
        async fetchAlbums() {
            try {
                const response = await axios.get(
                    "https://backend-tic.devapp.be/public/api/albums/all",
                    {
                        headers: {
                            Authorization: this.token,
                        },
                    }
                );
                this.albums = response.data;
                this.saveToLocalStorage();
            } catch (error) {
                console.error("Erreur lors du chargement des albums :", error);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem("albums", JSON.stringify(this.albums));
        },
        loadFromLocalStorage() {
            const storedAlbums = localStorage.getItem("albums");
            if (storedAlbums) {
                this.albums = JSON.parse(storedAlbums);
            }
        },
        filterAlbums() {
            if (this.searchId) {
                this.filteredAlbums = this.albums.filter(
                    (album) => album.id == this.searchId
                );
            } else {
                this.filteredAlbums = [];
            }
        },
    },
    created() {
        this.loadFromLocalStorage();

        if (this.albums.length === 0) {
            this.fetchAlbums();
        }
    },
};
</script>

<style>
.search-albums-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
<template>
    <div style="margin-left: 920px; margin-top: -250px; position: fixed;" class="container-fluid position-relative">
        <div class="form-container position-relative p-4 rounded mt-3 mx-auto">
            <h2 class="mb-4 text-center">
                <i class="bi bi-plus-circle me-2"></i> {{ album.id ? "Modifier un album" : "Ajouter un album" }}
            </h2>
            <form @submit.prevent="album.id ? updateAlbum() : submitForm()"
                class="d-flex flex-column align-items-center">
                <div class="mb-3" style="width: 500px;">
                    <label for="artistId" class="form-label"></label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-person-circle"></i>
                        </span>
                        <input type="number" class="form-control" id="artistId" v-model="album.artist_id" required
                            placeholder="Entrez l'ID de l'artiste :" />
                    </div>
                </div>
                <div class="mb-3" style="width: 500px;">
                    <label for="title" class="form-label"></label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-music-note"></i>
                        </span>
                        <input type="text" class="form-control" id="title" v-model="album.title" required
                            placeholder="Entrez le titre de l'album :" />
                    </div>
                </div>
                <button type="submit" class="btn" :class="album.id ? 'btn-success' : 'btn-primary'"
                    style="width: 500px;">
                    <i :class="album.id ? 'bi bi-check-circle' : 'bi bi-upload'"></i>
                    {{ album.id ? "Mettre à jour l'album" : "Ajouter l'album" }}
                </button>
            </form>
            <div v-if="message" class="alert mt-3" :class="messageClass">
                {{ message }}
            </div>
        </div>

        <!-- Recherche par ID d'artiste -->
        <div class="search-container mt-4 p-4 rounded mx-auto"
            style="background-color: rgba(255, 255, 255, 0.8); width: 600px;">
            <h3 class="mb-3">
                <i class="bi bi-search"></i> Rechercher un album par ID d'artiste
            </h3>
            <div class="input-group mb-3">
                <input type="number" class="form-control" v-model="searchId" placeholder="Entrez l'ID de l'artiste" />
                <button class="btn btn-primary" @click="searchAlbum">
                    <i class="bi bi-search"></i> Rechercher
                </button>
            </div>
            <div v-if="searchedAlbum && searchedAlbum.length > 0" class="mt-3">
                <h4>Albums trouvés :</h4>
                <ul class="list-group">
                    <li v-for="album in searchedAlbum" :key="album.id" class="list-group-item">
                        <strong>🆔 Artiste ID :</strong> {{ album.artist_id }}<br />
                        <strong>♫ Titre :</strong> {{ album.title }}
                    </li>
                </ul>
            </div>
            <div v-else-if="searchId !== '' && !searchedAlbum" class="text-danger">
                Aucun album trouvé pour cet ID d'artiste.
            </div>
        </div>

        <!-- Zone des albums enregistrés -->
        <div class="album-list-container mt-4 p-4 rounded mx-auto"
            style="background-color: rgba(255, 255, 255, 0.8); width: 600px">
            <h3 class="mb-3">
                <i class="bi bi-music-note-list me-2"></i> Albums ajoutés
            </h3>

            <ul class="list-group">
                <li v-for="album in albums" :key="album.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>🆔 Artiste ID :</strong> {{ album.artist_id }}<br />
                        <strong>♫ Titre :</strong> {{ album.title }}
                    </div>
                    <div>
                        <i class="bi bi-pencil-square text-primary me-3" style="cursor: pointer; font-size: 1.2rem;"
                            @click="editAlbum(album)" title="Modifier l'album"></i>
                        <i class="bi bi-trash text-danger" style="cursor: pointer; font-size: 1.2rem;"
                            @click="deleteAlbum(album.id)" title="Supprimer l'album"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            album: {
                id: null,
                artist_id: "",
                title: "",
            },
            albums: [],
            searchId: "",
            searchedAlbum: null,
            message: "",
            messageClass: "",
            token: `Bearer 3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692`
        };
    },
    mounted() {
        const storedAlbums = localStorage.getItem("albums");
        if (storedAlbums) {
            this.albums = JSON.parse(storedAlbums);

            let needsUpdate = false;
            this.albums.forEach((album) => {
                if (!album.id) {
                    album.id = Date.now() + Math.floor(Math.random() * 1000);
                    needsUpdate = true;
                }
            });

            if (needsUpdate) {
                localStorage.setItem("albums", JSON.stringify(this.albums));
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(
                    "https://backend-tic.devapp.be/api/albums",
                    this.album,
                    {
                        headers: {
                            Authorization: this.token,
                        },
                    }
                );

                const newAlbum = { ...this.album, id: Date.now() };
                this.albums.push(newAlbum);
                localStorage.setItem("albums", JSON.stringify(this.albums));

                this.message = "Album ajouté avec succès!";
                this.messageClass = "alert-success";
                this.resetForm();
            } catch (error) {
                this.message = "Erreur lors de l'ajout de l'album.";
                this.messageClass = "alert-danger";
                console.error("Erreur lors de l'ajout :", error);
            }
        },
        resetForm() {
            this.album = {
                id: null,
                artist_id: "",
                title: "",
            };
        },
        searchAlbum() {
            const searchIdNumeric = Number(this.searchId);

            if (isNaN(searchIdNumeric)) {
                this.message = "Veuillez entrer un ID d'artiste valide.";
                this.messageClass = "alert-danger";
                this.searchedAlbum = null;
                return;
            }

            const filteredAlbums = this.albums.filter((album) => album.artist_id === searchIdNumeric);

            if (filteredAlbums.length > 0) {
                this.searchedAlbum = filteredAlbums;
                this.message = `Albums trouvés pour l'artiste avec ID : ${searchIdNumeric}`;
                this.messageClass = "alert-success";
            } else {
                this.message = `Aucun album trouvé pour l'artiste avec l'ID : ${searchIdNumeric}`;
                this.messageClass = "alert-warning";
                this.searchedAlbum = null;
            }
        },
        deleteAlbum(albumId) {
            const deletedAlbum = this.albums.find((album) => album.id === albumId);

            if (deletedAlbum) {
                let deletedAlbums = JSON.parse(localStorage.getItem("deletedAlbums")) || [];

                deletedAlbums.push(deletedAlbum);

                localStorage.setItem("deletedAlbums", JSON.stringify(deletedAlbums));

                this.albums = this.albums.filter((album) => album.id !== albumId);

                localStorage.setItem("albums", JSON.stringify(this.albums));

                this.message = "Album supprimé avec succès.";
                this.messageClass = "alert-success";
            } else {
                this.message = "Album non trouvé.";
                this.messageClass = "alert-danger";
            }
        },
        editAlbum(album) {
            this.album = { ...album };
        },
        updateAlbum() {
            const index = this.albums.findIndex((a) => a.id === this.album.id);
            if (index !== -1) {
                this.albums[index] = { ...this.album };
                localStorage.setItem("albums", JSON.stringify(this.albums));
                this.message = "Album mis à jour avec succès.";
                this.messageClass = "alert-success";
                this.resetForm();
            }
        },
    },
};
</script>


<style>
.form-container {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-inline-size: 600px;
    inline-size: 100%;
}

.album-list-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

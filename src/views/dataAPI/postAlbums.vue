<template>
    <div style="margin-left: 920px; margin-top: -850px;" class="container-fluid position-relative">
        <div class="form-container position-relative p-4 rounded mt-3 mx-auto">
            <h2 class="mb-4 text-center">
                <i class="bi bi-plus-circle me-2"></i> Ajouter un album
            </h2>
            <form @submit.prevent="submitForm" class="d-flex flex-column align-items-center">
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
                <button type="submit" class="btn btn-primary" style="width: 500px;">
                    <i class="bi bi-upload"></i> Ajouter l'album
                </button>
            </form>
            <div v-if="message" class="alert mt-3" :class="messageClass">
                {{ message }}
            </div>
        </div>

        <!-- Zone des albums enregistrés -->
        <div class="album-list-container mt-4 p-4 rounded mx-auto"
            style="background-color: rgba(255, 255, 255, 0.8); width: 600px;">
            <h3 class="mb-3">
                <i class="bi bi-music-note-list me-2"></i> Albums enregistrés
            </h3>

            <ul class="list-group">
                <li v-for="album in albums" :key="album.id" class="list-group-item">
                    <strong>🆔 Artiste ID :</strong> {{ album.artist_id }}<br />
                    <strong>♫ Titre :</strong> {{ album.title }}
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
                artist_id: "",
                title: "",
            },
            albums: [], 
            message: "",
            messageClass: "",
            token: "Bearer 409|eIkidCLVUYZjrOwzzQCX7AOP5nvKbIFurTJqOz8v7bf2f0dc",
        };
    },
    mounted() {
        const storedAlbums = localStorage.getItem("albums");
        if (storedAlbums) {
            this.albums = JSON.parse(storedAlbums);
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(
                    "https://backend-tic.devapp.be/public/api/albums",
                    this.album,
                    {
                        headers: {
                            Authorization: this.token,
                        },
                    }
                );

                this.message = "Album ajouté avec succès!";
                this.messageClass = "alert-success";

                const newAlbum = { ...this.album }; 
                this.albums.push(newAlbum);

                localStorage.setItem("albums", JSON.stringify(this.albums));

                this.resetForm();
            } catch (error) {
                this.message = "Erreur lors de l'ajout de l'album.";
                this.messageClass = "alert-danger";
                console.error(error);
            }
        },
        resetForm() {
            this.album.artist_id = "";
            this.album.title = "";
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

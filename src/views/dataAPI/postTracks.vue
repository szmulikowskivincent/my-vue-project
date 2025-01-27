<template>
    <div class="container mt-5">
        <div style="margin-top: -320px; margin-left: -573px;" class="form-container">
            <div class="text-center">
                <img src="https://www.globalcharge.com/assets/media/logo4.png" alt="Turntable" class="mb-3"
                    style="width: 250px;" />
                <h2>
                    <br />
                    <i class="bi bi-music-note-beamed"></i> Add Track
                </h2>
                <br />
            </div>
            <form @submit.prevent="submitTrack" class="mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="bi bi-album"></i></span>
                            <input type="number" id="album_id" v-model="track.album_id" class="form-control"
                                placeholder="ID de l'Album" required />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="bi bi-file-earmark-music"></i></span>
                            <input type="number" id="media_type_id" v-model="track.media_type_id" class="form-control"
                                placeholder="ID du Media" required />
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="bi bi-music-note"></i></span>
                    <input type="text" id="name" v-model="track.name" class="form-control" placeholder="Nom du Track"
                        required />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                    <input type="text" id="composer" v-model="track.composer" class="form-control"
                        placeholder="Compositeur" required />
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="bi bi-clock"></i></span>
                            <input type="number" id="milliseconds" v-model="track.milliseconds" class="form-control"
                                placeholder="Durée (ms)" required />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="bi bi-file-earmark"></i></span>
                            <input type="number" id="bytes" v-model="track.bytes" class="form-control"
                                placeholder="Taille (bytes)" required />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <input type="number" step="0.01" id="unit_price" v-model="track.unit_price"
                                class="form-control" placeholder="Prix Unitaire" required />
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="bi bi-tags"></i></span>
                    <input type="number" id="genre_id" v-model="track.genre_id" class="form-control"
                        placeholder="ID du Genre" required />
                </div>
                <button style="width: 75px; height: 75px; border-radius: 50%;" type="submit"
                    class="btn btn-primary mt-4" title="Send">
                    <i class="bi bi-send"></i>
                </button>
            </form>
        </div>
    </div>

    <!-- Display saved tracks -->
    <div style="width: 50px" class="mt-5">
        <ul style="margin-top: -698px; margin-left: -140px" class="list-group">
            <li style="height: 100px;" v-for="(savedTrack, index) in savedTracks" :key="index" class="list-group-item">
                <strong>🎧{{ savedTrack.name }}<br /></strong>🛡️{{ savedTrack.composer }}<br />
                <span><i>♫ Album ID: {{ savedTrack.album_id }}</i></span>
            </li>
        </ul>
    </div>
    <br />
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            track: {
                album_id: 0,
                media_type_id: 0,
                genre_id: 0,
                name: "",
                composer: "",
                milliseconds: 0,
                bytes: 0,
                unit_price: 0,
            },
            token: "3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692",
            savedTracks: this.loadTracksFromLocalStorage(),
        };
    },
    methods: {
        async submitTrack() {
            try {
                const response = await axios.post(
                    "https://backend-tic.devapp.be/api/tracks",
                    this.track,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                alert("Track ajouté avec succès !");
                this.saveTrackToLocalStorage(this.track);  
                this.resetForm();
            } catch (error) {
                console.error("Erreur Axios :", error.response?.data || error.message);
                alert("Une erreur s'est produite lors de l'ajout du track.");
            }
        },
        resetForm() {
            this.track = {
                album_id: 0,
                media_type_id: 0,
                genre_id: 0,
                name: "",
                composer: "",
                milliseconds: 0,
                bytes: 0,
                unit_price: 0,
            };
        },
        saveTrackToLocalStorage(track) {
            const existingTracks = this.loadTracksFromLocalStorage();
            existingTracks.push(track);
            localStorage.setItem("tracks", JSON.stringify(existingTracks));
            this.savedTracks = existingTracks;  
        },
        loadTracksFromLocalStorage() {
            const savedTracks = localStorage.getItem("tracks");
            return savedTracks ? JSON.parse(savedTracks) : [];
        },
    },
};
</script>

<style scoped>
.form-container {
    background-color: rgba(0, 0, 0, 0.7); 
    border-radius: 10px;
    padding: 20px;
    color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    inline-size: 415px; 
    margin: 0 auto;
}
</style>


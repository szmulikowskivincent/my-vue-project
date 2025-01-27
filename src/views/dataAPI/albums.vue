<template>
    <!-- Pagination -->
    <div style="margin-top: 50px;" v-if="filteredAlbums.length" class="pagination-container mt-3">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                    <button style="margin-top: 250px;" class="page-link"
                        @click="goToPage(currentPage - 1)">Previous</button>
                </li>
                &nbsp;&nbsp;
                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                    <button style="margin-top: 250px;" class="page-link"
                        @click="goToPage(currentPage + 1)">Next</button>
                </li>
            </ul>
        </nav>
    </div>

    <!-- Albums -->
    <div class="row">
        <div style="margin-inline-start: 180px;" class="col-md-9 col-12 offset-md-3">
            <section>
                <h1 style="color:blueviolet"><i class="bi bi-collection"></i> Albums</h1>
                <br />
                <div v-if="loading" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-if="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>
            </section>

            <!-- Albums list -->
            <section v-if="filteredAlbums.length">
                <div class="row">
                    <div v-for="album in paginatedFilteredAlbums" :key="album.id" class="col-md-4 mb-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title">{{ album.title }}</h5>
                                    <i class="bi bi-pencil-square text-primary" @click="editAlbum(album)"></i>
                                </div>
                                <p class="card-text"><i class="bi bi-person"></i> Initials: {{
                                    getArtistInitials(album.artist?.name) }}</p>
                                <div class="d-flex justify-content-between">
                                    <img :src="album.cover_image || 'https://static.vecteezy.com/system/resources/previews/027/224/002/original/spotify-3d-logo-free-png.png'"
                                        class="album-cover rounded" alt="Album Cover">
                                    <a :href="album.track_url" target="_blank" class="btn btn-outline-primary btn-sm">
                                        <i class="bi bi-music-note"></i> Listen
                                    </a>
                                    <!-- Bouton Play Music -->
                                    <button @click="playMusic(album.track_url)" class="btn btn-outline-success btn-sm">
                                        <i class="bi bi-play-circle"></i> Play Music
                                    </button>
                                </div>
                                <!-- Ajout du lecteur audio avec gestion des erreurs -->
                                <audio :src="album.track_url" controls v-if="album.track_url" @error="audioError"
                                    ref="audioPlayer">
                                    Votre navigateur ne supporte pas l'élément audio.
                                </audio>
                                <p v-if="audioErrorFlag" class="text-danger">Erreur lors du chargement du fichier
                                    audio.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Album de Démo avec couleur différente -->
                    <div class="col-md-4 mb-4"
                        style="background-color: transparent; margin-left: -315px; margin-top: -375px;">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title" style="color: #ff3333;">Demo Album</h5>
                                </div>
                                <p class="card-text"><i class="bi bi-person"></i> Initials: Demo</p>
                                <div class="d-flex justify-content-between">
                                    <!-- Pochette de couverture de l'album de démo -->
                                    <img src="https://thumbs.dreamstime.com/b/msuic-symbol-d-illustration-audio-speaker-music-sign-over-black-background-38800638.jpg"
                                        class="album-cover rounded" alt="Demo Album Cover">
                                </div>

                                <!-- URL pour la démo -->
                                <p class="text-success">Track URL:
                                    https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3</p>

                                <!-- Bouton Play pour la démo -->
                                <button @click="playDemoMusic" class="btn btn-outline-danger btn-sm">
                                    <i class="bi bi-play-circle"></i> Play Demo Music
                                </button>



                                <!-- Lecteur Audio pour la démo -->
                                <audio style="margin-left: -10px; width: 250px; margin-top: 10px;" :src="demoTrackUrl"
                                    controls v-if="demoTrackUrl" ref="audioPlayer">
                                    Votre navigateur ne supporte pas l'élément audio.
                                </audio>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Pagination -->
            <div v-if="filteredAlbums.length" class="pagination-container mt-3">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                            <button style="margin-top: -25px;" class="page-link"
                                @click="goToPage(currentPage - 1)">Previous</button>
                        </li>
                        &nbsp;&nbsp;
                        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                            <button style="margin-top: -25px;" class="page-link"
                                @click="goToPage(currentPage + 1)">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="container-fluid mt-5">
                <!-- Barre de recherche -->
                <div style=" margin-top: -810px;" class="text-center mb-4">
                    <input type="text" v-model="searchQuery" class="form-control form-control-lg w-50 mx-auto"
                        placeholder="🔎 Rechercher un artiste ou un album..." />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            albums: [],
            searchQuery: "",
            loading: false,
            error: null,
            currentPage: 1,
            itemsPerPage: 6,
            demoTrackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            audioErrorFlag: false,
        };
    },
    computed: {
        filteredAlbums() {
            const query = this.searchQuery.toLowerCase();
            return this.albums.filter(album =>
                album.title.toLowerCase().includes(query) ||
                (album.artist?.name && album.artist.name.toLowerCase().includes(query))
            );
        },
        totalPages() {
            return Math.ceil(this.filteredAlbums.length / this.itemsPerPage);
        },
        paginatedFilteredAlbums() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredAlbums.slice(start, start + this.itemsPerPage);
        }
    },
    methods: {
        getArtistInitials(artistName) {
            if (!artistName) return '';
            const names = artistName.split(' ');
            return names.map(name => name.charAt(0).toUpperCase()).join('');
        },
        async fetchAlbums() {
            this.loading = true;
            try {
                const response = await fetch('https://backend-tic.devapp.be/api/albums', {
                    headers: {
                        'Authorization': `Bearer 3|QZinO4JbAPBK3PkojH6MUT5BrQsCu2NVLlDZoG416fc7e692`
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    this.albums = result.data;
                } else {
                    throw new Error('Failed to fetch albums');
                }
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        playMusic(trackUrl) {
            const audioPlayer = this.$refs.audioPlayer;
            if (audioPlayer) {
                audioPlayer.src = trackUrl;
                audioPlayer.play();
            }
        },
        playDemoMusic() {
            const demoAudioPlayer = this.$refs.audioPlayer;
            if (demoAudioPlayer) {
                demoAudioPlayer.src = this.demoTrackUrl;
                demoAudioPlayer.play();
            }
        },
        audioError() {
            this.audioErrorFlag = true;
        },
        goToPage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        }
    },
    mounted() {
        this.fetchAlbums();
    }
};
</script>


<style scoped>
.container-fluid {
    padding-inline-start: 0;
    padding-inline-end: 0;
}

.card {
    border: 1px solid #ddd;
}

.album-cover {
    inline-size: 50px;
    block-size: 50px;
    object-fit: cover;
}

.card:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.pagination-container {
    margin-block-start: 20px;
}
</style>

<template>
    <div class="container-fluid mt-5">
        <!-- Barre de recherche -->
        <div style="margin-block-start: -50px;" class="text-center mb-4">
            <input
                type="text"
                v-model="searchQuery"
                class="form-control form-control-lg w-50 mx-auto"
                placeholder="🔎 Rechercher un artiste ou un album..."
            />
        </div>

        <!-- Pagination -->
        <div style="margin-inline-start: 30px;" v-if="filteredAlbums.length" class="pagination-container mt-3">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                        <button class="page-link" @click="goToPage(currentPage - 1)">Previous</button>
                    </li>
                    &nbsp;&nbsp;
                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                        <button class="page-link" @click="goToPage(currentPage + 1)">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
        <br />
        <div class="row">
            <div style="margin-inline-start: 180px;" class="col-md-9 col-12 offset-md-3">
                <section>
                    <h3><i class="bi bi-collection"></i> Albums</h3>
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
                                        <a :href="album.track_url" target="_blank"
                                            class="btn btn-outline-primary btn-sm">
                                            <i class="bi bi-music-note"></i> Listen
                                        </a>
                                    </div>
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
                                <button style="margin-top: 150px" class="page-link" @click="goToPage(currentPage - 1)">Previous</button>
                            </li>
                            &nbsp;&nbsp;
                            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                                <button style="margin-top: 150px" class="page-link" @click="goToPage(currentPage + 1)">Next</button>
                            </li>
                        </ul>
                    </nav>
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
            itemsPerPage: 6
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
                const response = await fetch('https://backend-tic.devapp.be/public/api/albums', {
                    headers: {
                        'Authorization': `Bearer 409|eIkidCLVUYZjrOwzzQCX7AOP5nvKbIFurTJqOz8v7bf2f0dc`
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

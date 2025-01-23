<template>
    <div>
        <div class="trash-icon">
            <i class="bi bi-trash-fill" @click="toggleTrash"></i>
            <span v-if="deletedAlbums.length > 0" class="badge alert-badge">
                {{ deletedAlbums.length }}
            </span>
            <span v-else class="badge alert-badge">0</span>
        </div>

        <div v-if="showTrash" class="trash-section container-fluid p-4 rounded">
            <h3 class="mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <i class="bi bi-trash-fill me-2"></i> Corbeille d'albums supprimés
                </div>
                <button class="btn btn-danger btn-sm" @click="clearTrash" title="Vider la corbeille">
                    <i class="bi bi-trash"></i>
                </button>
            </h3>
            <ul class="list-group">
                <li v-for="album in deletedAlbums" :key="album.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>🆔 Artiste ID :</strong> {{ album.artist_id }}<br />
                        <strong>♫ Titre :</strong> {{ album.title }}
                    </div>
                    <i class="bi bi-arrow-clockwise text-success fs-4 cursor-pointer" @click="restoreAlbum(album.id)"
                        title="Restaurer"></i>
                </li>
            </ul>
            <div v-if="deletedAlbums.length === 0" class="text-muted mt-3">
                La corbeille est vide.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TrashBin",
    data() {
        return {
            showTrash: false,
            deletedAlbums: [], 
        };
    },
    mounted() {
        const storedDeletedAlbums = localStorage.getItem("deletedAlbums");
        if (storedDeletedAlbums) {
            this.deletedAlbums = JSON.parse(storedDeletedAlbums);
        }
    },
    methods: {
        toggleTrash() {
            this.showTrash = !this.showTrash;
        },
        clearTrash() {
            this.deletedAlbums = [];
            localStorage.setItem("deletedAlbums", JSON.stringify(this.deletedAlbums)); 
            alert("Corbeille vidée");
        },
        restoreAlbum(albumId) {
            const restoredAlbum = this.deletedAlbums.find((album) => album.id === albumId);
            if (restoredAlbum) {
                const albums = JSON.parse(localStorage.getItem("albums")) || [];
                albums.push(restoredAlbum);

                localStorage.setItem("albums", JSON.stringify(albums));

                this.deletedAlbums = this.deletedAlbums.filter((album) => album.id !== albumId);
                localStorage.setItem("deletedAlbums", JSON.stringify(this.deletedAlbums));

                alert("Album restauré");
            }
        },
    },
};
</script>

<style scoped>
.trash-icon {
    position: fixed;
    inset-block-end: 120px;
    inset-inline-start: 20px;
    font-size: 2rem;
    color: #dc3545;
    cursor: pointer;
    font-size: 75px;
    z-index: 1001;
}

.alert-badge {
    position: absolute;
    inset-block-start: -5px;
    inset-inline-start: 60px;
    background-color: #dc3545;
    color: #fff;
    font-size: 25px;
    inline-size: 25px;
    block-size: 25px;
    padding: 2px 6px;
    border-radius: 50%;
    margin-block-start: -15px;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.trash-section {
    position: fixed;
    inset-block-end: 270px;
    inset-inline-start: 15px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-inline-size: 550px;
    inline-size: 100%;
    z-index: 1000;
    overflow: hidden;
}

.cursor-pointer {
    cursor: pointer;
}

.bi-x-circle-fill {
    transition: transform 0.3s ease, color 0.3s ease;
}

.bi-x-circle-fill:hover {
    transform: scale(1.2);
    color: #ff4d4d;
}
</style>

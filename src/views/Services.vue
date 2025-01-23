<template>
    <div class="services-container">
        <h2><i class="bi-briefcase"></i> Nos Services</h2>
        <div class="services-list">
            <div v-for="service in services" :key="service.id" class="service-item">
                <img :src="service.logo" alt="service logo" class="service-logo" />
                <h3><i class="bi-cog"></i> {{ service.name }}</h3>
                <p><i class="bi-info-circle"></i> {{ service.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Services',
    data() {
        return {
            services: [
                {
                    id: 1,
                    name: 'Développement Angular',
                    description: 'Développement d\'applications web modernes avec Angular.',
                    logo: 'https://angular.io/assets/images/logos/angular/angular.png',
                },
                {
                    id: 2,
                    name: 'Développement ReactJS',
                    description: 'Création d\'interfaces utilisateur dynamiques avec React.',
                    logo: 'https://onebitious.net/wp-content/uploads/2021/05/061_eyecatch.png',
                },
                {
                    id: 3,
                    name: 'Node.js Backend',
                    description: 'Serveur backend rapide et scalable avec Node.js.',
                    logo: 'https://cloud5.jp/wp-content/uploads/2021/03/auto-docker-image-build-ecr-push.jpg',
                },
                {
                    id: 4,
                    name: 'Vue.js Frontend',
                    description: 'Développement d\'applications web réactives avec Vue.js.',
                    logo: 'https://vuejs.org/images/logo.png',
                },
            ],
        };
    },
};
</script>

<style scoped>
.services-container {
    padding: 20px;
    text-align: center;
    position: relative;
    block-size: 100vh;
    background-image: url('src/assets/outils-developpeurs-debutants.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.8; 
    z-index: 1;
}

h2 {
    font-size: 2em;
    margin-block-end: 20px;
    color: #333;
}

.services-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.service-item {
    inline-size: 400px;
    padding: 20px;
    margin: 10px;
    border: 2px solid #007BFF; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
}

.service-logo {
    inline-size: 300px;
    block-size: 300px;
    border-radius: 8px;
    margin-block-end: 15px;
}

h3 {
    font-size: 1.2em;
    margin-block-end: 10px;
    color: #555;
}

p {
    font-size: 1em;
    color: #777;
}
</style>
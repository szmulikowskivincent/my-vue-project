<template>
    <div class="body">
        <br /><br />
        <div class="about-container">
            <div class="about-header">
                <h1>À propos de notre application Todo List</h1>
                <p>
                    <i class="bi bi-list-check"></i> Gérez vos tâches facilement et efficacement.
                </p>
            </div>

            <div class="about-content">
                <section class="app-description">
                    <h2><i class="bi bi-clipboard"></i> Objectif de l'application</h2>
                    <p>
                        Notre application Todo List est conçue pour vous aider à organiser vos tâches quotidiennes,
                        suivre
                        vos progrès et rester productif. Vous pouvez facilement ajouter, marquer comme terminées et
                        supprimer des tâches selon vos besoins.
                    </p>
                    <p>
                        Que vous planifiiez votre journée de travail ou que vous suiviez vos objectifs personnels, cette
                        application fournit une solution simple et efficace pour la gestion des tâches.
                    </p>
                </section>

                <section class="privacy-policy">
                    <h2><i class="bi bi-shield-lock"></i> Politique de confidentialité</h2>
                    <p>
                        Nous prenons votre vie privée au sérieux. Les informations que vous fournissez, telles que vos
                        tâches et vos détails de connexion, sont stockées localement sur votre appareil en utilisant
                        <b>localStorage</b> pour plus de commodité. Aucune donnée n'est partagée avec des tiers ou
                        stockée
                        sur des serveurs externes.
                    </p>
                    <p>
                        Veuillez noter qu'en utilisant cette application, vous consentez à l'utilisation du stockage
                        local
                        pour gérer vos tâches et vos informations utilisateur.
                    </p>
                </section>
            </div>

            <div class="footer">
                <p>&copy; 2025 Votre entreprise. Tous droits réservés.</p>
            </div>

            <div class="login-button-container">
                <button class="btn btn-primary" @click="redirectToLogin">
                    <i class="bi bi-box-arrow-in-right"></i> Login
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    methods: {
        redirectToLogin() {
            window.location.href = 'http://localhost:5173';
        }
    }
};
</script>

<style scoped>
.body {
    background-image: url('src/assets/outils-developpeurs-debutants.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    block-size: 100vh;
    opacity: 0.8;
    z-index: 1;
}

.about-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-inline-size: 800px;
    margin: 0 auto;
}

.about-header {
    text-align: center;
    margin-block-end: 40px;
}

.about-header h1 {
    font-size: 36px;
    color: #333;
}

.about-header p {
    font-size: 18px;
    color: #555;
}

.about-content {
    margin-block-end: 40px;
}

.about-content h2 {
    font-size: 24px;
    margin-block-end: 10px;
    color: #007bff;
}

.about-content p {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
}

.about-content i {
    margin-inline-end: 10px;
}

.footer {
    text-align: center;
    font-size: 14px;
    color: #777;
}

footer p {
    margin-block-start: 20px;
}

.login-button-container {
    text-align: center;
    margin-block-start: 30px;
}

.login-button-container button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-button-container button:hover {
    background-color: #0056b3;
}
</style>

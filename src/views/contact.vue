<template>
    <div class="contact">
        <h2><i class="bi bi-envelope"></i> Contactez-nous</h2>
        <br /><br />
        <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
                <div class="input-container">
                    <i class="bi bi-person"></i>
                    <input v-model="form.lastName" type="text" id="lastName" placeholder="Nom :" required />
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <i class="bi bi-person"></i>
                    <input v-model="form.firstName" type="text" id="firstName" placeholder="Prénom :" required />
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <i class="bi bi-envelope-at"></i>
                    <input v-model="form.email" type="email" id="email" placeholder="Email :" required />
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <i class="bi bi-list-task"></i>
                    <select v-model="form.subject" id="subject" required>
                        <option value="" disabled selected>Sujet :</option>
                        <option value="general">Demande générale</option>
                        <option value="support">Support technique</option>
                        <option value="feedback">Retour d'information</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <i class="bi bi-paperclip"></i>
                    <input type="file" id="file" @change="handleFileUpload" />
                </div>
            </div>

            <div class="form-group">
                <div class="input-container">
                    <i class="bi bi-chat-left-dots"></i>
                    <textarea v-model="form.message" id="message" placeholder="Message :" required></textarea>
                </div>
            </div>

            <button type="submit" class="submit-button">
                <i class="bi bi-send"></i> Envoyer
            </button>
        </form>
        <p v-if="submitted" class="success-message">
            <i class="bi bi-check-circle"></i> Merci pour votre message ! Nous vous répondrons bientôt.
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                lastName: '',
                firstName: '',
                email: '',
                subject: '',
                file: null,
                message: ''
            },
            submitted: false
        };
    },
    methods: {
        handleFileUpload(event) {
            this.form.file = event.target.files[0];
        },
        submitForm() {
            console.log('Formulaire soumis:', this.form);

            this.submitted = true;

            this.form = {
                lastName: '',
                firstName: '',
                email: '',
                subject: '',
                file: null,
                message: ''
            };

            setTimeout(() => {
                this.$router.push('/todos-list');
            }, 2000);
        }
    }
};
</script>

<style scoped>
.contact {
    display: flex;
    justify-content: center;
    align-items: center;
    block-size: 75vh;
    margin: 0;
    position: relative;
    background-image: url('src/assets/outils-developpeurs-debutants.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.contact-form {
    padding: 20px; 
    border: 2px solid #007BFF; 
    border-radius: 8px; 
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-inline-start: -250px; 
}

h2 {
    text-align: center;
    color: #333;
}

.contact-form .form-group {
    margin-block-end: 20px;
}

.input-container {
    position: relative;
    inline-size: 100%;
}

.input-container i {
    position: absolute;
    inset-inline-start: 10px;
    inset-block-start: 50%;
    transform: translateY(-50%);
    color: #007BFF;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
    inline-size: 100%;
    padding: 10px 10px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.contact-form button {
    inline-size: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact-form button:hover {
    background-color: #0056b3;
}

.success-message {
    text-align: center;
    color: green;
    font-weight: bold;
}

.contact-form i {
    margin-inline-end: 8px;
}
</style>

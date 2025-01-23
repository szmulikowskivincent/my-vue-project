<template>
  <div class="register-form-container">
    <div class="form-background">
      <div class="register-form">
        <h2>
          <i class="bi bi-person-plus-fill"></i> Register
        </h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="username" class="form-label"></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input type="text" id="username" class="form-control" v-model="username" placeholder="Username :" required
                :minlength="3" :maxlength="25" />
            </div>
            <p v-if="username && (username.length < 3 || username.length > 25)" style="color: red;">
              Username must be between 3 and 25 characters.
            </p>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label"></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input type="password" id="password" class="form-control" v-model="password" placeholder="Password :"
                required :minlength="6" :maxlength="50" />
            </div>
            <p v-if="password && (password.length < 6 || password.length > 50)" style="color: red;">
              Password must be between 6 and 50 characters.
            </p>
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="isFormInvalid">
            <i class="bi bi-check-circle"></i> Register
          </button>
        </form>
        <p v-if="message" :style="{ color: 'green' }">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  computed: {
    isFormInvalid() {
      return (
        this.username.length < 3 ||
        this.username.length > 25 ||
        this.password.length < 6 ||
        this.password.length > 50
      );
    },
  },
  methods: {
    handleRegister() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.some((user) => user.username === this.username);

      if (exists) {
        this.message = "Username already exists!";
        this.$router.push('/login');
        return;
      }

      users.push({ username: this.username, password: this.password });
      localStorage.setItem("users", JSON.stringify(users));

      this.message = "Registration successful!";
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.register-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  block-size: 100vh;
  margin: 0;
  position: relative;
  background-image: url('src/assets/outils-developpeurs-debutants.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.register-form {
  position: relative;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #007BFF; 
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  inline-size: 100%;
  max-inline-size: 400px;
  margin-block-start: -450px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group-text {
  background-color: #f8f9fa;
}

input[type="text"],
input[type="password"] {
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #42b983;
  color: white;
}

button:hover {
  background-color: #365e02;
}

button:disabled {
  background-color: #b2d8b2;
  cursor: not-allowed;
}
</style>
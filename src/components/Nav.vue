<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        class="iconify iconify--logos" width="37.07" height="36" preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 198">
        <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path>
        <path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path>
        <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path>
      </svg> &nbsp; &nbsp;
      <router-link to="/" class="navbar-brand">Demo Vue JS</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="isLoggedIn ? '/' : ''" :class="!isLoggedIn ? 'disabled-link' : ''">
              <i class="bi bi-house-door"></i> Home / Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="isLoggedIn ? '/about' : ''" :class="!isLoggedIn ? 'disabled-link' : ''">
              <i class="bi bi-info-circle"></i> About
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="isLoggedIn ? '/services' : ''" :class="!isLoggedIn ? 'disabled-link' : ''">
              <i class="bi bi-briefcase"></i> Services
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="isLoggedIn ? '/todos-list' : ''" :class="!isLoggedIn ? 'disabled-link' : ''">
              <i class="bi bi-card-checklist"></i> Todos-List
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="isLoggedIn ? '/dashboardAPI' : ''" :class="!isLoggedIn ? 'disabled-link' : ''">
              🌐 API
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="isLoggedIn ? '/contact' : ''" :class="!isLoggedIn ? 'disabled-link' : ''">
              <i class="bi bi-envelope"></i> Contact
            </router-link>
          </li>
        </ul>

        <div v-if="initials" class="user-section">
          <span class="user-initials">{{ initials }}</span>
          <button @click="handleLogout" class="btn btn-outline-danger btn-sm">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      initials: null,
      isLoggedIn: false,
    };
  },
  mounted() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users[users.length - 1];
    if (currentUser && currentUser.username) {
      this.initials = this.getInitials(currentUser.username);
      this.isLoggedIn = true;
    }
  },
  methods: {
    getInitials(name) {
      return name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
    },
    handleLogout() {
      localStorage.clear();
      this.initials = null;
      this.isLoggedIn = false;
      this.$router.push('/about');
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-block-end: 20px;
}

li {
  font-size: 20px;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-initials {
  font-size: 42px;
  font-weight: bold;
  color: #007BFF;
  margin-inline-start: 15px;
  padding: 5px 10px;
  background-color:transparent;
  border-radius: 50%;
  text-transform: uppercase;
}

button {
  font-size: 24px;
}

.disabled-link {
  pointer-events: none;
  color: #6c757d;
}
</style>





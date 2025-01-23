<template>
  <footer class="footer">
    <div class="container">
      <h4>
        <i class="bi bi-c-circle"></i> 2025 Vincent Szmulikowski. Tous droits réservés.
      </h4>
      <div class="social-icons">
        <a href="https://github.com" target="_blank" aria-label="GitHub">
          <i class="bi bi-github"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <i class="bi bi-linkedin"></i>
        </a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <i class="bi bi-twitter"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  position: fixed;
  inset-inline-start: 0;
  inset-block-end: 0;
  inline-size: 100%;
  font-size: 14px;
  color: #6c757d;
}

.footer .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer h4 {
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  font-size: 20px;
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #007bff;
}
</style>

  
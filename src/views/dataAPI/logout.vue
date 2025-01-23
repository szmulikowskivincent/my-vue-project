<template>
    <div>
      <button style="margin-left: 1735px; margin-top: -120px; width: 10%;" @click="logout" class="btn btn-primary">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        },
    },
};
</script>


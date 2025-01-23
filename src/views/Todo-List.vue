<template>
  <div class="body">
    <br /><br />
    <div class="todo-list">
      <h2><i class="bi bi-list-task"></i> To-Do List</h2>

      <form @submit.prevent="addTask" class="add-task-form">
        <div class="form-group">
          <input v-model="newTask" type="text" placeholder="Ajouter une tâche..." required />
          <button type="submit"><i class="bi bi-plus-circle"></i> Ajouter</button>
        </div>
      </form>

      <ul>
        <li v-for="(task, index) in tasks" :key="index" :class="{ done: task.completed }">
          <label>
            <input type="checkbox" v-model="task.completed" />
            <i :class="task.icon"></i> {{ task.text }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { text: 'Créer une maquette pour un site web', completed: false, icon: 'bi bi-layout-text-window' },
        { text: 'Développer une API REST avec Node.js', completed: false, icon: 'bi bi-server' },
        { text: 'Intégrer un design avec Bootstrap', completed: false, icon: 'bi bi-bootstrap' },
        { text: 'Écrire des tests unitaires avec Jest', completed: false, icon: 'bi bi-check2-square' },
        { text: 'Déployer une application sur Heroku', completed: false, icon: 'bi bi-cloud-upload' },
        { text: 'Configurer un environnement Docker', completed: false, icon: 'bi bi-box-seam' },
        { text: 'Participer à une réunion Agile', completed: false, icon: 'bi bi-people' },
        { text: 'Créer une base de données avec MongoDB', completed: false, icon: 'bi bi-database' },
        { text: 'Corriger les bugs dans le backlog', completed: false, icon: 'bi bi-bug' }
      ],
      newTask: ''
    };
  },
  mounted() {
    if (!localStorage.getItem('pageRefreshed')) {
      localStorage.setItem('pageRefreshed', 'true');
      window.location.reload();
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false, icon: 'bi bi-card-text' });
        this.newTask = '';
      }
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

.todo-list {
  max-inline-size: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 2px solid #007BFF; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.add-task-form {
  display: flex;
  margin-block-end: 20px;
}

.add-task-form .form-group {
  display: flex;
  inline-size: 100%;
}

.add-task-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.add-task-form button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.add-task-form button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-block-end: 10px;
  display: flex;
  align-items: center;
}

li.done {
  background-color: #d4edda;
  text-decoration: line-through;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
  inline-size: 100%;
}

input[type='checkbox'] {
  cursor: pointer;
}
</style>
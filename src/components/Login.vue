<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Usuario" required />
      <input type="password" v-model="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        body: JSON.stringify({ username: this.username, password: this.password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir o notificar el inicio de sesión exitoso
        this.$emit('login-success');
      } else {
        this.errorMessage = data.message || 'Credenciales incorrectas';
      }
    },
  },
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>

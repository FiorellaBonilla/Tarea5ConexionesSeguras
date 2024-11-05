<template>
    <div>
      <Login v-if="!isAuthenticated" @login-success="handleLogin" />
      <div v-else>
        <slot></slot> <!-- Renderiza los componentes hijos aquí -->
      </div>
    </div>
  </template>
  
  <script>
  import Login from './Login.vue'; // Asegúrate de que la ruta sea correcta
  
  export default {
    name: "AuthLayout",
    components: {
      Login,
    },
    data() {
      return {
        isAuthenticated: false,
      };
    },
    mounted() {
      // Verifica si la cookie 'userid' está presente
      const cookies = document.cookie.split(';');
      this.isAuthenticated = cookies.some(cookie => cookie.trim().startsWith('userid='));
    },
    methods: {
      handleLogin() {
        this.isAuthenticated = true;
        this.$emit('login-success'); // Emitir el evento al componente padre
      }
    }
  };
  </script>
  
  <style>
  /* Estilos para el layout de autenticación */
  </style>
  
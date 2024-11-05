<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <div v-if="!isAuthenticated">
        <Login @login-success="handleLogin" />
      </div>

      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Autor</th>
              <th>Publisher</th>
              <th>Edition</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.publisher }}</td>
              <td>{{ book.edition }}</td>
              <td>
                <router-link class="button" :to="'/book/show/' + book._id">Show</router-link>
                &nbsp;
                <router-link class="button" :to="'/book/edit/' + book._id">Edit</router-link>
                &nbsp;
                <a class="button" v-on:click="deleteBook(book._id)">Erase</a>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="button button-primary" to="/book/create">New</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'; 

export default {
  name: "BookIndex",
  components: {
    Login,
  },
  data() {
    return {
      title: 'Book List',
      books: [],
      isAuthenticated: false,
    };
  },
  mounted() {
   
    const cookies = document.cookie.split(';');
    this.isAuthenticated = cookies.some(cookie => cookie.trim().startsWith('userid='));


    if (this.isAuthenticated) {
      this.allBooks();
    }
  },
  methods: {
    handleLogin() {
      this.isAuthenticated = true;
      this.allBooks(); 
    },
    allBooks() {
      fetch(this.url + '/.netlify/functions/bookFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.books = items;
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    },
    deleteBook(id) {
      fetch(this.url + '/.netlify/functions/bookDelete/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
      })
        .then(() => {
          this.allBooks(); 
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    }
  }
};
</script>


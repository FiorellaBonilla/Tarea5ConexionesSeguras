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
              <th>Author</th>
              <th>Nationality</th>
              <th>Birth Year</th>
              <th>Fields</th>
              <th>Books</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="author in authors" :key="author._id">
              <td>{{ author.author }}</td>
              <td>{{ author.nationality }}</td>
              <td>{{ author.birth_year }}</td>
              <td>{{ author.fields }}</td>
              <td>
                <ul>
                  <li v-for="book in author.books" :key="book.book_id">{{ book.title }}</li>
                </ul>
              </td>
              <td>
                <router-link class="button" :to="'/author/show/' + author._id">Show</router-link>
                &nbsp;
                <router-link class="button" :to="'/author/edit/' + author._id">Edit</router-link>
                &nbsp;
                <a class="button" v-on:click="deleteAuthor(author._id)">Erase</a>
              </td>
            </tr>
          </tbody>
        </table>

        <router-link class="button button-primary" to="/author/create">New Author</router-link>
    
        <button @click="logout" class="button logout-button">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'; 

export default {
  name: "AuthorIndex",
  components: {
    Login,
  },
  data() {
    return {
      title: 'Author List',
      authors: [],
      isAuthenticated: false,
    };
  },
  mounted() {

    const cookies = document.cookie.split(';');
    this.isAuthenticated = cookies.some(cookie => cookie.trim().startsWith('userid='));


    if (this.isAuthenticated) {
      this.allAuthors();
    }
  },
  methods: {
    handleLogin() {
      this.isAuthenticated = true;
      this.allAuthors(); 
    },
    allAuthors() {
      fetch(this.url + '/.netlify/functions/authorFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.authors = items;
        })
        .catch((error) => {
          console.error("Error fetching authors:", error);
        });
    },
    deleteAuthor(id) {
      fetch(this.url + '/.netlify/functions/authorDelete/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
      })
        .then(() => {
          this.allAuthors(); 
        })
        .catch((error) => {
          console.error("Error deleting author:", error);
        });
    },
    logout() {
 
      document.cookie = 'userid=; Max-Age=0; path=/';

  
      this.isAuthenticated = false;
      this.authors = [];
    }
  }
};
</script>

<style scoped>
.logout-button {
  margin-top: 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

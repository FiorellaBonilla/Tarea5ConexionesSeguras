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
              <th>Publisher</th>
              <th>Country</th>
              <th>Founded</th>
              <th>Genre</th>
              <th>Books</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="publisher in publishers" :key="publisher._id">
              <td>{{ publisher.publisher }}</td>
              <td>{{ publisher.country }}</td>
              <td>{{ publisher.founded }}</td>
              <td>{{ publisher.genre }}</td>
              <td>
                <ul>
                  <li v-for="book in publisher.books" :key="book.book_id">
                    {{ book.title }}
                  </li>
                </ul>
              </td>
              <td>
                <router-link class="button" :to="'/publisher/show/' + publisher._id">Show</router-link>
                &nbsp;
                <router-link class="button" :to="'/publisher/edit/' + publisher._id">Edit</router-link>
                &nbsp;
                <a class="button" v-on:click="deletePublisher(publisher._id)">Erase</a>
              </td>
            </tr>
          </tbody>
        </table>

    
        <router-link class="button button-primary" to="/publisher/create">New Publisher</router-link>
        

        <button @click="logout" class="button logout-button">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'; 

export default {
  name: "PublisherIndex",
  components: {
    Login,
  },
  data() {
    return {
      title: 'Publisher List',
      publishers: [],
      isAuthenticated: false,
    };
  },
  mounted() {

    const cookies = document.cookie.split(';');
    this.isAuthenticated = cookies.some(cookie => cookie.trim().startsWith('userid='));

   
    if (this.isAuthenticated) {
      this.allPublishers();
    }
  },
  methods: {
    handleLogin() {
      this.isAuthenticated = true;
      this.allPublishers(); 
    },
    allPublishers() {
      fetch(this.url + '/.netlify/functions/publisherFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.publishers = items;
        })
        .catch((error) => {
          console.error("Error fetching publishers:", error);
        });
    },
    deletePublisher(id) {
      fetch(this.url + '/.netlify/functions/publisherDelete/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
      })
        .then(() => {
          this.allPublishers(); 
        })
        .catch((error) => {
          console.error("Error deleting publisher:", error);
        });
    },
    logout() {

      document.cookie = 'userid=; Max-Age=0; path=/';

    
      this.isAuthenticated = false;
      this.publishers = [];
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

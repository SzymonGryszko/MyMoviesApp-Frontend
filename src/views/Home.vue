<template>
  <div class="container">
    <div class="row mt-5 d-flex justify-content-center">
      <div class="col-md-12" v-if="!loading">
        <div class="card">
          <div class="card-header d-flex justify-content-between pr-5 pl-5">
            <h3 class="card-title">Movies Table</h3>
            <div class="card-tools">
              <button class="btn btn-success">Add New</button>
            </div>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Modify</th>
                </tr>

                <tr v-for="movie in movies" :key="movie.id">
                  <td>{{ movie.id }}</td>
                  <td>{{ movie.title }}</td>

                  <td>
                    <a href="#" @click="viewMovieDetails(movie)">
                      <i class="fas fa-info-circle yellow"></i>
                    </a>
                    /
                    <a href="#" @click="editMovie(movie)">
                      <i class="fa fa-edit blue"></i>
                    </a>
                    /
                    <a href="#" @click="deleteMovie(movie)">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else class="d-flex flex-column">
        <div class="font-weight-bold">Fetching Data</div>
        <img :src="loadingImage" class="w-24 m-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  mounted() {
    this.getAllMovies();
  },
  data() {
    return {
      loading: true,
      loadingImage: require("../assets/hourglass.gif"),
      editmode: false,
      movies: {},
    };
  },
  methods: {
    getAllMovies() {
      axios
        .get(this.$api)
        .then((response) => {
          this.movies = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.$toast.open({
            message: error,
            type: "error",
            position: "top-right",
            duration: 8000,
          });
        });
    },
    deleteMovie(movie) {
      if (confirm("Delete " + movie.title)) {
        axios
          .delete(this.$api + `/${movie.id}`)
          .then(() => {
            this.getAllMovies();
            this.$toast.open({
            message: 'Item successfully deleted!',
            type: "success",
            position: "top-right",
            duration: 8000,
          });
          })
          .catch((error) => {
            this.$toast.open({
              message: error,
              type: "error",
              position: "top-right",
              duration: 3000,
            });
          });
      }
    },
  },
};
</script>

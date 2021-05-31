<template>
  <div class="container">
    <Modal
      v-show="isModalVisible"
      :propsMovie="movie"
      :isAddMode="this.isAddMode"
      :isViewMode="this.isViewMode"
      :isEditMode="this.isEditMode"
      @close="closeModal"

    />
    <div class="row mt-5 d-flex justify-content-center">
      <div class="col-md-12" v-if="!isLoading && !isFailedToFetchData">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h3 class="card-title">Movies Table</h3>
            <div class="card-tools">
              <button class="btn btn-success" type="button" @click="openAddModeModal()">
                Add New
              </button>
            </div>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th class="col-md-2">ID</th>
                  <th class="col-md-7">Title</th>
                  <th class="col-md-3">Modify</th>
                </tr>

                <tr v-for="movie in movies" :key="movie.id">
                  <td>{{ movie.id }}</td>
                  <td>{{ movie.title }}</td>

                  <td>
                    <a href="#" @click="openViewModeModal(movie)">
                      <i class="fas fa-info-circle"></i>
                    </a>
                    /
                    <a href="#" @click="openEditModeModal(movie)">
                      <i class="fa fa-edit"></i>
                    </a>
                    /
                    <a href="#" @click="deleteMovie(movie)">
                      <i class="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="d-flex flex-column">
        <div class="font-weight-bold">Fetching Data</div>
        <img :src="loadingImage" class="w-24 m-auto" />
      </div>
      <div v-if="isFailedToFetchData" class="d-flex flex-column">
        <div class="font-weight-bold">
          Failed to connect to the server. Try again later!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Modal";

export default {
  name: "Home",
  components: {
    Modal,
  },
  mounted() {
    this.getAllMovies();
  },

  data() {
    return {
      movie: {},
      isModalVisible: false,
      isLoading: true,
      isFailedToFetchData: false,
      loadingImage: require("../assets/hourglass.gif"),
      isEditMode: false,
      isViewMode: false,
      isAddMode: false,
      movies: {},
    };
  },
  methods: {
    getAllMovies() {
      axios
        .get(this.$api)
        .then((response) => {
          this.movies = response.data;
          this.isLoading = false;
          this.isFailedToFetchData = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.isFailedToFetchData = true;
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
              message: "Item successfully deleted!",
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isEditMode = false;
      this.isViewMode = false;
      this.isAddMode = false;
      this.getAllMovies();
    },
    openViewModeModal(movie) {
      this.isViewMode = true;
      this.movie = movie;
      this.showModal();
    },
    openAddModeModal() {
      this.isAddMode = true;
      this.movie = null;
      this.showModal();
    },
    openEditModeModal(movie) {
      this.isEditMode = true;
      this.movie = movie;
      this.showModal();
    },
  },
};
</script>

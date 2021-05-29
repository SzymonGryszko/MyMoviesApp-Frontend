<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Movies</h3>
            <div class="card-tools">
              <button class="btn btn-success" @click="newModal">Add New</button>
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
                    <a href="#" @click="deleteMovie(movie.id)">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      editmode: false,
      movies: [
        {
          id: 2,
          title: "Title after patch Postman",
          yearOfProduction: 2100,
        },
        {
          id: 3,
          title: "Postman Movie 1",
          yearOfProduction: 2003,
        },
        {
          id: 4,
          title: "Postman Movie 1",
          yearOfProduction: 2003,
        },
      ],
    };
  },
};
</script>

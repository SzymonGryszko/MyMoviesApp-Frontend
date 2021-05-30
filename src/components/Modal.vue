<template>
  <div class="modal-backdrop">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <!-- Modeal header -->
        <div class="modal-header">
          <h5 v-if="isAddMode" class="modal-title">Add movie</h5>
          <h5 v-if="isViewMode" class="modal-title">View movie</h5>
          <h5 v-if="isEditMode" class="modal-title">Edit movie</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <slot name="body">
            <!-- View mode modal -->
            <div v-if="isViewMode">
              Movie titled
              <span class="font-italic font-weight-bold">{{
                propsMovie.title
              }}</span
              ><span v-if="propsMovie.yearOfProduction != null">
                was created in {{ propsMovie.yearOfProduction }}.</span
              ><span v-else> - year of production is unknown</span>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="close"
                >
                  Close
                </button>
              </div>
            </div>
            <!-- Add or Edit Mode modal -->
            <form
              v-if="isAddMode || isEditMode"
              @submit.prevent="isEditMode ? updateMovie() : createNewMovie()"
            >
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" />
              </div>
              <label for="firstName">Year of Production</label>
              <input type="number" />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="close"
                >
                  Close
                </button>
                <button
                  v-if="isAddMode || isEditMode"
                  type="submit"
                  class="btn btn-primary"
                >
                  {{ isAddMode ? "Save" : "Save Changes" }}
                </button>
              </div>
            </form>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    propsMovie: Object,
    isEditMode: Boolean,
    isViewMode: Boolean,
    isAddMode: Boolean,
  },
  data() {
    return {
      form: {
        title: "",
        yearOfProduction: null,
      },
    };
  },
  //   validations: {
  //     movie: {
  //       title: { required, max: maxLength(200) },
  //       yearOfProduction: {},
  //     },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
    },
    updateMovie() {
      console.log('update')
    },
    createNewMovie() {
      console.log('create')
    },
  },
};
</script>
<style>
.modal-backdrop {
  opacity: 0.8 !important;
}
</style>

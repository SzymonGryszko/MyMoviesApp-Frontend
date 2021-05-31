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
            @click="closeModal"
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
                  @click="closeModal"
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
                <label for="fTitle">{{ isAddMode ? "Title" : "Updated Title" }}</label>
                <input
                  id="fTitle"
                  class="full w-100"
                  aria-describedby="error-title"
                  v-model="$v.form.title.$model"
                  type="text"
                  :placeholder="this.isEditMode ? this.propsMovie.title : ''"
                />
                <p
                  id="error-title"
                  class="error"
                  v-if="!$v.form.title.required"
                >
                  this field is required
                </p>
                <p class="error" v-if="!$v.form.title.maxLength">
                  Field can have maximum of
                  {{ $v.form.title.$params.maxLength.max }} characters.
                </p>
              </div>
              <div class="form-group">
                <label for="fYearOfProduction">{{ isAddMode ? "Year of Production" : "Updated Year of Production" }}</label>
                <input
                  id="fYearOfProduction"
                  aria-describedby="error-yearOfProduction"
                  class="w-100"
                  type="number"
                  v-model.lazy="$v.form.yearOfProduction.$model"
                  :placeholder="this.isEditMode ? this.propsMovie.yearOfProduction : null"
                />
                <p
                  id="error-yearOfProduction"
                  class="error"
                  v-if="!$v.form.yearOfProduction.between"
                >
                  value should be between
                  {{ $v.form.yearOfProduction.$params.between.min }} and
                  {{ $v.form.yearOfProduction.$params.between.max }}
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="closeModal"
                >
                  Close
                </button>
                <button
                  v-if="isAddMode || isEditMode"
                  type="submit"
                  class="btn btn-primary"
                  :disabled="$v.form.$invalid"
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
import { required, maxLength, between } from "vuelidate/lib/validators";
import axios from "axios";

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
        title:'',
        yearOfProduction: null,
      },
    };
  },
  validations: {
    form: {
      title: { required, maxLength: maxLength(200) },
      yearOfProduction: { between: between(1900, 2100) },
    },
  },
  methods: {
    //close modal and clear form
    closeModal() {
      this.form.title = '';
      this.form.yearOfProduction = null;
      this.$emit("close");
    },
    updateMovie() {
      this.formTouched = !this.$v.form.$anyDirty;
      this.hasFormErrors = this.$v.form.$anyError;
      if (this.hasFormErrors === false && this.formTouched === false) {
        //axios call to update the movie
        axios
          .patch(this.$api + `/${this.propsMovie.id}`, {
            title: this.form.title,
            yearOfProduction: this.form.yearOfProduction,
          })
          .then(() => {
            //display toast and close modal
            this.$toast.open({
              message: "Movie updated",
              type: "success",
              position: "top-right",
              duration: 3000,
            });
            this.closeModal();
          })
          .catch((error) => {
            this.$toast.open({
              message: error,
              type: "error",
              position: "top-right",
              duration: 8000,
            });
            this.closeModal();
          });
      }
    },
    createNewMovie() {
      this.formTouched = !this.$v.form.$anyDirty;
      this.hasFormErrors = this.$v.form.$anyError;
      if (this.hasFormErrors === false && this.formTouched === false) {
        //axios call to save a movie
        axios
          .post(this.$api, {
            title: this.form.title,
            yearOfProduction: this.form.yearOfProduction,
          })
          .then(() => {
            //display toast and close modal
            this.$toast.open({
              message: "Movie saved",
              type: "success",
              position: "top-right",
              duration: 3000,
            });
            this.closeModal();
          })
          .catch((error) => {
            this.$toast.open({
              message: error,
              type: "error",
              position: "top-right",
              duration: 8000,
            });
            this.closeModal();
          });
      }
    },
  },
};
</script>
<style>
.modal-backdrop {
  opacity: 0.8 !important;
}
.error {
  color: red;
  font-size: 12px;
}
</style>

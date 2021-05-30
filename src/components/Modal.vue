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
                <label for="Title">Title</label>
                <input
                  class="full"
                  v-model="$v.form.title.$model"
                  type="text"
                />
                <p class="error" v-if="!$v.form.title.required">
                  this field is required
                </p>
                <p class="error" v-if="!$v.form.title.maxLength">
                  Field can have maximum of
                  {{ $v.form.title.$params.maxLength.max }} characters.
                </p>
              </div>
              <div class="form-group">
                <label for="yearOfProduction">Year of Production</label>
                <input
                  type="number"
                  v-model.lazy="$v.form.yearOfProduction.$model"
                />
                <p class="error" v-if="!$v.form.yearOfProduction.between">
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
import { required, maxLength, between } from "vuelidate/lib/validators";

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
  validations: {
    form: {
      title: { required, maxLength: maxLength(200) },
      yearOfProduction: { between: between(1900, 2100) },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
    },
    updateMovie() {
      console.log("update");
    },
    createNewMovie() {
      this.formTouched = !this.$v.form.$anyDirty;
      this.hasFormErrors = this.$v.form.$anyError;
      if (this.hasFormErrors === false && this.formTouched === false) {
        //axios call to save a movie
        console.log("save");
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
}
</style>

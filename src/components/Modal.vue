<template>
  <transition name="modal-fade">

      <div class="modal-backdrop">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <slot name="body"> This is the default body! </slot>
            </div>

            <footer class="modal-footer">
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="close"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      form: {
        title: "",
        yearOfProduction: null,
      },
    };
  },
  //   validations: {
  //     form: {
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
  },
};
</script>
<style>
.modal-backdrop {
  opacity: 0.5 !important;
}
</style>
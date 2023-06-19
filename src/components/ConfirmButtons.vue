<template>
  <div id="btnDiv">
    <button class="btn" @click="okClicked()">ok</button>
    <button class="btn" @click="cancelClicked()">cancel</button>
  </div>
</template>

<script>
export default {
  props: [],
  emits: ["okClicked", "cancelClicked"],
  data: function () {
    return {};
  },
  methods: {
    okClicked() {
      this.$emit("okClicked");
    },
    cancelClicked() {
      this.$emit("cancelClicked");
    },
  },
};
</script>
<style>
#btnDiv {
  padding: 15px 0;
}
.btn {
  margin-right: 15px;
}
</style>

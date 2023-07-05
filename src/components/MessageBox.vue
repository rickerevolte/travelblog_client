<template>
  <div id="MessageComponent">
    {{ MessageToUser }}
    <ConfirmButtons
      v-if="showBtnBox"
      @ok-clicked="
        () => {
          emitOK();
        }
      "
      @cancel-clicked="
        () => {
          emitCancel();
        }
      "
    >
    </ConfirmButtons>
    <div v-else></div>
  </div>
</template>

<script>
import ConfirmButtons from "../components/ConfirmButtons.vue";
export default {
  components: {
    ConfirmButtons,
  },
  props: ["MessageToUser", "showBtnBox", "button"],
  emits: ["ok", "cancel"],
  data: function () {
    return {
      BtnDisplay: "block",
    };
  },
  methods: {
    emitOK() {
      this.$emit("ok");
    },
    emitCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
#MessageComponent {
  width: 400px;
  /* height: 200px; */
  display: block;
  width: 61ch;
  padding: 10px, 10px;
  /* border: black solid 1px; */
  background-color: #ebebeb;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
  padding-left: 5px;
}
</style>

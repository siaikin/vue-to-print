<script setup lang="ts">
// #region script
import { useVueToPrint } from "vue-to-print";
import { reactive, ref } from "vue";
import ShadowDomToPrint from "./ShadowDomToPrint.vue";

const componentRef = ref();
const state = reactive({ text: "old boring text" });

const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "AwesomeFileName",
  removeAfterPrint: true
});
// #endregion script
</script>

// #region template
<template>
  <ion-button @click="handlePrint">Print</ion-button>
  <shadow-dom-to-print ref="componentRef" :text="state.text" />
</template>

<style scoped></style>
// #endregion template

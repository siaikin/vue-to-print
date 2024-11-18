<script setup lang="ts">
import { useVueToPrint } from "vue-to-print";
import { reactive, ref } from "vue";
import ComponentToPrint from "./ComponentToPrint.vue";

const componentRef = ref();
const state = reactive({ text: "old boring text" });

const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "AwesomeFileName",
  removeAfterPrint: true
});
</script>

<template>
  <ion-button @click="handlePrint">Print</ion-button>
  <component-to-print ref="componentRef" :text="state.text" />
</template>

<style scoped></style>

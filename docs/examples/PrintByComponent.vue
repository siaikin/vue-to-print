<script setup lang="ts">
import { VueToPrint } from "vue-to-print";
import { reactive, ref } from "vue";
import ComponentToPrint from "./ComponentToPrint.vue";

const componentRef = ref();
const state = reactive({ text: "old boring text" });
</script>

<template>
  <vue-to-print
    :content="componentRef"
    document-title="AwesomeFileName"
    remove-after-print
  >
    <template #trigger>
      <ion-button>Print</ion-button>
    </template>
  </vue-to-print>
  <component-to-print ref="componentRef" :text="state.text" />
</template>

<style scoped></style>

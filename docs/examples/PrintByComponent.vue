<script setup lang="ts">
// #region script
import { VueToPrint } from "vue-to-print";
import { reactive, ref } from "vue";
import ComponentToPrint from "./ComponentToPrint.vue";

const componentRef = ref();
const state = reactive({ text: "old boring text" });

const getComponentToPrint = () => {
  return componentRef.value;
};
// #endregion script
</script>

// #region template
<template>
  <vue-to-print
    :content="getComponentToPrint"
    document-title="AwesomeFileName"
    remove-after-print
  >
    <template #trigger>
      <ion-button>Print</ion-button>
    </template>
  </vue-to-print>
  <div ref="componentRef">
    <component-to-print :text="state.text" />
  </div>
</template>

<style scoped></style>
// #endregion template

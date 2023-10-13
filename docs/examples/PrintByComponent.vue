<script setup lang="ts">
// #region script
import { VueToPrint } from "vue-to-print";
import { reactive, ref } from "vue-demi";
import ComponentToPrint from "./ComponentToPrint.vue";

const componentRef = ref();
const state = reactive({
  isLoading: false,
  text: "old boring text"
});

const handleAfterPrint = () => {
  console.log("`onAfterPrint` called"); // tslint:disable-line no-console
};

const handleBeforePrint = () => {
  console.log("`onBeforePrint` called"); // tslint:disable-line no-console
};

const handleOnBeforeGetContent = () => {
  console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
  state.text = "Loading new text...";
  state.isLoading = true;

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      state.text = "New, Updated Text!";
      state.isLoading = false;

      resolve();
    }, 2000);
  });
};

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
    :on-after-print="handleAfterPrint"
    :on-before-get-content="handleOnBeforeGetContent"
    :on-before-print="handleBeforePrint"
    remove-after-print
  >
    <template #trigger>
      <button>Print using a Component</button>
    </template>
  </vue-to-print>
  <p v-if="state.isLoading" class="indicator">onBeforeGetContent: Loading...</p>
  <div ref="componentRef">
    <component-to-print :text="state.text" />
  </div>
</template>

<style scoped></style>
// #endregion template

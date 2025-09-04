# Getting Started

## Prerequisites

- [Vue.js](https://vuejs.org/) 3.x

## Installation

::: code-group

```shell [npm]
$ npm install vue-to-print --save
```

```shell [pnpm]
$ pnpm add vue-to-print
```

```shell [yarn]
$ yarn add vue-to-print
```

:::

## Usage

You can use `vue-to-print` by combining the Composition API ([`useVueToPrint`](#print-using-hook-recommended)).

The only required parameter is `content`, which is a `ref` pointing to the HTML element you want to print.

```vue {7}
<script setup lang="ts">
import { useVueToPrint } from "vue-to-print";
import { ref } from "vue";

const componentRef = ref();
const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "AwesomeFileName",
});
</script>

<template>
  <button @click="handlePrint">Print</button>
  <div ref="componentRef">
    <h1>Hello, world!</h1>
  </div>
</template>
```

## Online Example

[![Edit vite-vue-typescript-starter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/github/siaikin/vue-to-print-example?embed=1)

## AI Assistant Integration

For users working with AI programming assistants (like ChatGPT, Claude, GitHub Copilot, etc.), you can provide the comprehensive project information to your AI assistant by sharing our documentation files:

**📋 Quick Reference:** [https://vue-to-print.siaikin.website/llms.txt](https://vue-to-print.siaikin.website/llms.txt)
- Compact overview with documentation links

**📚 Complete Documentation:** [https://vue-to-print.siaikin.website/llms-full.txt](https://vue-to-print.siaikin.website/llms-full.txt)  
- Full API documentation with examples
- Recommended for detailed implementation help

Simply share the appropriate URL with your AI assistant to help them better understand the vue-to-print library and provide more accurate assistance with your implementation.
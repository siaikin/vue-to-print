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
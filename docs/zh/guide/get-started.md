# 入门指南

## 先决条件

- [Vue.js](https://vuejs.org/) 3.x

## 安装

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

## 使用

你可以通过组合式 API([useVueToPrint](basic-usage.md#print-using-hook-recommended))来使用 `vue-to-print`。
其中唯一必填的参数是 `content`, 它是一个 `ref`，指向你想要打印的 HTML 元素。

```vue {7}
<script setup lang="ts">
import { useVueToPrint } from "vue-to-print";
import { ref } from "vue";

const componentRef = ref();
const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "奥森文件名称",
});
</script>

<template>
  <button @click="handlePrint">Print</button>
  <div ref="componentRef">
    <h1>Hello, world!</h1>
  </div>
</template>
```

## 在线示例

<a href="https://stackblitz.com/edit/vitejs-vite-32bxkk?file=src%2Fcomponents%2FComponentToPrint.vue">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>

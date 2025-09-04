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

[![Edit vite-vue-typescript-starter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/github/siaikin/vue-to-print-example?embed=1)

## AI 助手集成

对于使用 AI 编程助手（如 ChatGPT、Claude、GitHub Copilot 等）的用户，您可以通过分享我们的文档文件来为您的 AI 助手提供全面的项目信息：

**📋 快速参考：** [https://vue-to-print.siaikin.website/llms.txt](https://vue-to-print.siaikin.website/llms.txt)
- 简洁的概述和文档链接

**📚 完整文档：** [https://vue-to-print.siaikin.website/llms-full.txt](https://vue-to-print.siaikin.website/llms-full.txt)  
- 完整的 API 文档和示例
- 推荐用于详细的实现帮助

只需与您的 AI 助手分享适当的 URL，即可帮助它们更好地理解 vue-to-print 库，并为您的实现提供更准确的帮助。

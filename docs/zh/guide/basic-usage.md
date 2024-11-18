---
head:
  - - script
    - type: module
      src: https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js
  - - script
    - nomodule: ""
      src: https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js
  - - script
    - rel: stylesheet
      href: https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css
---

# 基本使用

<script setup>
import PrintByComponent from "../../examples/PrintByComponent.vue"; 
import PrintByHook from "../../examples/PrintByHook.vue"; 
import PrintShadowDomByHook from "../../examples/shadow-dom/PrintShadowDomByHook.vue";
</script>

## 使用 hook 进行打印 (推荐)

<PrintByHook />

::: details 点击查看代码

::: code-group
<<< @/examples/PrintByHook.vue{vue}
<<< @/examples/ComponentToPrint.vue{vue} [printed component]
:::

## 使用组件进行打印

<PrintByComponent />

::: details 点击查看代码

::: code-group
<<< @/examples/PrintByComponent.vue{vue}
<<< @/examples/ComponentToPrint.vue{vue} [printed component]
:::

## 打印 [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

这个示例将打印来自 [Ionic](https://ionicframework.com/) 的 `Web Components` 组件.

<PrintShadowDomByHook />

::: details Click to view code

::: code-group
<<< @/examples/shadow-dom/PrintShadowDomByHook.vue{vue}
<<< @/examples/shadow-dom/ShadowDomToPrint.vue{vue} [printed component]
:::

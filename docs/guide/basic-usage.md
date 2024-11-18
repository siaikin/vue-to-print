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

# Basic Usage

<script setup>
import PrintByComponent from "../examples/PrintByComponent.vue"; 
import PrintByHook from "../examples/PrintByHook.vue"; 
import PrintShadowDomByHook from "../examples/shadow-dom/PrintShadowDomByHook.vue";
</script>

## Print using hook (recommended)

<PrintByHook />

::: details Click to view code

::: code-group
<<< @/examples/PrintByHook.vue{vue}
<<< @/examples/ComponentToPrint.vue{vue} [printed component]
:::

## Print using a component

<PrintByComponent />

::: details Click to view code

::: code-group
<<< @/examples/PrintByComponent.vue{vue}
<<< @/examples/ComponentToPrint.vue{vue} [printed component]
:::

## Print [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

This example will print `Web Components` components from [Ionic](https://ionicframework.com/).

<PrintShadowDomByHook />

::: details Click to view code

::: code-group
<<< @/examples/shadow-dom/PrintShadowDomByHook.vue{vue}
<<< @/examples/shadow-dom/ShadowDomToPrint.vue{vue} [printed component]
:::

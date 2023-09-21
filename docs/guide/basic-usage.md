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

## Print using a component

<PrintByComponent />

::: details Click to view code

::: code-group
<<< @/examples/PrintByComponent.vue#script{typescript} [script setup ts]
<<< @/examples/PrintByComponent.vue#template{html} [template]
:::

## Print using hook

<PrintByHook />

::: details Click to view code

::: code-group
<<< @/examples/PrintByHook.vue#script{typescript} [script setup ts]
<<< @/examples/PrintByHook.vue#template{html} [template]
:::

## Print [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

This example will print `Web Components` components from [Ionic](https://ionicframework.com/).

<PrintShadowDomByHook />

::: details Click to view code

::: code-group
<<< @/examples/shadow-dom/PrintShadowDomByHook.vue#script{typescript} [script setup ts]
<<< @/examples/shadow-dom/PrintShadowDomByHook.vue#template{html} [template]
:::

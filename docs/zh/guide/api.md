# API

## VueToPrint Component

### 参数

|            属性名            | 类型                                                                       | 描述                                                                                                                                                                                                                                         |
|:-------------------------:|:-------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|       **`content`**       | `HTMLElement, ComponentPublicInstance`                                   | 要打印的 DOM 元素。                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|     **`bodyClass?`**      | `string`                                                                 | 一个或多个类名，用空格分隔，传递到打印窗口                                                                                                                                                                                                                      |
|     **`copyStyles?`**     | `boolean`                                                                | 将父窗口中`<head>`内的所有`<style>`和`<link type="stylesheet" />`标签复制到打印窗口中。 (默认值: `true`)                                                                                                                                                           |
|   **`documentTitle?`**    | `string`                                                                 | 在保存为文件时设置打印的标题                                                                                                                                                                                                                             |
|       **`fonts?`**        | `{ family: string, source: string; weight?: string; style?: string; }[]` | 可以选择提供字体列表，这些字体将加载到打印的 iframe 中。如果使用自定义字体，则这很有用                                                                                                                                                                                            |
|    **`onAfterPrint?`**    | `function`                                                               | 在打印对话框关闭后触发的回调函数，无论用户选择打印还是取消                                                                                                                                                                                                              |
| **`onBeforeGetContent?`** | `function`                                                               | 在库收集页面内容之前触发的回调函数。返回 void 或 Promise。这可用于在打印之前更改页面上的内容                                                                                                                                                                                      |
|   **`onBeforePrint?`**    | `function`                                                               | 在打印之前触发的回调函数。返回 void 或 Promise。注意：此函数在打印之前立即运行，但在收集页面内容之后运行。要在打印之前修改内容，请改用`onBeforeGetContent`                                                                                                                                             |
|    **`onPrintError?`**    | `function`                                                               | 如果有严重的打印错误，无法继续打印，则调用回调函数（签名：`function(errorLocation: 'onBeforePrint' \| 'onBeforeGetContent' \| 'print', error: Error)`)。目前仅限于`onBeforeGetContent`、`onBeforePrint`和`print`中的 Promise 拒绝。使用此功能再次尝试打印。`errorLocation`将告诉您 Promise 在哪个回调中被拒绝 |
|     **`pageStyle?`**      | `string` or `function`                                                   | 我们设置了一些基本样式，以帮助改善页面打印。使用此选项覆盖它们并提供自己的样式。如果作为函数给出，则必须返回一个`string`                                                                                                                                                                           |
|       **`print?`**        | `function`                                                               | 如果传递，则使用此函数而不是`window.print`来打印内容。此函数传递用于收集打印内容的 iframe `HTMLIFrameElement`。完成后，此函数必须返回一个 Promise。使用此功能在非浏览器环境（如 Electron）中打印                                                                                                              |
|  **`removeAfterPrint?`**  | `boolean`                                                                | 执行操作后删除打印 iframe。默认为`false`                                                                                                                                                                                                                |
|   **`suppressErrors?`**   | `boolean`                                                                | 当传递时，防止`console`记录错误                                                                                                                                                                                                                       |
|       **`nonce?`**        | `string`                                                                 | 为 CSP（内容安全策略）设置 nonce 属性，以使脚本和样式元素获得白名单                                                                                                                                                                                                    |

### Slots

|       名称       | 类型                                     | 描述                                                                                                |
|:--------------:|:---------------------------------------|:--------------------------------------------------------------------------------------------------|
| **`default`**  | `v-slot="{ handlePrint: () => void }"` | 返回 Vue 节点或元素的函数。`handlePrint`是触发打印对话框的函数。                                                         |
| **`trigger?`** | `v-slot:trigger`                       | 返回 Vue 节点或元素的函数。注意：在底层，我们将自定义的`onClick`属性注入返回的组件/元素中。因此，请不要为由`trigger`返回的根节点提供`onClick`属性，因为它将被覆盖 |

## useVueToPrint Hook

### 示例

```vue {7}
<script setup lang="ts">
import { useVueToPrint } from "vue-to-print";
import { ref } from "vue";

const componentRef = ref();
const { handlePrint } = useVueToPrint({ content: componentRef });
</script>

<template>
  <button @click="handlePrint">打印</button>
  <div ref="componentRef">
    <h1>Hello, world!</h1>
  </div>
</template>
```

### 类型定义
    
```typescript
declare function useVueToPrint(
  options: PublicUseVueToPrintProps
): { handlePrint: () => void };

// content 参数是必须的，其他参数是可选的
declare type PublicUseVueToPrintProps =
  Partial<Omit<UseVueToPrintProps, "content">>
  & Pick<UseVueToPrintProps, "content">;

// 参数说明见上方 VueToPrint Component 参数说明
export interface UseVueToPrintProps {
    bodyClass: MaybeRefOrGetter<string>;
    content: MaybeRefOrGetter<HTMLElement | ComponentPublicInstance>;
    copyStyles: MaybeRefOrGetter<boolean>;
    documentTitle: MaybeRefOrGetter<string>;
    fonts: MaybeRefOrGetter<Font[]>;
    onAfterPrint: MaybeRefOrGetter<() => void>;
    onBeforeGetContent: MaybeRefOrGetter<() => void | Promise<void>>;
    onBeforePrint: MaybeRefOrGetter<() => void | Promise<void>>;
    onPrintError: MaybeRefOrGetter<(
    errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print",
    error: Error
    ) => void>;
    pageStyle: MaybeRefOrGetter<string | PropertyFunction<string>>;
    print: MaybeRefOrGetter<(target: HTMLIFrameElement) => Promise<void>>;
    removeAfterPrint: MaybeRefOrGetter<boolean>;
    suppressErrors: MaybeRefOrGetter<boolean>;
    nonce: MaybeRefOrGetter<string>;
}

```

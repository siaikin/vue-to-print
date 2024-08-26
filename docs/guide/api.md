# API

## VueToPrint Component

### Props

|           Name            | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-----------------------: | :----------------------------------------------------------------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     **`bodyClass?`**      | `string`                                                                 | One or more class names to pass to the print window, separated by spaces                                                                                                                                                                                                                                                                                                                                                              |
|       **`content`**       | `function`                                                               | A DOM element to print.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|     **`copyStyles?`**     | `boolean`                                                                | Copy all `<style>` and `<link type="stylesheet" />` tags from `<head>` inside the parent window into the print window. (default: `true`)                                                                                                                                                                                                                                                                                              |
|   **`documentTitle?`**    | `string`                                                                 | Set the title for printing when saving as a file                                                                                                                                                                                                                                                                                                                                                                                      |
|       **`fonts?`**        | `{ family: string, source: string; weight?: string; style?: string; }[]` | You may optionally provide a list of fonts which will be loaded into the printing iframe. This is useful if you are using custom fonts                                                                                                                                                                                                                                                                                                |
|    **`onAfterPrint?`**    | `function`                                                               | Callback function that triggers after the print dialog is closed regardless of if the user selected to print or cancel                                                                                                                                                                                                                                                                                                                |
| **`onBeforeGetContent?`** | `function`                                                               | Callback function that triggers before the library gathers the page's content. Either returns void or a Promise. This can be used to change the content on the page before printing                                                                                                                                                                                                                                                   |
|   **`onBeforePrint?`**    | `function`                                                               | Callback function that triggers before print. Either returns void or a Promise. Note: this function is run immediately prior to printing, but after the page's content has been gathered. To modify content before printing, use `onBeforeGetContent` instead                                                                                                                                                                         |
|    **`onPrintError?`**    | `function`                                                               | Callback function (signature: `function(errorLocation: 'onBeforePrint' \| 'onBeforeGetContent' \| 'print', error: Error)`) that will be called if there is a printing error serious enough that printing cannot continue. Currently limited to Promise rejections in `onBeforeGetContent`, `onBeforePrint`, and `print`. Use this to attempt to print again. `errorLocation` will tell you in which callback the Promise was rejected |
|     **`pageStyle?`**      | `string` or `function`                                                   | We set some basic styles to help improve page printing. Use this to override them and provide your own. If given as a function it must return a `string`                                                                                                                                                                                                                                                                              |
|       **`print?`**        | `function`                                                               | If passed, this function will be used instead of `window.print` to print the content. This function is passed the `HTMLIFrameElement` which is the iframe used internally to gather content for printing. When finished, this function must return a Promise. Use this to print in non-browser environments such as Electron                                                                                                          |
|  **`removeAfterPrint?`**  | `boolean`                                                                | Remove the print iframe after action. Defaults to `false`                                                                                                                                                                                                                                                                                                                                                                             |
|   **`suppressErrors?`**   | `boolean`                                                                | When passed, prevents `console` logging of errors                                                                                                                                                                                                                                                                                                                                                                                     |
|       **`nonce?`**        | `string`                                                                 | Set the nonce attribute for whitelisting script and style -elements for CSP (content security policy)                                                                                                                                                                                                                                                                                                                                 |

### Slots

|      Name      | Type                                   | Description                                                                                                                                                                                                                                             |
| :------------: | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`default`**  | `v-slot="{ handlePrint: () => void }"` | A function that returns a Vue Node or Element. `handlePrint` is a function that triggers the print dialog.                                                                                                                                              |
| **`trigger?`** | `v-slot:trigger`                       | A function that returns a Vue Node or Element. Note: under the hood, we inject a custom `onClick` prop into the returned Component/Element. As such, do not provide an `onClick` prop to the root node returned by `trigger`, as it will be overwritten |

## useVueToPrint Hook

### Type Definitions

```typescript
declare function useVueToPrint(options: PublicUseVueToPrintProps): { handlePrint: () => void };

// content is required, other props are optional
declare type PublicUseVueToPrintProps = Partial<Omit<UseVueToPrintProps, "content">> & Pick<UseVueToPrintProps, "content">;

// See above for parameter descriptions
export interface UseVueToPrintProps {
    bodyClass: MaybeRefOrGetter<string>;
    content: MaybeRefOrGetter<HTMLElement>;
    copyStyles: MaybeRefOrGetter<boolean>;
    documentTitle: MaybeRefOrGetter<string>;
    fonts: MaybeRefOrGetter<Font[]>;
    onAfterPrint: MaybeRefOrGetter<() => void>;
    onBeforeGetContent: MaybeRefOrGetter<() => void | Promise<void>>;
    onBeforePrint: MaybeRefOrGetter<() => void | Promise<void>>;
    onPrintError: MaybeRefOrGetter<(errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void>;
    pageStyle: MaybeRefOrGetter<string | PropertyFunction<string>>;
    print: MaybeRefOrGetter<(target: HTMLIFrameElement) => Promise<void>>;
    removeAfterPrint: MaybeRefOrGetter<boolean>;
    suppressErrors: MaybeRefOrGetter<boolean>;
    nonce: MaybeRefOrGetter<string>;
}

```

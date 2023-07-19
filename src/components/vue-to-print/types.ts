import type { ComponentPublicInstance, ExtractPropTypes, PropType, Slot } from "vue";

export const vueToPrintProps = () =>
  ({
    /**
     *  Class to pass to the print window body
     */
    bodyClass: {
      type: String,
      default: ""
    },
    /**
     *  Content to be printed
     */
    content: {
      type: Function as PropType<() => HTMLElement>,
      default: null
    },
    /**
     *  Copy styles over into print window. default: true
     */
    copyStyles: {
      type: Boolean,
      default: true
    },
    /**
     * Set the title for printing when saving as a file.
     * Will result in the calling page's `<title>` being temporarily changed while printing.
     */
    documentTitle: {
      type: String,
      default: ""
    },
    /**
     *  Pre-load these fonts to ensure availability when printing
     */
    fonts: {
      type: Array as PropType<Font[]>,
      default: () => []
    },
    /**
     *  Callback function to trigger after print
     */
    onAfterPrint: {
      type: Function as PropType<() => void>,
      default: null
    },
    /**
     *  Callback function to trigger before page content is retrieved for printing
     */
    onBeforeGetContent: {
      type: Function as PropType<() => void | Promise<void>>,
      default: null
    },
    /**
     *  Callback function to trigger before print
     */
    onBeforePrint: {
      type: Function as PropType<() => void | Promise<void>>,
      default: null
    },
    /**
     *  Callback function to listen for printing errors
     */
    onPrintError: {
      type: Function as PropType<
        (errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void
      >,
      default: null
    },
    /**
     *  Override default print window styling
     */
    pageStyle: {
      type: [String, Function] as PropType<string | PropertyFunction<string>>,
      default: `
        @page {
            /* Remove browser default header (title) and footer (url) */
            margin: 0;
        }
        @media print {
            body {
                /* Tell browsers to print background colors */
                -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
                color-adjust: exact; /* Firefox */
            }
        }
    `
    },
    /**
     *  Override the default `window.print` method that is used for printing
     */
    print: {
      type: Function as PropType<(target: HTMLIFrameElement) => Promise<void>>,
      default: null
    },
    /**
     * Remove the iframe after printing.
     * NOTE: `onAfterPrint` will run before the iframe is removed
     */
    removeAfterPrint: {
      type: Boolean,
      default: false
    },
    /**
     *  Suppress error messages
     */
    suppressErrors: {
      type: Boolean,
      default: false
    },
    /**
     *  Set the nonce attribute for whitelisting script and style -elements for CSP (content security policy)
     */
    nonce: {
      type: String,
      default: ""
    },
    contextSlots: {
      type: Object as PropType<VueToPrintSlots>
    }
  } as const);

export type VueToPrintProps = ExtractPropTypes<ReturnType<typeof vueToPrintProps>>;

// export type VueToPrintEmits = {
//   /**
//    *  Callback function to trigger after print
//    */
//   afterPrint: () => void,
//   /**
//    *  Callback function to trigger before page content is retrieved for printing
//    */
//   beforeGetContent: () => void | Promise<void>,
//   /**
//    *  Callback function to trigger before print
//    */
//   beforePrint: () => void | Promise<void>,
//   /**
//    *  Callback function to listen for printing errors
//    */
//   printError: (errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void,
// }

export type VueToPrintExpose = {
  handlePrint: () => void;
};

export type VueToPrintSlots = {
  default: Slot;
  trigger: Slot;
};

export type VueToPrintInstance = ComponentPublicInstance<VueToPrintProps, VueToPrintExpose>;

// https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace
export type Font = {
  family: string;
  source: string;
  weight?: string;
  style?: string;
};

export type PropertyFunction<T> = () => T;

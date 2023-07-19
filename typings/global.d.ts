declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VueToPrint: typeof import("vue-to-print")["VueToPrint"];
  }
}

export {};

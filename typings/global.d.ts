declare module "vue" {
  export interface GlobalComponents {
    VueToPrint: typeof import("vue-to-print")["VueToPrint"];
  }
}

export {};

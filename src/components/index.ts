import * as Components from "./components";
import type { App } from "vue-demi";
import type { Component, Plugin } from "vue-demi";

export const install = function (app: App) {
  const keys = Object.keys(Components);
  keys.forEach((key) => {
    // @ts-ignore
    const component = Components[key];
    app.use(installToVue(component));
  });
};

function installToVue<T extends Component>(component: T): Plugin {
  return {
    install: (app) => {
      const name = component.name;
      if (typeof name !== "string" || name.length <= 0)
        throw new Error("Component name is required");
      app.component(name, component);
    }
  };
}

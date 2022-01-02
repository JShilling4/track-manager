import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { App } from "vue";

export default {
  install(app: App<Element>): void {
    const baseComponents = require.context("../components/base/", false, /[A-Za-z0-9-_,\s]+\.vue$/i);

    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")));

      // export default
      app.component(`${componentName}`, componentConfig.default || componentConfig);
    });
  }
};

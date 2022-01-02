declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, never>;
  // noinspection JSDuplicatedDeclarations
  export default component;
}

declare module "*.vue" {
  import Vue from "vue";
  const value: Vue.VueConstructor<Vue>;
  // noinspection JSDuplicatedDeclarations
  export default value;
}

declare module "@/components/*" {
  import Vue from "vue";
  const value: Vue.VueConstructor<Vue>;
  // noinspection JSDuplicatedDeclarations
  export default value;
}

declare module "@/views/*" {
  import Vue from "vue";
  const value: Vue.VueConstructor<Vue>;
  // noinspection JSDuplicatedDeclarations
  export default value;
}

declare module "*.json" {
  const value: never;
  export default value;
}

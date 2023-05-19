declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions & any
    export default componentOptions
  }

declare const TXLivePusher: any;

// 다른 vue 알람 라이브러리
// https://madewithvuejs.com/blog/best-vue-js-notification-components

// https://vue-toastification.maronato.dev/?ref=madewithvuejs.com

import Toast, { PluginOptions, useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
  position: "top-right",
  timeout: 1079,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
} as PluginOptions;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
  const toastAlert = useToast();
  return {
    provide: {
      toastAlert: (msg: string) => {
        toastAlert(msg);
      },
      toastAlertSuccess: (msg: string) => {
        toastAlert.success(msg);
      },
      toastError: (msg: string) => {
        toastAlert.error(msg);
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $toastAlert(msg: string): void;
    $toastAlertSuccess(msg: string): void;
    $toastError(msg: string): void;
  }
}

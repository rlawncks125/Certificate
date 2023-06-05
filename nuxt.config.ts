// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-icon", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  build: {
    transpile: ["vue-toastification"],
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      isDeploy: process.env.NODE_ENV === "development" ? false : true,
    },
  },

  ignore:
    process.env.NODE_ENV === "development" ? [] : ["pages/CreateQuestion.vue"],
});

// runtimeConfig 타입 정의
declare module "@nuxt/schema" {
  interface RuntimeConfig {}
  interface PublicRuntimeConfig {
    isDeploy: boolean;
  }
}

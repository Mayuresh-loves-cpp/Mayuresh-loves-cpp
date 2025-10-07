import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";

import App from "./App.vue";
import CMatrix from "./pages/CMatrix.vue";
import Shell from "./components/Shell.vue";

import "primeicons/primeicons.css";
import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);

const routes = [
  { name: "shell", path: "/", component: Shell },
  { name: "cmatrix", path: "/cmatrix", component: CMatrix },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.mount("#app");

<template>
  <!-- <h1></h1> -->
  <!-- <Shell></Shell> -->
  <RouterView />
  <Toast position="bottom-center" group="headless" style="width: 90%">
    <template #container="{ closeCallback }">
      <div
        style="
          width: 100%;
          padding: 5%;
          display: flex;
          justify-content: space-between;
          font-family: 'Ubuntu Mono', monospace;
          color: chartreuse;
          background-color: black;
          border: chartreuse solid 0.1vh;
          border-radius: 1.5vh;
        "
      >
        <span style="vertical-align: middle">
          Please use
          <span class="pi pi-arrow-right" style="font-size: 1.5vh"></span>
          button to send command on mobile devices
        </span>
        <Avatar class="pi pi-times" @click="closeCallback" />
      </div>
    </template>
  </Toast>
</template>

<script setup>
import Shell from "./components/Shell.vue";
import { Toast } from "primevue";

console.log(navigator.userAgent);
const regExForMobileDevices =
  /Mobile|Tablet|iP(hone|ad|od)|Android|BlackBerry|WebOS/i;

const isMobileDevice = regExForMobileDevices.test(navigator.userAgent);

import { useToast } from "primevue/usetoast";
import { onMounted } from "vue";

const toast = useToast();
onMounted(() => {
  if (isMobileDevice) {
    toast.add({
      severity: "custom",
      group: "headless",
      summary: "Please use -> button to send command",
      // life: 4000,
      class: "custom-toast",
      closeButtonProps: { style: "display: none;" },
    });
  }
});
</script>

<style scoped>
/* textarea {
  width: max-content;
  outline: none;
  border: none;
} */

/* .custom-toast {
  display: none !important;
} */
</style>

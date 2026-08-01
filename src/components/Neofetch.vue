<template>
  <!-- <neofetchSvg></neofetchSvg> -->
  <div class="neofetch-container">
    <!-- <div class="gif-wrapper">
      <img src="https://files.catbox.moe/mgunnp.gif" alt="not found" class="gif" />
    </div> -->
    <pre class="neofetch-ascii">
     \_______/
 `.,-'\_____/`-.,'
  /`..'\ _ /`.,'\
 /  /`.,' `.,'\  \
/__/__/     \__\__\__
\  \  \     /  /  /
 \  \,'`._,'`./  /
  \,'`./___\,'`./
 ,'`-./_____\,-'`.
     /       \
     </pre>
    <div class="neofetch-info">
      <span>
        <span class="neofetch-header">Platform</span>@<span
          class="neofetch-header"
          >Web</span
        >
      </span>
      <span>------------</span>
      <span
        ><span class="neofetch-header">Browser</span>: {{ browserInfo }}</span
      >
      <span> <span class="neofetch-header">OS</span>: {{ osInfo }} </span>
      <span> <span class="neofetch-header">CPU Cores</span>: {{ cpuCores }} </span>
      <span v-if="deviceMemory !== null">
        <span class="neofetch-header">RAM</span>:
        {{ `${jsHeap?.used || 0}GB/${deviceMemory?.toFixed(2) || 0}GB` }}
        <span class="neofetch-tooltip"
          ><i>*usage shown here is the ram usage of current web page</i></span
        >
      </span>
      <span>
        <span class="neofetch-header">Resolution</span>: {{ resolution }}
      </span>
      <span v-if="isBatterySupported">
        <span class="neofetch-header">Battery</span>: {{ batteryInfo }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, shallowRef } from "vue";

// Function to detect the browser
const browserInfo = ref();

function detectBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";

  return "Unknown";
}

// Function to detect the operating system
const osInfo = ref();

function detectOS() {
  const ua = navigator.userAgent;
  const platform = navigator.platform || "";

  if (/Windows/.test(ua)) return "Windows";
  if (/Mac OS X/.test(ua) && !/iPhone|iPad|iPod/.test(ua)) return "macOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Linux/.test(ua) && !/Android/.test(ua)) return "Linux";

  return "Unknown";
}

// Function to get memory information
const deviceMemory = ref(null);
const jsHeap = ref(null);

function getMemoryInfo() {
  deviceMemory.value = navigator.deviceMemory ?? null;

  if (performance.memory) {
    jsHeap.value = {
      used: +(performance.memory.usedJSHeapSize / 1024 ** 3).toFixed(2),
      total: +(performance.memory.totalJSHeapSize / 1024 ** 3).toFixed(2),
      limit: +(performance.memory.jsHeapSizeLimit / 1024 ** 3).toFixed(2),
    };
  }
}

// Function to get screen resolution
const resolution = ref();
function getResolution() {
  resolution.value = `${Math.round(screen.width * window.devicePixelRatio)}x${Math.round(screen.height * window.devicePixelRatio)}`;
}

// Function to get battery information
const isBatterySupported = ref("getBattery" in navigator);
const batteryInfo = ref("");
async function getBatteryInfo() {
  try {
    const battery = await navigator.getBattery();
    const level = (battery.level * 100).toFixed(0);
    const charging = battery.charging ? "Charging" : "Not Charging";
    batteryInfo.value = `${level}% (${charging})`;
  } catch (error) {
    console.error("Error getting battery info:", error);
    batteryInfo.value = "Unavailable";
  }
}

const cpuCores = ref(navigator.hardwareConcurrency ?? null);

onMounted(() => {
  console.log("neofetch mounted");
  browserInfo.value = detectBrowser();
  osInfo.value = detectOS();
  getMemoryInfo();
  getResolution();
  // console.log("screen:", screen.width, screen.height);
  // console.log("devicePixelRatio:", window.devicePixelRatio);
  // console.log("window.innerWidth:", window.innerWidth, window.innerHeight);
  if (isBatterySupported.value) getBatteryInfo();
});
</script>

<style scoped>
.neofetch-container {
  display: flex;
}

.neofetch-info {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  color: #fff;
  font-size: 20px;
  padding-left: 3vh;
  font-family: "Ubuntu Mono", monospace;
}

.neofetch-header {
  color: rgb(251, 255, 0);
}

.neofetch-tooltip {
  font-size: 15px;
  color: #f00;
  vertical-align: top;
}

.neofetch-ascii {
  font-family: "Ubuntu Mono", monospace;
  color: #fff;
  font-size: 20px;
}

.gif-wrapper {
  /* width: 100%; */
  /* overflow: hidden; */
}

.gif {
  /* display: block; */
  /* max-width: 100%; */
  width: 100%;
  /* height: auto; */
}
</style>

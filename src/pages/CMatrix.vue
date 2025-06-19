<template>
  <div class="cmatrix">
    <!-- Your component template goes here -->
    <!-- <h1>Hello from Cmatrix</h1> -->
    <canvas ref="canvas" class="w-screen h-screen block bg-black"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const regExForMobileDevices =
  /Mobile|Tablet|iP(hone|ad|od)|Android|BlackBerry|WebOS/i;

const isMobileDevice = ref(regExForMobileDevices.test(navigator.userAgent));

const keyPressed = ref();

const canvas = ref();
const characters =
  'アァイィウヴエカキクケコサシスセソタチツテナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"<>!?@#_';

let fontSize = 16;
let columns;
let drops;

onMounted(() => {
  window.addEventListener("keydown", function (ev) {
    if (!isMobileDevice.value) {
      keyPressed.value = ev.key;
    }

    // console.log("isMobileDevice", isMobileDevice);
    if (keyPressed.value == "q" || keyPressed.value == "Q") {
      router.push({ name: "shell" });
    }
    // updateCurrentCommand(keyPressed.value);
    // console.log("keydown");
  });

  const ctx = canvas.value.getContext("2d");
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  columns = Math.floor(canvas.value.width / fontSize);
  console.log("columns", columns);
  drops = Array(columns).fill(0);

  const draw = () => {
    // semi-transparent black background to fade trails
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.value.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    //   console.log(drops);
      drops[i]++;
    }
    // console.log(drops);
    requestAnimationFrame(draw);
  };

  draw();
});
</script>

<style scoped>
.cmatrix {
  /* Add your component-specific styles here */
}
</style>

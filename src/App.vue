<template>
  <!-- <h1></h1> -->
  <!-- <Shell></Shell> -->
  <RouterView />
</template>

<script setup>
import Shell from "./components/Shell.vue";

console.log(navigator.userAgent);
</script>

<style>
body {
  background-color: black;
}
</style>

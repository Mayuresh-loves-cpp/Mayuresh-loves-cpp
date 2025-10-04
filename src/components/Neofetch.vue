<template>
  <!-- <neofetchSvg></neofetchSvg> -->
  <div class="neofetch-container">
    <pre>
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
     </pre
    >
    <div class="neofetch-info">
        <span>web@browser</span>
        <span>os@ubuntu</span>
        <span>cpu@intel i5 10300h</span>
        <span>ram@8gb</span>
    </div>
  </div>
</template>

<script setup>
// import neofetchSvg from "../assets/terminal_logo.svg";
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
    font-family: monospace;
    color: #fff;
    padding-left: 3vh;
}
</style>

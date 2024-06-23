import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { validateAndExec as toExec } from "../modules/executables/executableCommands.js";

export const execStore = defineStore("bin", () => {
  const validateAndExec = ref(toExec);
  //   const getPWD = computed(() => pwd);

  return { validateAndExec };
});

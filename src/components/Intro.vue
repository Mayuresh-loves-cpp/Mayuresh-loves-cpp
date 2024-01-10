<template>
  <div style="font-size: 20px; white-space: pre">
    {{ firstString }}
  </div>
  <!-- <template v-if="showAnimation">
    
  </template> -->
</template>

<script setup>
import { ref } from "vue";
const firstString = ref("");
const secondString = ref(" ");
const message = [
  "Hi!",
  "",
  "I'm Mayuresh Shinde",
  "",
  "This is an another line for testing yet another kashkdajhksdhakjshdkajhsdkajhdkajhsdkajhdskjhs",
  "",
  "A fellow software developer",
  "",
  "ahain Hi",
];
// const end = ref("");
// const showAnimation = ref(true);

// function createStringHTML(tagName, innerText) {
//   return `<${tagName}> ${innerText} </${tagName}>`;
// }

// function createStringHTMLNonClosing(tagName) {
//   return `<${tagName}>`;
// }

// function delayedExecution(j, jIteration, i) {
//   return new Promise(function (resolve, reject) {
//     console.log(i, j);
//     if (j < jIteration) {
//       setTimeout(function () {
//         console.log("Function", j + 1, "executed");
//         firstString.value = message[i].slice(0, j + 1);
//         //   secondString.value = message[i].trim(index + 1);
//         delayedExecution(j + 1, jIteration, i);
//       }, 70);
//     }
//     resolve(() => {});
//   });
// }

// function delayedExecutionSuper(i, length) {
//   if (i < length) {
//     setTimeout(async () => {
//       await delayedExecution(0, message[i].length, i);
//       firstString.value = " ";
//       secondString.value = " ";
//       delayedExecutionSuper(i + 1, length);
//     }, 2000);
//   }
// }

// delayedExecution(0, message[0].length, 0);
// delayedExecutionSuper(0, message.length);

// firstString.value = "";
// secondString.value = "";
// showAnimation.value = false;

// const stringsArray = ["Hello", "World", "ChatGPT"];
// let currentIndex = 0;

// function displayStringWithDelay(string, index) {
//   let charIndex = 0;
//   //   let negativeIndex = string.length * -1;
//   const intervalId = setInterval(() => {
//     let toExit = false;
//     let reverse = false;
//     if (toExit) {
//       clearInterval(intervalId);
//       setTimeout(() => {
//         // process.stdout.write('\n');
//         firstString.value = " ";
//         displayNextString(index + 1);
//       }, 1000);
//     } else {
//       if (reverse) {
//         console.log("inside reverse");
//         console.log(charIndex);
//         if (charIndex > 0) {
//           firstString.value = firstString.value.slice(0, charIndex * -1);
//           charIndex--;
//         } else {
//           toExit = true;
//         }
//       } else {
//         console.log("inside non-reverse");
//         if (reverse == false && charIndex < string.length) {
//           console.log(string[charIndex]);
//           firstString.value = firstString.value + string[charIndex];
//           charIndex++;
//           if (charIndex === string.length) {
//             console.log("changing reverse value");
//             reverse = true;
//           }
//         }
//       }
//     }
//   }, 100);
// }

// function displayNextString(index) {
//   if (index < stringsArray.length) {
//     displayStringWithDelay(stringsArray[index], index);
//   } else {
//     // All strings displayed
//     console.log("Finished displaying all strings.");
//   }
// }

// // Start displaying the first string
// displayNextString(currentIndex);

////////////////////////////
const stringsArray = ["Hello", "World", "ChatGPT"];
let currentIndex = 0;

function displayStringWithPop(string, index) {
  let charIndex = 0;
  let reverse = false;
  let timeout = 90;
  // function charInterval() {
  //   console.log(reverse, charIndex);
  //   if (reverse == true) {
  //     console.log("returning 80");
  //     return 80;
  //   } else if (reverse == true && charIndex == string.length) {
  //     console.log("returning 1000");
  //     return 1000;
  //   } else {
  //     console.log("returning 90");
  //     90;
  //   }
  // }
  console.log("timeout", timeout);
  const intervalId = setInterval(() => {
    if (charIndex < string.length && reverse != true) {
      // process.stdout.write(string[charIndex]);
      firstString.value = firstString.value + string[charIndex];
      charIndex++;
      timeout = 90;
    } else if (charIndex === string.length) {
      // "Pop" effect
      // process.stdout.write(string[charIndex - 1]);
      firstString.value = string.slice(0, charIndex);
      charIndex--;
      reverse = true;
      timeout = 1000;
    } else if (charIndex >= 0 && reverse == true) {
      firstString.value = string.slice(0, charIndex);
      // if (charIndex == 0) {
      //   firstString.value = " ";
      // }
      charIndex--;
      timeout = 90;
    } else {
      clearInterval(intervalId);
      setTimeout(() => {
        // process.stdout.write('\n');
        displayNextString(index + 1);
      }, 1000);
    }
  }, timeout);
}

function displayNextString(index) {
  if (index < stringsArray.length) {
    displayStringWithPop(stringsArray[index], index);
  } else {
    // All strings displayed
    console.log("Finished displaying all strings.");
  }
}

// Start displaying the first string
displayNextString(currentIndex);
</script>

<style scoped></style>



import { ref } from 'vue';

export const flashMessage = ref(null); // { text, type }

export function showFlash(text, type = 'success') {
  flashMessage.value = { text, type };

  // auto clear sau 3 giây 
  setTimeout(() => {
    if (flashMessage.value && flashMessage.value.text === text) {
      flashMessage.value = null;
    }
  }, 3000);
}

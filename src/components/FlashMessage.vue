<template>
  <div v-if="flash" class="flash-wrapper">
    <div class="flash" :class="flash.type">
      {{ flash.text }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { flashMessage } from '@/helpers/flash';

export default {
  name: 'FlashMessage',
  setup() {
    const flash = computed(() => flashMessage.value);
    return { flash };
  },
};
</script>

<style scoped>
.flash-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

/* style cơ bản, bạn chỉnh lại cho giống bài lab cũng được */
.flash {
  padding: 10px 16px;
  border-radius: 4px;
  color: white;
  min-width: 200px;
}

.flash.success {
  background-color: #4caf50;
}

.flash.error {
  background-color: #f44336;
}

.flash.info {
  background-color: #2196f3;
}
</style>

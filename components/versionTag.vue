<template>
  <span
    class="flex px-7 py-2 bg-um-palepink rounded-xs text-xs text-um-blue font-bold"
  >
    {{ version }}</span
  >
</template>
<script setup>
const props = defineProps({
  version: {
    type: String,
  },
});
</script>

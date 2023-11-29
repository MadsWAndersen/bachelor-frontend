<template>
  <img
    :src="image"
    alt="test"
    class="rounded-full h-[40px] w-[40px] object-cover"
  />
</template>

<script setup>
const props = defineProps(["image"]);
</script>

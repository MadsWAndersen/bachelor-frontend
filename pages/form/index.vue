<template>
  <pre>{{ data }}</pre>
</template>

<script setup>
const { data } = useApi("/forms/01760615-f419-40be-9b1f-2d32f38790fb");
</script>

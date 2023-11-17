<template>
  <div v-if="data">
    <div class="container">
      <div class="container-row">
        <div class="col-span-2">
          {{ data }}
        </div>
        <div class="col-span-5">
          <div v-html="data.bodytext"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data } = useContent(`${route.params.pageSlug}`);
</script>

<style></style>

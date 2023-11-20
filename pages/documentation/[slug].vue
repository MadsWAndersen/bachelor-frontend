<template>
  <div v-if="data">
    <div>CONTENT ID: {{ $route.query.id }}</div>
    <div v-for="(content, index) in data._embedded.content" :key="index">
      <h1 v-html="content.name" class="text-xl font-bold"></h1>
      <NuxtLink :to="`${content._id}`">{{ content._url }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data } = useContent(`${route.query.id}/children`);
</script>

<style></style>

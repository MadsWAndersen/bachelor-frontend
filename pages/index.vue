<template>
  <div v-if="data">
    <div v-for="(content, index) in data._embedded.content" :key="index">
      <h1 v-html="content.name" class="text-xl font-bold"></h1>
      <NuxtLink :to="content._url">{{ content._url }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data } = useContent();
</script>

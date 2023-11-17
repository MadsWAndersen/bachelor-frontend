<template>
  <div v-if="data">
    <div v-for="(content, index) in data._embedded.content" :key="index">
      <h1 v-html="content.name" class="text-xl font-bold"></h1>
      <NuxtLink :to="getRoute(content)">{{ content._url }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data, pending, error } = useContent();
const getRoute = (content) => {
  return {
    path: `/documentation${content._url}`,
    query: { id: content._id },
  };
};
</script>

<template>
  <div v-if="cmsContent">
    <div>CONTENT ID: {{ $route.query.id }}</div>
    <div v-for="(content, index) in cmsContent.childrenData._embedded.content" :key="index">
      <h1 v-html="content.name" class="text-xl font-bold"></h1>
      <NuxtLink :to="`${content.name}`">{{ content._url }}</NuxtLink>
    </div>
    {{ cmsContent.childrenData._embedded.content[1]._url }}
  </div>
</template>

<script setup>
const route = useRoute();

const localStorageContent = ref();
const cmsContent = ref();



onMounted(async () => {
  localStorageContent.value = ref(JSON.parse(window.localStorage.getItem("Documentation")));
  cmsContent.value = localStorageContent.value._value;
  console.log(cmsContent.value.childrenData._embedded.content);

});

const { data } = useContent(`${route.query.id}/children`);
</script>

<style></style>

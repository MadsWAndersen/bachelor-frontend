<template>
  <div v-if="localStorageContent">
    <div class="container">
      <div class="container-row">
        <div class="col-span-2">
        </div>
        <div class="col-span-5">
          <div v-for="(content, index) in cmsContent.childrenData._embedded.content" :key="index">
            <h1 v-html="content.name" class="text-xl font-bold"></h1>
            <NuxtLink :to="`${content._url}`">{{ content._url }}</NuxtLink>
          </div>
          {{ cmsContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const route = useRoute();
/* const { data } = useContent(`${route.params.slug}`); */
console.log(`${route.params.slug}`);
const localStorageContent = ref();
const cmsContent = ref();


onMounted(async () => {
  localStorageContent.value = ref(JSON.parse(window.localStorage.getItem(`${route.params.slug}`)));
  cmsContent.value = localStorageContent.value._value;
  console.log(cmsContent.value.childrenData._embedded.content[0])
});
</script>

<style></style>

<template>
  <div v-if="localStorageContent">
    <div class="container">
      <div class="container-row">
        <div class="col-span-2">
          <pre>{{ data }}</pre>
        </div>
        <div class="col-span-5">
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
});
</script>

<style></style>

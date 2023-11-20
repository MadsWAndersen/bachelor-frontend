<template>
  <div v-if="data" class="container">
    <pre>{{ Data }}</pre>

    <div class="container-row">
      <div
        v-for="(image, index) in data._embedded.media"
        :key="index"
        class="col-span-3 hover:opacity-50"
      >
        {{ image.umbracoFile?.src }}

        <NuxtLink :to="`${mediaUrl}/${image.umbracoFile?.src}`">
          <img :src="`${mediaUrl}/${image.umbracoFile?.src}`" alt=""
        /></NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data, pending, error, refresh } = useApi("/media/");

const mediaUrl = ref("https://media.umbraco.io/pba-webdev");
</script>

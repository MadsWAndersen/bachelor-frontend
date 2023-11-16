<template>
  <div v-if="data">
    <div v-for="(e, index) in data.blocklist" :key="index">
      <img :src="e.content.image[0]._url" alt="" />
      <span v-html="e.content.bodytext" class="text-xl"></span>
      <h1 v-html="e.content.title" class="text-xl font-bold"></h1>
    </div>

    <div v-for="(e, index) in data.version" :key="index">
      {{ e }}
    </div>

    <p></p>

    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
const { data, pending, error } = useContent();
const route = useRoute();

const test = "/00424213-bb70-46b2-aefd-f7bb89f456e2";
</script>

<template>
  <div>
    <h1>{{ result }}</h1>
    <div v-for="page in pages" :key="page._id">
      <p>Creator Name: {{ page._creatorName }}</p>
      <p>
        Page Name:
        <NuxtLink :to="'/about/' + page._id">{{ page.name }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const result = ref(null);
const pages = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch("https://cdn.umbraco.io/content/", {
      headers: {
        "umb-project-alias": "pba-webdev",
        "Accept-Language": "en-US",
      },
    });
    const responseData = await response.json();
    result.value = responseData;
    // Assuming that the pages data is under "_embedded.content"
    pages.value = responseData._embedded.content;
    console.log(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);
</script>

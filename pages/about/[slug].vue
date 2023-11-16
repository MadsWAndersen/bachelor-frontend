<template>
  <div>CONTENT ID: {{ $route.params.slug }}</div>

  <div>{{ result }}</div>
</template>

<script setup>
const route = useRoute();
const result = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://cdn.umbraco.io/content/${route.params.slug}`,
      {
        headers: {
          "umb-project-alias": "pba-webdev",
          "Accept-Language": "en-US",
        },
      }
    );
    const responseData = await response.json();
    result.value = responseData;

    pages.value = responseData._embedded.content;
    console.log(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);
</script>

<style></style>

<template>
  <div>
    <h1>{{ result?._creatorName }}</h1>


    {{ result }}


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const route = useRoute()


const result = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch('https://cdn.umbraco.io/content/', {
      headers: {
        "umb-project-alias": "pba-webdev",
        "Accept-Language": "en-US",
      }
    });
    const responseData = await response.json();
    result.value = responseData;
    console.log(responseData)
  } catch (error) {
    console.error('Error fetching data:', error);

  }
};




onMounted(fetchData);

</script>

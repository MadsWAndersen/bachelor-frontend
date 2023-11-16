<template>
  <div v-if="data">
    <h1>Umbraco</h1>
    <Editor api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4" />
    <button @click="updateContent">Update Content</button>
    <pre v-for="(image, index) in data._embedded.media" :key="index">
      {{ image }}
    </pre>
  </div>
</template>

<script setup>
import Editor from "@tinymce/tinymce-vue";
const imgUrl = ref("");
const { data, pending, error, refresh } = useApi("/media/");

const Data = ref("");

function updateContent() {
  if (tinymce && tinymce.activeEditor) {
    Data.value = tinymce.activeEditor.getContent();
    console.log(Data.value);
  } else {
    console.error("The TinyMCE editor is not active or not found.");
  }
}

onMounted(() => {
  if (data.value && data.value.umbracoFile && data.value.umbracoFile.src) {
    imgUrl.value =
      "https://media.umbraco.io/pba-webdev" + data.value.umbracoFile.src;
  }
});
</script>

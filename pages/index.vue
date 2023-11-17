<template>
  <div v-if="data" class="container">
    <Editor
      api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4"
      :init="{
        plugins: 'lists link image table code help wordcount code',
      }"
    />
    <button @click="updateContent">Test console Editor data</button>

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
const Data = ref("");
import Editor from "@tinymce/tinymce-vue";

const mediaUrl = ref("https://media.umbraco.io/pba-webdev");

function updateContent() {
  if (tinymce && tinymce.activeEditor) {
    Data.value = tinymce.activeEditor.getContent();
    console.log(Data.value);
  } else {
    console.error("The TinyMCE editor is not active or not found.");
  }
}
</script>

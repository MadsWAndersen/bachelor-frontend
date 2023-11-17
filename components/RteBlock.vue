<script setup>
import Editor from "@tinymce/tinymce-vue";
</script>

<template>
  <Editor
    api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4"
    :init="{
      plugins: 'lists link image table code help wordcount',
    }"
  />
</template>

<script>
export default {
  name: "TinyMCE",
  props: {},
};
</script>

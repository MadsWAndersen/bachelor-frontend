<template>
  <div class="container">
    <div class="container-row">
      <div class="col-span-full">
        <Editor
          api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4"
          :init="{
            plugins: 'lists link image table code help wordcount code',
          }"
        />
      </div>
      <button
        class="col-span-full mr-auto ml-auto bg-slate-700 rounded-sm text-white w-12"
        @click="updateContent"
      >
        Test console Editor data
      </button>

      <div class="border-2 col-span-full">
        {{ Data }}
      </div>

      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup>
const { data } = useApi("/forms/01760615-f419-40be-9b1f-2d32f38790fb");

const Data = ref("");
import Editor from "@tinymce/tinymce-vue";
function updateContent() {
  if (tinymce && tinymce.activeEditor) {
    Data.value = tinymce.activeEditor.getContent();
    console.log(Data.value);
  } else {
    console.error("The TinyMCE editor is not active or not found.");
  }
}
</script>

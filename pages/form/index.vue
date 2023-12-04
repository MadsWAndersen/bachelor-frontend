<template>
	<div class="container">
		<div class="container-row">
			<div class="col-span-full">
				<Editor
					api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4"
					:init="{
						plugins:
							'lists link image table code help wordcount code',
					}" />
			</div>
			<button
				class="col-span-full mr-auto ml-auto bg-slate-700 rounded-sm text-white w-12"
				@click="updateContent">
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
import Editor from '@tinymce/tinymce-vue'
useRedirect()

const Data = ref('')
function updateContent() {
	if (tinymce && tinymce.activeEditor) {
		Data.value = tinymce.activeEditor.getContent()
	} else {
	}
}
</script>

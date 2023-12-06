<template>
	<div>
		<form @submit.prevent="submitForm">
			<label for="text">Text:</label>
			<textarea
				id="text"
				v-model="formData.text"
				type="text"
				class="border"
				required />

			<label for="version">Version:</label>
			<input
				id="version"
				v-model="formData.version"
				type="text"
				class="border"
				required />

			<button class="bg-um-red mt-3 p-2" type="submit">Submit</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
	text: '',
	version: '',
})

const submitForm = async () => {
	try {
		const response = await fetch(
			'https://api.umbraco.io/api/forms/7f6f9150-e26b-4a67-836f-40ac7130c2dd/entries',
			{
				method: 'POST',
				headers: {
					Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
					'Accept-Language': 'en-US',
					'Api-Version': '2.1',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData.value),
			},
		)
		console.log('Response:', response)
	} catch (error) {
		console.error('Error:', error)
	}
}
</script>

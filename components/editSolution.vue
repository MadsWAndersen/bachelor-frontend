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
	const apiUrl =
		'https://api.umbraco.io/forms/7f6f9150-e26b-4a67-836f-40ac7130c2dd/entries'

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	headers.append('umb-project-alias', 'pba-webdev')
	headers.append('Authorization', 'Basic elFJZk50eEpCYWFidFFDSTNweDg6')

	const requestOptions = await {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(formData.value),
	}

	fetch(apiUrl, requestOptions)
		.then((response) => {
			if (response.ok) {
				console.log('Data successfully posted.')
			} else {
				console.error('API call failed. Status:', response.status)
				return response.json()
			}
		})
		.catch((error) => {
			console.error('Error:', error.message)
		})
}
</script>

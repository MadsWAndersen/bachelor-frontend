<template>
	<section>
		<div class="container-row flex lg:justify-center">
			<ModalBlock v-if="modal === true">
				<h2 class="text-2xl text-um-blue">Are you sure</h2>
				<span class="mb-3 text-um-blue"
					>You are about to request an update to this solution.</span
				>

				<div class="flex gap-2 justify-between mt-9">
					<Button
						class="!w-full"
						:buttonText="'No cancel'"
						:style="'neutral'"
						@click="modal = false" />
					<Button
						class="!w-full"
						:buttonText="'Request edit'"
						:style="'dark'"
						@click="confirmAndSubmit()" />
				</div>
			</ModalBlock>
		</div>
		<div class="col-span-12 lg:w-1/2 md:w-2/3 w-full">
			<HeroHeader
				headline="Edit Solution"
				heroText=""
				heroBreadCrumbs="edit-solution" />
			<div class="container-row lg:flex justify-center">
				<div class="col-span-12 w-full">
					<form @submit.prevent="postForm">
						<div class="w-full flex">
							<label
								for="text"
								class="w-full text-m font-semibold text-um-blue pt-6 mr-5">
								Edit solution text:</label
							>
							<textarea
								id="text"
								v-model="formData.text"
								placeholder="Enter the edit you want to request"
								type="text"
								class="inline-flex w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue"
								required />
						</div>
						<div class="w-full flex">
							<label
								for="version"
								class="w-full text-m font-semibold text-um-blue pt-6 mr-5">
								Version:</label
							>
							<input
								id="version"
								v-model="formData.version"
								placeholder="Version specific, enter the version here"
								type="text"
								class="inline-flex w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue"
								required />
						</div>
						<linkButton
							class="cursor-pointer mt-5 mb-10"
							url=""
							target="_blank"
							title="Submit solution"
							:style="'dark'"
							@click="submitForm()" />
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { usePageStore } from '@/stores/usePageStore'
const router = useRouter()
const modal = ref(false)

const formData = ref({
	text: '',
	version: '',
	pageID: '',
})

// Get the store and pass the store id into formData pageID
const store = usePageStore()
formData.value.pageID = store.id

const shouldSubmitForm = ref(false)

// Modify submitForm to show the modal and set shouldSubmitForm
const submitForm = () => {
	modal.value = true
	shouldSubmitForm.value = true
}

// Create a new method to handle the confirmation and form submission
const confirmAndSubmit = () => {
	if (shouldSubmitForm.value) {
		handleFormSubmit()
	}
	// Close the modal and clear form data
	modal.value = false
	formData.value = {
		text: '',
		version: '',
	}
	router.go(-1)
}

const handleFormSubmit = async () => {
	try {
		const apiUrl =
			'https://api.umbraco.io/forms/7f6f9150-e26b-4a67-836f-40ac7130c2dd/entries'

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'umb-project-alias': 'pba-webdev',
				Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
			},
			body: JSON.stringify(formData.value),
		})

		if (response.ok) {
			console.log('Data successfully posted.')
		} else {
			console.error('API call failed. Status:', response.status)
			const errorResult = await response.json()
			console.error('Error:', errorResult)
		}
	} catch (error) {
		console.error('Error:', error.message)
	}
}
</script>

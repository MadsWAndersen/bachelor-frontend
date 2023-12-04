<template>
	<div v-if="data">
		<div class="container-row">
			<div class="col-span-5">
				<h1 v-if="user?.name" class="text-um-blue text-4xl mb-3">
					Hello {{ user.name }}
				</h1>

				<p class="text-um-blue text-lg">
					Welcome to the central Umbraco support system. Here you can
					get the latest news related to SWAT
				</p>
			</div>
		</div>

		<div v-if="cmsContent">
			<div v-if="cmsContent.childrenData._embedded.content" class="-mb-3">
				<div
					v-for="(content, index) in cmsContent.childrenData._embedded
						.content"
					:key="index">
					<div
						v-for="(childContent, index) in content.childrenData
							._embedded.content"
						:key="index"
						class="mb-3">
						<div v-if="childContent.highligted">
							<HighlightCard
								:title="childContent.headline"
								:bodyText="childContent.bodyText"
								:url="childContent._url">
							</HighlightCard>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container-row">
			<sectionCard
				v-for="(card, index) in data._embedded.content"
				:key="index"
				:url="card._url"
				:headline="card.name"
				:description="card.description"
				:image="card.image"
				:icon="card.icon?.src"
				:style="'light'">
			</sectionCard>
		</div>
	</div>
</template>

<script setup>
const { data } = useContent()
const localStorageContent = ref()
const cmsContent = ref()

const userLocalStoage = ref()
const user = ref()

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('documentation')),
	)
	cmsContent.value = localStorageContent.value._value

	userLocalStoage.value = await ref(
		JSON.parse(window.localStorage.getItem('userInfo')),
	)
	user.value = userLocalStoage.value._value
	console.log(user.value)
})
</script>

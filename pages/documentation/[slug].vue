<template>
	<div v-if="localStorageContent">
		<div class="">
			<div class="lg:hidden col-span-2 flex justify-start relative">
				<button
					class="text-um-blue z-30 py-4 absolute -top-9"
					@click="toggleSideMenu">
					<Icon
						name="ci:hamburger-md"
						v-if="!isSideMenuOpen"
						class="w-[30px] h-[30px]"></Icon>

					<Icon
						name="material-symbols:close-small-outline"
						v-else
						class="w-[30px] h-[30px]"></Icon>
				</button>
			</div>
			<div class="container-row">
				<div
					v-if="cmsContent.childrenData._embedded.content"
					class="container pb-10 pt-10 fixed top-12 lg:hidden left-0 h-screen w-full bg-um-white shadow-lg transform transition-transform ease-umbraco-ease duration-300 flex flex-col items-start gap-5 z-20"
					:class="{
						'translate-x-0': isSideMenuOpen,
						'translate-x-[-100%]': !isSideMenuOpen,
					}">
					<h1
						v-if="cmsContent.documentationHeadline"
						class="text-2xl text-um-blue mb-5">
						{{ cmsContent.documentationHeadline }}
					</h1>
					<ul
						v-for="(content, index) in cmsContent.childrenData
							._embedded.content"
						:key="index"
						class="list-disc">
						<li class="ml-6 mb-4 hover:underline">
							<NuxtLink :to="`${content._url}`">{{
								content.name
							}}</NuxtLink>
						</li>
					</ul>
				</div>

				<div
					v-if="cmsContent.childrenData._embedded.content"
					class="lg:col-span-2 lg:block lg:relative fixed hidden">
					<h1
						v-if="cmsContent.documentationHeadline"
						class="text-2xl mb-5">
						{{ cmsContent.documentationHeadline }}
					</h1>
					<ul
						v-for="(content, index) in cmsContent.childrenData
							._embedded.content"
						:key="index"
						class="list-disc">
						<li class="ml-6 mb-4 text-um-blue hover:underline">
							<NuxtLink
								:to="`${content._url}`"
								@click="toggleSideMenu"
								>{{ content.name }}</NuxtLink
							>
						</li>
					</ul>
				</div>
				<div class="lg:col-span-6 lg:col-start-4 col-span-4">
					<div class="container p-0">
						<div class="container-row">
							<div class="col-span-full mb-10">
								<h1 class="text-4xl text-um-blue mb-5">
									Welcome to the
									<span class="font-bold italic">{{
										cmsContent.documentationHeadline
									}}</span>
									category
								</h1>
								<BreadCrumb :data="cmsContent._url" />
								<p class="mb-5">
									<span class="font-bold text-um-blue mr-2"
										>Date:</span
									>
									{{ formatDate(cmsContent._createDate) }}
								</p>

								<div
									class="rteBlock"
									v-html="
										cmsContent.documentationDescription
									"></div>
							</div>
							<docButton
								:url="
									cmsContent.childrenData._embedded.content[0]
										._url
								"
								:title="
									cmsContent.childrenData._embedded.content[0]
										.name
								"
								spanText="next"
								:btnStyle="'next'"
								class="col-span-6 mb-10" />
						</div>
					</div>
				</div>
				<pageContent
					:h3Contents="h3Contents"
					:scrollToSection="scrollToSection" />
			</div>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const h3Contents = ref([])
const { formatDate } = useDateFormatter()
const isSideMenuOpen = ref(false)
const redirect = useRedirect()

const toggleSideMenu = () => {
	isSideMenuOpen.value = !isSideMenuOpen.value
}

const scrollToSection = (index) => {
	const h3Elements = document.querySelectorAll('.rteBlock h3')

	if (h3Elements.length > index) {
		const h3Element = h3Elements[index]
		h3Element.scrollIntoView({ behavior: 'smooth' })
	}
}
onMounted(async () => {
	if (!localStorage.getItem('bearerToken')) {
		redirect()
	}
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`${route.params.slug}`)),
	)
	cmsContent.value = localStorageContent.value._value

	// Find h3 tags and display them in the h3Contents
	const documentationDescription = cmsContent.value.documentationDescription

	const matches = documentationDescription.matchAll(/<h3>(.*?)<\/h3>/g)

	h3Contents.value = []

	for (const match of matches) {
		h3Contents.value.push(match[1])
	}
})
</script>

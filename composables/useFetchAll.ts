import { ref, onMounted } from 'vue'

export function useFetchAll() {
	const storedData = ref(null)
	const detailedData = ref(null)
	const error = ref(null)

	function fetchData(url) {
		return fetch(url, {
			headers: {
				'umb-project-alias': 'pba-webdev',
				'Accept-Language': 'en-US',
				Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
			},
		}).then((response) => response.json())
	}

	async function fetchRecursive(url) {
		const data = await fetchData(url)
		if (data._embedded && data._embedded.content) {
			await Promise.all(
				data._embedded.content.map(async (item) => {
					if (item._links && item._links.children) {
						item.childrenData = await fetchRecursive(
							item._links.children.href,
						)
					}
				}),
			)
		}
		return data
	}

	async function fetchDetailedData(hrefs) {
		const details = await Promise.all(hrefs.map((href) => fetchData(href)))
		return Promise.all(
			details.map((detail) => {
				if (detail._links && detail._links.children) {
					return fetchRecursive(detail._links.children.href).then(
						(childrenData) => {
							return { ...detail, childrenData }
						},
					)
				}
				return detail
			}),
		)
	}

	onMounted(async () => {
		try {
			const initialResponse = await fetchData(
				'https://cdn.umbraco.io/content/',
			)
			const hrefs = initialResponse._embedded.content.map(
				(content) => content._links.self.href,
			)
			detailedData.value = await fetchDetailedData(hrefs)

			window.localStorage.setItem(
				'Documentation',
				JSON.stringify(detailedData.value[4]),
			)
			window.localStorage.setItem(
				'CMS',
				JSON.stringify(detailedData.value[3]),
			)
			storedData.value = JSON.parse(window.localStorage.getItem('CMS')) // Update the reactive property
		} catch (err) {
			error.value = err
		}
	})
}

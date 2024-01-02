export function useContent(urlPath = '') {
	// Base URL
	const baseUrl = 'https://cdn.umbraco.io/content/'
	const config = useRuntimeConfig()
	// Complete URL
	const completeUrl = urlPath ? `${baseUrl}${urlPath}` : baseUrl

	const { data, pending, error, refresh } = useFetch(completeUrl, {
		headers: {
			'umb-project-alias': config.public.project_alias,
			'Accept-Language': config.public.accept_lang,
			Authorization: `Basic ${config.public.authentication}`,
		},
	})

	return { data, pending, error, refresh }
}

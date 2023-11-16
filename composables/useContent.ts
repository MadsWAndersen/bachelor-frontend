export function useContent(urlPath = "") {
  // Base URL
  const baseUrl = "https://cdn.umbraco.io/content/";

  // Complete URL
  const completeUrl = urlPath ? `${baseUrl}${urlPath}` : baseUrl;

  const { data, pending, error, refresh } = useFetch(completeUrl, {
    headers: {
      "umb-project-alias": "pba-webdev",
      "Accept-Language": "en-US",
      Authorization: "Basic elFJZk50eEpCYWFidFFDSTNweDg6",
    },
  });

  return { data, pending, error, refresh };
}

const fetchData = async () => {
    try {
      const response = await fetch("https://cdn.umbraco.io/content/", {
        headers: {
          "umb-project-alias": "pba-webdev",
          "Accept-Language": "en-US",
        },
      });
      const responseData = await response.json();
      result.value = responseData;
      // Assuming that the pages data is under "_embedded.content"
      pages.value = responseData._embedded.content;
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
onMounted(fetchData);



export const useData = () => {

}
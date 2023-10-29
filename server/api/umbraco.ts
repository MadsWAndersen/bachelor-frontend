async () => {
    const data = async () => {
        try {
            const response = await fetch('https://cdn.umbraco.io/content', {
                headers: {
                    "umb-project-alias": "pba-webdev"
                }
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const result = await data();
    console.log(result);
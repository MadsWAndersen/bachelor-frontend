export function useSlackNotification() {
	const sendSlackNotification = async (apiUrl: string): Promise<void> => {
		try {
			const response: Response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: 'event',
				}),
			})

			if (response.ok) {
				console.log('Slack notification sent successfully.')
			} else {
				console.error(
					'Slack notification API call failed. Status:',
					response.status,
				)
				const errorResult: any = await response.json()
				console.error('Error:', errorResult)
			}
		} catch (error: any) {
			console.error('Error sending Slack notification:', error.message)
		}
	}

	return {
		sendSlackNotification,
	}
}

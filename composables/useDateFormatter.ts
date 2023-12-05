export function useDateFormatter() {
	const formatDate = (inputDate: string | number | Date): string => {
		const date = new Date(inputDate)
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}
		const formattedDate = date.toLocaleDateString('en-US', options)
		return formattedDate
	}

	return {
		formatDate,
	}
}

import {useCallback, useState} from 'react'
import axios from 'axios'

export const useHttp = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true)
			try {
				const response = await axios({
					url,
					method,
					data: body,
					headers,
				})
				const data = response
				setIsLoading(false)
				return data
			} catch (err) {
				setError(err.response.data.message)
				setIsLoading(false)
			}
		},
		[],
	)

	return {error, isLoading, sendRequest}
}

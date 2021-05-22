import { useEffect, useState } from 'react'

// TODO -- MAKE SURE TO RENDER IN APP DEFAULT THEME

export const useLocalStorage = (key, defaultValue) => {
	const stored = localStorage.getItem(key)
	const initial = stored ? JSON.parse(stored) : defaultValue
	const [storageValue, setValue] = useState(initial)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storageValue))
	}, [key, storageValue])

	return { storageValue, setValue }
}

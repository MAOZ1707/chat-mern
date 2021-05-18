import React, { useContext, useEffect, useState } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ThemeContext = React.createContext()

export function useTheme() {
	return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }) {
	const { storageValue, setValue } = useLocalStorage('Theme', '../../utils/Images/b1.png')
	const [selectTheme, setSelectTheme] = useState(() => {
		const jsonValue = localStorage.getItem('Theme')
		if (jsonValue != null) return JSON.parse(jsonValue)
	})

	useEffect(() => {
		setValue(selectTheme)
	}, [selectTheme, storageValue])

	const value = {
		selectTheme,
		setSelectTheme,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

import React, { useContext, useEffect, useState } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ThemeContext = React.createContext()

export function useTheme() {
	return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }) {
	const [selectTheme, setSelectTheme] = useState(() => {
		const jsonValue = localStorage.getItem('user-Theme')
		if (jsonValue != null) return JSON.parse(jsonValue)
	})
	// const { storageValue, setValue } = useLocalStorage('user-Theme', selectTheme)

	// useEffect(() => {
	// 	setValue(selectTheme)
	// }, [selectTheme, storageValue])

	const value = {
		selectTheme,
		setSelectTheme,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

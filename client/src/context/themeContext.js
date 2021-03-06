import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()

export function useTheme() {
	return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }) {
	const [selectTheme, setSelectTheme] = useState(() => {
		const jsonValue = localStorage.getItem('user-Theme')
		if (jsonValue != null) return JSON.parse(jsonValue)
	})

	const value = {
		selectTheme,
		setSelectTheme,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

import { IconButton } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import React, { useState } from 'react'

import './HeaderSearch.css'

const HeaderSearch = ({ searchTerm, setSearchTerm }) => {
	const [searchActive, setSearchActive] = useState(false)

	const handleClick = () => {
		setSearchActive((prev) => !prev)
		setSearchTerm('')
	}

	const handleChange = (e) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div className='search-wrapper'>
			<IconButton
				className='search-icon'
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}>
				<SearchOutlined />
			</IconButton>
			<input
				type='text'
				name='search'
				id='text-search'
				value={searchTerm}
				onChange={handleChange}
				className={`search-input ${searchActive && 'active'}`}
			/>
		</div>
	)
}

export default HeaderSearch

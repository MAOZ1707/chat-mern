import { IconButton, Tooltip, withStyles } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import React, { useState } from 'react'

import './HeaderSearch.css'

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.black,
		color: 'rgba(255,255,255)',
		boxShadow: theme.shadows[1],
		fontSize: 15,
	},
}))(Tooltip)

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
			<LightTooltip title='Search'>
				<IconButton
					className='search-icon'
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}>
					<SearchOutlined />
				</IconButton>
			</LightTooltip>

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

import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import React from 'react'

const HeaderSearch = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<IconButton aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
				<SearchOutlined />
			</IconButton>
		</>
	)
}

export default HeaderSearch

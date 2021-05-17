import React from 'react'
import ReactDOM from 'react-dom'

import './BackDrop.css'

const BackDrop = (props) => {
	return ReactDOM.createPortal(
		<div className='backdrop' onClick={props.onClose}></div>,
		document.getElementById('backdrop')
	)
}

export default BackDrop

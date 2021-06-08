import React from 'react'
import ReactDOM from 'react-dom'

import BackDrop from '../BackDrop/BackDrop'

import './Modal.css'

const Modal = ({ open, children, onClose }) => {
	if (!open) return null

	return ReactDOM.createPortal(
		<div className='modal'>
			<BackDrop onClose={onClose} />
			<div className='modal__content'>{children}</div>
			<div className='modal__footer'>
				<button onClick={onClose} className='modal__close-btn'>
					close
				</button>
			</div>
		</div>,

		document.querySelector('#modal')
	)
}

export default Modal

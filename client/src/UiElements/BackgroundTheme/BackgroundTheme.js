import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import b1 from '../../utils/Images/b1.png'
import b2 from '../../utils/Images/b2.png'
import b3 from '../../utils/Images/b3.jpg'
import b4 from '../../utils/Images/b4.jpg'
import b5 from '../../utils/Images/b5.jpg'
import b6 from '../../utils/Images/b6.jpg'
import b7 from '../../utils/Images/b7.jpg'
import b8 from '../../utils/Images/b8.jpg'

import './BackgroundTheme.css'

const BackgroundTheme = () => {
	const { setValue } = useLocalStorage('Theme', '../../utils/Images/b1.png')

	const images = [b1, b2, b3, b4, b5, b6, b7, b8]

	const handleClick = (img) => {
		console.log(img)
		setValue(img)
	}

	return (
		<div className='background__grid'>
			{images.map((img, i) => {
				return (
					<div key={i + 1} onClick={() => handleClick(img)} className={`img__container b_${i + 1}`}>
						<img
							id={i}
							src={img}
							alt={`b_${i + 1}`}
							className={`img__background image_b${i + 1}`}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default BackgroundTheme

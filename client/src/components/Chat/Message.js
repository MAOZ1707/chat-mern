import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import { useHttp } from '../../hooks/useHttp'

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import StarIcon from '@material-ui/icons/Star'

import './Chat.css'

const Message = ({ content, send }) => {
	const { error, isLoading, sendRequest } = useHttp()

	// TODO ---   FIX RE-RENDERS !!

	return (
		<p
			className={`chat__message ${
				content.name !== send ? 'chat__receiver' : null
			} `}>
			<span className='chat__favorite'>
				{/* {!favMessage ? <StarBorderOutlinedIcon /> : <StarIcon />} */}
			</span>
			<span className='chat__name'>{content.name}</span>
			{content && content.text}
			<span className='chat__timestamp'>
				{(content && content.time) || moment(content.time).format('HH:mm a')}
			</span>
		</p>
	)
}

export default Message

import styled from '@emotion/native'
import React from 'react'
import {View} from 'react-native'
import {Schedule} from '../../../utils/type'

type DotGroupProps = {
	schedules: Schedule[]
}

export const DotGroup = ({schedules}: DotGroupProps) => {
	const limited = schedules.slice(0, 3)

	return (
		<DotWrapper>
			{limited.map(schedule => (
				<Dot key={schedule.id} color={schedule.color} />
			))}
		</DotWrapper>
	)
}

const DotWrapper = styled(View)`
	flex-direction: row;
	margin-top: 3px;
	gap: 2px;
	margin-top: 10px;
`

const Dot = styled(View)<{color: string}>`
	width: 4px;
	height: 4px;
	border-radius: 2px;
	background-color: ${({color}) => color};
`

import styled from '@emotion/native'
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {DateData} from 'react-native-calendars'
import {format} from 'date-fns'
import {Schedule} from '../../../utils/type'
import {DotGroup} from './DotGroup'

type DayComponentProps = {
	date: DateData
	selectedDate?: string
	handlePress: (dateString: string) => void
	schedules: Schedule[]
}

export const DayComponent = ({
	date,
	selectedDate,
	handlePress,
	schedules
}: DayComponentProps) => {
	const dayOfWeek = new Date(date.dateString).getDay()
	const today = format(new Date(), 'yyyy-MM-dd')
	const isSun = dayOfWeek === 0
	const isSat = dayOfWeek === 6
	const isToday = date.dateString === today
	const isSelected = date.dateString === selectedDate
	const isEndOfWeek = dayOfWeek === 6

	const todaySchedules = schedules.filter(
		schedule =>
			date.dateString >= schedule.startDate &&
			date.dateString <= schedule.endDate
	)

	return (
		<DayContainer $isToday={isToday}>
			<Wrapper>
				<TouchableOpacity
					delayPressIn={0}
					activeOpacity={0.4}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
					onPress={() => handlePress(date.dateString)}>
					<Circle $isSelected={isSelected}>
						<StyledDayText
							$isSelected={isSelected}
							$isSun={isSun}
							$isSat={isSat}>
							{date.day}
						</StyledDayText>
					</Circle>
				</TouchableOpacity>
				<DotGroup schedules={todaySchedules} />
			</Wrapper>
			{isEndOfWeek && <WeekDivider />}
		</DayContainer>
	)
}

const DayContainer = styled(View)<{$isToday?: boolean}>(props => ({
	width: '100%',
	alignItems: 'center',
	backgroundColor: props.$isToday ? '#b0b0b027' : 'transparent',
	paddingTop: 4,
	paddingBottom: 10,
	borderRadius: 10
}))

const Circle = styled(View)<{$isSelected?: boolean}>(props => ({
	width: 20,
	height: 20,
	borderRadius: 20,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: props.$isSelected ? '#8f70ff9e' : 'transparent'
}))

const Wrapper = styled(View)`
	width: auto;
	height: auto;
	align-items: center;
	justify-content: center;
`

const StyledDayText = styled(Text)<{
	$isSelected?: boolean
	$isSun?: boolean
	$isSat?: boolean
}>`
	font-size: 14px;
	top: -1px;
	font-family: 'IBMPlexSansKR-Medium';
	color: ${({$isSelected, $isSun, $isSat}) =>
		$isSelected
			? '#ffffff'
			: $isSun
			? '#ff8a7b'
			: $isSat
			? 'rgb(81, 159, 255)'
			: '#676767'};
`

const WeekDivider = styled(View)`
	position: absolute;
	bottom: -10px;
	left: -600%;
	width: 700%;
	height: 1px;
	background-color: #ebebeb;
`

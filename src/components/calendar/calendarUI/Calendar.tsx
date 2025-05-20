import {View} from 'react-native'
import React, {useCallback} from 'react'
import {CalendarList, DateData} from 'react-native-calendars'
import {format} from 'date-fns'
import {KoreanLocale} from '../../../constants/localConfig'
import {DayComponent} from './DayComponent'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import {calendarStyle, calendarTheme} from '../../../constants/calendarTheme'
import styled from '@emotion/native'
import {useUserStore} from '../../../store/useUserStore'

KoreanLocale()

interface props {
	onSelectDate?: (date: string) => void
}
export const CalendarUI = ({onSelectDate}: props) => {
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate)
	const dataByDate = useSelectedDateStore(state => state.dataByDate)
	const userId = useUserStore(state => state.profile?.userId)
	const getDailyData = useSelectedDateStore(state => state.getDailyData)

	const handleDayPress = useCallback(
		(dateString: string) => {
			const isSameDate = selectedDate === dateString
			const newDate = isSameDate ? '' : dateString

			setSelectedDate(newDate)
			if (!isSameDate && userId && newDate) {
				getDailyData(userId, newDate)
			}
			onSelectDate?.(newDate)
		},
		[selectedDate, userId, getDailyData, setSelectedDate, onSelectDate]
	)

	const renderCustomHeader = (date: any) => {
		let validDate: Date

		try {
			validDate = new Date(date)
			if (isNaN(validDate.getTime())) throw new Error('Invalid date')
			return <HeaderTxt>{format(validDate, 'yyyy년 M월')}</HeaderTxt>
		} catch {
			return <HeaderTxt>날짜 오류</HeaderTxt>
		}
	}

	const RenderDay = useCallback(
		({date}: {date?: DateData}) => {
			if (!date) return null

			const schedules = dataByDate[date.dateString]?.schedule || []

			return (
				<DayComponent
					date={date}
					selectedDate={selectedDate}
					handlePress={handleDayPress}
					schedules={schedules}
				/>
			)
		},
		[dataByDate, selectedDate, handleDayPress]
	)

	return (
		<CalenderUIWrapper>
			<CalendarList
				style={calendarStyle}
				theme={calendarTheme}
				markedDates={{}}
				renderHeader={renderCustomHeader}
				dayComponent={RenderDay}
				displayLoadingIndicator={false}
				hideArrows={false}
				pastScrollRange={12}
				futureScrollRange={12}
				scrollEnabled
				horizontal
				pagingEnabled
				disableMonthChange={false}
				showSixWeeks={true}
				hideExtraDay={false}
				initialDate={new Date().toISOString().slice(0, 10)}
			/>
		</CalenderUIWrapper>
	)
}

const HeaderTxt = styled.Text`
	font-size: 18px;
	padding: 20px;
	font-family: 'DoHyeon-Regular';
	color: #636363;
`

const CalenderUIWrapper = styled(View)({
	flex: 1,
	padding: 16,
	borderBottomWidth: 1,
	borderColor: '#e0e0e0'
})

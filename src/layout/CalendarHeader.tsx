import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Modal} from 'react-native'
import styled from '@emotion/native'
import {useNavigation} from '@react-navigation/native'
import IFeather from 'react-native-vector-icons/Feather'
import {useSelectedDateStore} from '../store/useSelectDateStore'
import {CalendarUI} from '../components/calendar/calendarUI/Calendar'
import {format} from 'date-fns'
import {ko} from 'date-fns/locale'

interface Props {
	title?: React.ReactNode
	children: React.ReactNode
	dateEditable?: boolean
	onSave?: () => void
	mode?: 'edit' | 'view' // for deciding check vs pencil
}

export default function EditableHeaderLayout({
	title,
	children,
	dateEditable,
	onSave,
	mode = 'edit'
}: Props) {
	const navigation = useNavigation()
	const [showCalendar, setShowCalendar] = useState(false)
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate)

	let formattedDate = '날짜 선택'
	try {
		const dateObj = new Date(selectedDate)
		if (!isNaN(dateObj.getTime())) {
			formattedDate = format(dateObj, 'yyyy년 MM월 dd일', {locale: ko})
		}
	} catch (e) {
		console.error('Invalid selectedDate:', selectedDate)
	}

	useEffect(() => {
		if (!selectedDate) {
			const today = new Date().toISOString().slice(0, 10)
			setSelectedDate(today)
		}
	}, [selectedDate, setSelectedDate])

	return (
		<Container>
			<TopHeader>
				<IconButton onPress={() => navigation.goBack()}>
					<IFeather name="chevron-left" size={24} color="#000000" />
				</IconButton>

				<HeaderTitleWrapper>
					{title && <HeaderTitle>{title}</HeaderTitle>}
				</HeaderTitleWrapper>

				<IconButton onPress={onSave}>
					<IFeather
						name={mode === 'edit' ? 'check' : 'edit'}
						size={24}
						color="#000000"
					/>
				</IconButton>
			</TopHeader>

			<DateRow>
				<DateText>{formattedDate}</DateText>
				{dateEditable !== false && (
					<TouchableOpacity onPress={() => setShowCalendar(true)}>
						<DateButtonText>{'날짜 선택'}</DateButtonText>
					</TouchableOpacity>
				)}
			</DateRow>

			<Content>{children}</Content>

			<Modal
				visible={showCalendar}
				animationType="slide"
				onRequestClose={() => setShowCalendar(false)}>
				<CalendarUI
					onSelectDate={date => {
						setSelectedDate(date)
						setShowCalendar(false)
					}}
				/>
			</Modal>
		</Container>
	)
}

const Container = styled(View)({
	flex: 1,
	backgroundColor: '#faf9f9'
})

const TopHeader = styled(View)({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingTop: 20,
	paddingHorizontal: 16
})

const IconButton = styled(TouchableOpacity)({
	padding: 8
})

const HeaderTitleWrapper = styled(View)({
	flex: 1,
	alignItems: 'center'
})

const HeaderTitle = styled(Text)({
	fontSize: 20,
	fontWeight: 'bold',
	color: '#4b4b4b',
	textShadowColor: 'rgb(101, 116, 179)', // 그림자 색
	// textShadowOffset: {width: 1, height: 1}, // 그림자 위치
	textShadowRadius: 2
})

const DateRow = styled(View)({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginTop: 16,
	paddingHorizontal: 18,
	paddingVertical: 20,
	borderBottomWidth: 1,
	borderColor: '#e0e0e029'
})

const DateText = styled(Text)({
	fontSize: 18,
	color: '#6b6b6b',
	fontWeight: 'bold',
	paddingLeft: 8
})

const DateButtonText = styled(Text)({
	color: '#ffffff',
	paddingVertical: 5,
	paddingHorizontal: 12,
	backgroundColor: '#4b4b4b',
	borderRadius: 4,
	fontWeight: 'bold',
	textAlign: 'center',
	alignItems: 'center',
	elevation: 3
})

const Content = styled(View)({
	flex: 1,
	paddingHorizontal: 16,
	backgroundColor: '#fff'
})

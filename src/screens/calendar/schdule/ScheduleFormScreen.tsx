import React, {useEffect, useState} from 'react'
import {View, Text, TextInput} from 'react-native'
import Layout from '../../../layout/Layout'
import EditableHeaderLayout from '../../../layout/CalendarHeader'
import styled from '@emotion/native'
import {useUserStore} from '../../../store/useUserStore'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import {useNavigation, useRoute} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList, Schedule, ScheduleColor} from '../../../utils/type'
import {v4 as uuidv4} from 'uuid'
import Icon from 'react-native-vector-icons/Feather'
import CustomToggle from '../../../components/common/CustomToggle'
import CustomTimePicker from '../../../components/schedule/TimePicker'

const COLORS: ScheduleColor[] = [
	ScheduleColor.RED,
	ScheduleColor.BLUE,
	ScheduleColor.GREEN,
	ScheduleColor.ORANGE,
	ScheduleColor.PURPLE,
	ScheduleColor.PINK,
	ScheduleColor.CYAN
]

type RouteParams = {
	ScheduleFormScreen: {
		mode?: 'edit' | 'create'
		scheduleId?: string
	}
}

export default function ScheduleFormScreen() {
	const {profile} = useUserStore()
	const userId = profile?.userId
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const {dataByDate, updateSchedule} = useSelectedDateStore()

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()
	const route = useRoute<RouteProp<RouteParams, 'ScheduleFormScreen'>>()
	const mode = route.params?.mode ?? 'create'
	const scheduleId = route.params?.scheduleId
	const selectedData = dataByDate[selectedDate]
	const existingSchedule = selectedData?.schedule?.find(
		s => s.id === scheduleId
	)

	const [content, setContent] = useState('')
	const [isAllDay, setIsAllDay] = useState(true)
	const [color, setColor] = useState<ScheduleColor>(ScheduleColor.BLUE)
	const [startHour, setStartHour] = useState('09')
	const [startMinute, setStartMinute] = useState('00')
	const [endHour, setEndHour] = useState('10')
	const [endMinute, setEndMinute] = useState('00')

	useEffect(() => {
		if (mode === 'edit' && existingSchedule) {
			setContent(existingSchedule.content)
			setIsAllDay(existingSchedule.isAllDay)
			setColor(existingSchedule.color)
			if (!existingSchedule.isAllDay) {
				setStartHour(existingSchedule.startTime?.slice(0, 2) ?? '09')
				setStartMinute(existingSchedule.startTime?.slice(3, 5) ?? '00')
				setEndHour(existingSchedule.endTime?.slice(0, 2) ?? '10')
				setEndMinute(existingSchedule.endTime?.slice(3, 5) ?? '00')
			}
		}
	}, [mode, existingSchedule])

	const handleSave = async () => {
		if (!userId || !selectedDate || !content.trim()) return
		const newSchedule: Schedule = {
			id: scheduleId ?? uuidv4(),
			content,
			startDate: selectedDate,
			endDate: selectedDate,
			isAllDay,
			color
		}

		if (!isAllDay) {
			newSchedule.startTime = `${startHour}:${startMinute}`
			newSchedule.endTime = `${endHour}:${endMinute}`
		}

		await updateSchedule(userId, selectedDate, newSchedule)
		navigation.navigate('ScheduleScreen')
	}

	return (
		<Layout>
			<EditableHeaderLayout title="일정 등록" mode="edit" onSave={handleSave}>
				<FormWrapper>
					<LabelRow>
						<HighlightBar />
						<Label>일정 내용</Label>
					</LabelRow>

					<StyledInput
						placeholder="일정 내용을 입력하세요"
						value={content}
						onChangeText={setContent}
					/>

					<Row>
						<LabelRow>
							<HighlightBar />
							<Label>종일</Label>
						</LabelRow>

						<CustomToggle
							isOn={isAllDay}
							onToggle={() => setIsAllDay(prev => !prev)}
						/>
					</Row>

					{!isAllDay && (
						<PickerWrapper>
							<CustomTimePicker
								label="시작 시간"
								hour={startHour}
								minute={startMinute}
								setHour={setStartHour}
								setMinute={setStartMinute}
							/>
							<CustomTimePicker
								label="종료 시간"
								hour={endHour}
								minute={endMinute}
								setHour={setEndHour}
								setMinute={setEndMinute}
							/>
						</PickerWrapper>
					)}

					{isAllDay && <Spacing />}

					<LabelRow>
						<HighlightBar />
						<Label>색상 선택</Label>
					</LabelRow>

					<ColorRow>
						{COLORS.map(c => (
							<ColorDot
								key={c}
								style={{backgroundColor: c, borderWidth: color === c ? 2 : 0}}
								onPress={() => setColor(c)}>
								{color === c && <Icon name="check" size={14} color="#fff" />}
							</ColorDot>
						))}
					</ColorRow>
				</FormWrapper>
			</EditableHeaderLayout>
		</Layout>
	)
}

const Spacing = styled(View)`
	display: flex;
	height: 20px;
`

const LabelRow = styled(View)({
	flexDirection: 'row',
	alignItems: 'center',
	marginBottom: 8,
	alignContent: 'center',
	display: 'flex'
})

const HighlightBar = styled(View)({
	width: 3,
	height: 16,
	alignItems: 'center',

	backgroundColor: '#c7c7c7'
})

const PickerWrapper = styled(View)`
	margin-left: 10px;
	background-color: '#7e7e7e';
	width: 100%;
	height: auto;
	display: flex;
	margin-bottom: 20px;
`
const FormWrapper = styled(View)`
	padding: 16px;
	margin-top: 10px;
`
const Label = styled(Text)`
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-left: 4px;
`
const StyledInput = styled(TextInput)({
	borderWidth: 1,
	borderColor: '#ccc',
	color: '#333',
	paddingVertical: 4,
	paddingHorizontal: 12,
	borderRadius: 8,
	marginBottom: 40,
	marginTop: 8
})
const Row = styled(View)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`
const ColorRow = styled(View)`
	flex-direction: row;
	gap: 10px;
	flex-wrap: wrap;
`
const ColorDot = styled.TouchableOpacity({
	width: 30,
	height: 30,
	borderRadius: 15,
	borderColor: 'transparent',
	alignItems: 'center',
	justifyContent: 'center'
})

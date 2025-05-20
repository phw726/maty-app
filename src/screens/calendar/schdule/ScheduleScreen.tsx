import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import Layout from '../../../layout/Layout'
import EditableHeaderLayout from '../../../layout/CalendarHeader'
import styled from '@emotion/native'
import {useUserStore} from '../../../store/useUserStore'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import {useNavigation, useRoute} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '../../../utils/type'
import DeleteBtn from '../../../components/common/DeleteBtn'
import {deleteSchedule} from '../../../aws/api/schedule'

export default function ScheduleScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()
	const userId = useUserStore(state => state.profile?.userId)
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const selectedData = useSelectedDateStore(
		state => state.dataByDate[selectedDate]
	)
	const getDailyData = useSelectedDateStore(state => state.getDailyData)
	const route = useRoute<RouteProp<RootStackParamList, 'ScheduleScreen'>>()
	const scheduleId = route.params?.scheduleId
	const schedule = selectedData?.schedule?.find(s => s.id === scheduleId)

	useEffect(() => {
		if (userId && selectedDate) {
			getDailyData(userId, selectedDate)
		}
	}, [userId, selectedDate, getDailyData])

	if (!schedule) {
		return (
			<Layout>
				<EditableHeaderLayout title="일정 상세" mode="view">
					<NoContent>일정을 찾을 수 없습니다.</NoContent>
				</EditableHeaderLayout>
			</Layout>
		)
	}

	const handleEdit = () => {
		navigation.navigate('ScheduleFormScreen', {
			mode: 'edit',
			scheduleId: schedule.id
		})
	}

	return (
		<Layout>
			<EditableHeaderLayout
				title="일정 상세 보기"
				mode="view"
				onSave={handleEdit}>
				<Wrapper>
					<ScheduleRow>
						<ColorBar style={{backgroundColor: schedule.color}} />
						<TextContent>
							<ContentText>{schedule.content}</ContentText>
							<Meta>
								{schedule.isAllDay
									? '종일 일정'
									: `${schedule.startTime} ~ ${schedule.endTime}`}
							</Meta>
						</TextContent>
					</ScheduleRow>
				</Wrapper>
				<DeleteBtn
					mode="edit"
					hasContent={!!schedule?.content}
					deleteFn={() => deleteSchedule(userId, selectedDate, schedule.id)}
				/>
			</EditableHeaderLayout>
		</Layout>
	)
}

const ScheduleRow = styled(View)`
	flex-direction: row;
	align-items: flex-start;
`

const ColorBar = styled(View)({
	width: 5,
	height: '100%',
	// borderRadius: 1.5,
	marginRight: 20
})

const TextContent = styled(View)`
	flex: 1;
`

const Wrapper = styled(View)`
	flex: 1;
	padding: 16px;
`

const ContentText = styled(Text)`
	font-size: 18px;
	color: #333;
	margin-bottom: 12px;
`

const Meta = styled(Text)`
	font-size: 14px;
	color: #888;
`

const NoContent = styled(Text)`
	font-size: 16px;
	color: #aaa;
	text-align: center;
	margin-top: 40px;
`

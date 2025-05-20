import React from 'react'
import {View, Text} from 'react-native'
import styled from '@emotion/native'
import {RootStackParamList, Schedule as SchduleType} from '../../../utils/type'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

interface Props {
	schedules: SchduleType[]
}

export default function Schedule({schedules}: Props) {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()

	const handlePress = (scheduleId: string) => {
		navigation.navigate('ScheduleScreen', {scheduleId})
	}
	return (
		<ScheduleWrapper>
			{schedules && schedules.length > 0 ? (
				schedules.map(schedule => (
					<TouchableScheduleItem
						key={schedule.id}
						onPress={() => handlePress(schedule.id)}>
						<ColorDot color={schedule.color} />
						<TextContent>
							<Title>{schedule.content}</Title>
							<SubText>
								{schedule.isAllDay
									? '종일'
									: `${schedule.startTime} ~ ${schedule.endTime}`}
							</SubText>
						</TextContent>
					</TouchableScheduleItem>
				))
			) : (
				<NoSchedule>
					<ColorDot color={'#e0e0e0'} />
					<EmptyText>등록된 일정이 없습니다.</EmptyText>
				</NoSchedule>
			)}
		</ScheduleWrapper>
	)
}

const ScheduleWrapper = styled(View)`
	padding: 10px 18px;
	margin-top: 8px;
`

const NoSchedule = styled(View)`
	display: flex;
	flex-direction: row;
	text-align: center;
	align-items: center;
`
const EmptyText = styled(Text)`
	color: #c2c2c2;
`

const TouchableScheduleItem = styled.TouchableOpacity({
	flexDirection: 'row',
	alignItems: 'center',
	paddingVertical: 10
})

// const ColorDot = styled(View)<{color: string}>`
// 	width: 10px;
// 	height: 10px;
// 	border-radius: 10;
// 	background-color: ${({color}) => color};
// 	margin-right: 8px;
// `

const ColorDot = styled(View)<{color: string}>(props => ({
	width: 10,
	height: 10,
	borderRadius: 10,
	backgroundColor: props.color,
	marginRight: 8
}))

const TextContent = styled(View)`
	flex-direction: column;
`

const Title = styled(Text)`
	font-size: 15px;
	font-weight: bold;
	color: #333;
`

const SubText = styled(Text)`
	font-size: 12px;
	color: #666;
`

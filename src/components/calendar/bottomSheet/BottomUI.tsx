import {View} from 'react-native'
import React from 'react'
import Schedule from './Schedule'
import styled from '@emotion/native'
import {StatusBar} from '../../common/StatusBar'
import {DiaryForm, TodoForm} from './ContentsForm'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import {useUserStore} from '../../../store/useUserStore'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../../utils/type'

export default function BottomUI() {
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const selectedData = useSelectedDateStore(
		state => state.dataByDate[selectedDate]
	)
	const toggleTodo = useSelectedDateStore(state => state.toggleTodo)
	const userId = useUserStore(state => state.profile?.userId)
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()

	const handleToggleTodo = (id: string) => {
		if (!selectedDate || !userId) return
		toggleTodo(userId, selectedDate, id)
	}

	const handleDiaryPress = () => navigation.navigate('DiaryScreen')
	const handleTodoPress = () => navigation.navigate('TodoScreen')
	return (
		<SummeryWrapper>
			<StatusBar />
			<SheetWrapper>
				<Schedule schedules={selectedData?.schedule ?? []} />
				<TodoForm
					todos={selectedData?.todos}
					onToggleTodo={handleToggleTodo}
					onPress={handleTodoPress}
				/>
				<DiaryForm diary={selectedData?.diary} onPress={handleDiaryPress} />
			</SheetWrapper>
		</SummeryWrapper>
	)
}

const SummeryWrapper = styled(View)({
	flex: 1,
	flexDirection: 'column',
	width: '100%'
	// height: '100%'
})

const SheetWrapper = styled(View)({
	backgroundColor: '#faf9f9',
	minHeight: 800
})

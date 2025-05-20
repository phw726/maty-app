import React, {useState, useCallback, useEffect} from 'react'
import {
	View,
	KeyboardAvoidingView,
	Platform,
	FlatList,
	TouchableWithoutFeedback,
	Keyboard,
	Text
} from 'react-native'
import styled from '@emotion/native'
import {v4 as uuidv4} from 'uuid'
import {useUserStore} from '../../../store/useUserStore'
import EditableHeaderLayout from '../../../layout/CalendarHeader'
import {RootStackParamList, Todo} from '../../../utils/type'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import Layout from '../../../layout/Layout'
import TodoListItem from '../../../components/todo/TodoListItem'
import TodoForm from '../../../components/todo/TodoForm'
import {RouteProp, useRoute} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DeleteBtn from '../../../components/common/DeleteBtn'

export default function TodoScreen() {
	const [content, setContent] = useState('')
	const [editingId, setEditingId] = useState<string | null>(null)
	const route = useRoute<RouteProp<RootStackParamList, 'TodoScreen'>>()
	const [mode, setMode] = useState<'view' | 'edit'>(
		route.params?.mode ?? 'view'
	)
	const userId = useUserStore(state => state.profile?.userId)
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const dataByDate = useSelectedDateStore(state => state.dataByDate)
	const todos = dataByDate[selectedDate]?.todos ?? []

	const updateTodo = useSelectedDateStore(state => state.updateTodo)
	const toggleTodo = useSelectedDateStore(state => state.toggleTodo)
	const deleteTodo = useSelectedDateStore(state => state.deleteTodo)
	const getDailyData = useSelectedDateStore(state => state.getDailyData)

	const isViewMode = mode === 'view'

	const handleSubmit = async () => {
		if (!userId || !selectedDate || !content.trim()) return

		const todo: Todo = {
			id: editingId ?? uuidv4(),
			content,
			isComplete:
				editingId != null
					? todos.find(t => t.id === editingId)?.isComplete ?? false
					: false
		}

		setContent('')
		setEditingId(null)
		await updateTodo(userId, selectedDate, todo)
	}

	const handleToggle = useCallback(
		async (id: string) => {
			if (!userId || !selectedDate) return
			await toggleTodo(userId, selectedDate, id)
		},
		[userId, selectedDate, toggleTodo]
	)

	const handleDelete = useCallback(
		async (id: string) => {
			if (!userId || !selectedDate) return
			await deleteTodo(userId, selectedDate, id)
		},
		[userId, selectedDate, deleteTodo]
	)

	useEffect(() => {
		if (!dataByDate[selectedDate]) {
			getDailyData(userId, selectedDate)
		}
	}, [userId, selectedDate, dataByDate, getDailyData])

	return (
		<Layout>
			<EditableHeaderLayout
				title="오늘의 목표"
				mode={mode}
				onSave={() => setMode(isViewMode ? 'edit' : 'view')}>
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={150}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={{flex: 1}}>
							<FlatList
								data={todos}
								keyExtractor={item => item.id}
								renderItem={({item}) => (
									<TodoListItem
										item={item}
										onToggle={handleToggle}
										onDelete={handleDelete}
										isViewMode={isViewMode}
									/>
								)}
								ListEmptyComponent={
									isViewMode ? (
										<EmptyWrapper>
											<Icon
												name="checkbox-marked"
												size={20}
												color="#8686869e"
											/>
											<EmptyText>오늘의 목표를 추가해보세요!</EmptyText>
										</EmptyWrapper>
									) : null
								}
								contentContainerStyle={{paddingBottom: 180 + 32}}
							/>

							{!isViewMode && (
								<BottomWrapper>
									<TodoForm
										content={content}
										onChange={setContent}
										onSubmit={handleSubmit}
									/>
								</BottomWrapper>
							)}

							{isViewMode && todos.length > 0 && (
								<DeleteBtn
									mode="edit"
									hasContent={true}
									deleteFn={async () => {
										if (!userId || !selectedDate) return
										for (const todo of todos) {
											await deleteTodo(userId, selectedDate, todo.id)
										}
									}}
									onDone={() => getDailyData(userId, selectedDate)}
								/>
							)}
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</EditableHeaderLayout>
		</Layout>
	)
}

const BottomWrapper = styled(View)({
	marginTop: 10,
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	padding: 16
})

const EmptyWrapper = styled(View)({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: 40,
	marginLeft: 10
})

const EmptyText = styled(Text)({
	// textAlign: 'center',
	color: '#c4c4c4',
	fontSize: 15,
	marginLeft: 10
})

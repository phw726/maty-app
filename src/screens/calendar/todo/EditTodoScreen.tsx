import React, {useState, useCallback} from 'react'
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	KeyboardAvoidingView,
	Platform,
	FlatList
} from 'react-native'
import styled from '@emotion/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {v4 as uuidv4} from 'uuid'
import {useNavigation} from '@react-navigation/native'
import {useUserStore} from '../../../store/useUserStore'
import EditableHeaderLayout from '../../../layout/CalendarHeader'
import {Todo} from '../../../utils/type'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RouteName, ROUTES} from '../../../constants/routes'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import Layout from '../../../layout/Layout'

export default function AddTodoScreen() {
	const [content, setContent] = useState('')
	const [editingId, setEditingId] = useState<string | null>(null)

	const userId = useUserStore(state => state.profile?.userId)
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const dataByDate = useSelectedDateStore(state => state.dataByDate)
	const todos = dataByDate[selectedDate]?.todos || []
	const updateTodo = useSelectedDateStore(state => state.updateTodo)
	const toggleTodo = useSelectedDateStore(state => state.toggleTodo)
	const deleteTodo = useSelectedDateStore(state => state.deleteTodo)

	const navigation =
		useNavigation<NativeStackNavigationProp<Record<RouteName, any>>>()

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

	const handleSave = () => {
		const latestTodo = todos[todos.length - 1]
		if (latestTodo) {
			navigation.navigate(ROUTES.TodoScreen, {todo: latestTodo})
		}
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

	const renderItem = useCallback(
		({item}: {item: Todo}) => (
			<TodoRow>
				<TouchableOpacity
					onPress={() => handleToggle(item.id)}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
					<Icon
						name={
							item.isComplete ? 'checkbox-marked' : 'checkbox-blank-outline'
						}
						size={20}
						color="#acc0ff"
					/>
				</TouchableOpacity>
				<TodoText $isComplete={item.isComplete}>{item.content}</TodoText>
				<TouchableOpacity
					onPress={() => handleDelete(item.id)}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
					style={{marginLeft: 'auto'}}>
					<Icon name="minus-circle-outline" size={20} color="#cdcdcd" />
				</TouchableOpacity>
			</TodoRow>
		),
		[handleToggle, handleDelete]
	)

	return (
		<Layout>
			<EditableHeaderLayout title="오늘의 목표">
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={80}>
					<FlatList
						data={todos}
						keyExtractor={item => item.id}
						renderItem={renderItem}
						contentContainerStyle={{paddingBottom: 180}}
					/>

					<BottomWrapper>
						<InputRow>
							<TodoInput
								placeholder="오늘의 목표를 입력하세요"
								value={content}
								placeholderTextColor="#b0b0b0"
								onChangeText={setContent}
								onSubmitEditing={handleSubmit}
								returnKeyType="done"
							/>
							<TouchableOpacity onPress={handleSubmit}>
								<Icon name="plus-circle" size={28} color="#acc0ff" />
							</TouchableOpacity>
						</InputRow>

						<TouchableOpacity
							onPress={handleSave}
							style={{
								backgroundColor: '#000000ec',
								padding: 12,
								borderRadius: 8,
								marginBottom: 30
							}}>
							<ButtonText>저장하기</ButtonText>
						</TouchableOpacity>
					</BottomWrapper>
				</KeyboardAvoidingView>
			</EditableHeaderLayout>
		</Layout>
	)
}

const TodoRow = styled(View)({
	flexDirection: 'row',
	alignItems: 'center',
	paddingVertical: 16,
	paddingHorizontal: 12,
	borderBottomWidth: 1,
	borderColor: '#d2d2d24a'
})

const TodoText = styled(Text)<{$isComplete?: boolean}>`
	margin-left: 8px;
	font-size: 16px;
	color: ${({$isComplete}) => ($isComplete ? '#ccc' : '#333')};
	text-decoration-line: ${({$isComplete}) =>
		$isComplete ? 'line-through' : 'none'};
`

const InputRow = styled(View)({
	flexDirection: 'row',
	alignItems: 'center',
	borderWidth: 1,
	borderColor: '#e6e6e6',
	borderRadius: 8,
	paddingHorizontal: 16,
	paddingVertical: 2,
	marginTop: 16,
	marginBottom: 20
})

const TodoInput = styled(TextInput)`
	flex: 1;
	font-size: 16px;
	color: #22272b;
`

const BottomWrapper = styled(View)`
	margin-top: 10px;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 16px;
`

const ButtonText = styled(Text)`
	color: #acc0ff;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
`

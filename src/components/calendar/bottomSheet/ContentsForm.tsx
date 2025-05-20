import React from 'react'
import styled from '@emotion/native'
import {Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Diary, Todo} from '../../../utils/type'

interface DiaryFormProps {
	diary?: Diary
	onPress: () => void
}

interface TodoFormProps {
	todos?: Todo[]
	onToggleTodo: (id: string) => void
	onPress: () => void
}

export const DiaryForm = ({diary, onPress}: DiaryFormProps) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9}>
			<FormWrapper>
				<FormTitle>DIARY</FormTitle>
				{diary ? (
					<FormText>{diary.content}</FormText>
				) : (
					<FormText $disabled>오늘 하루는 어땠나요?</FormText>
				)}
			</FormWrapper>
		</TouchableOpacity>
	)
}

export const TodoForm = ({todos, onToggleTodo, onPress}: TodoFormProps) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9}>
			<FormWrapper>
				<FormTitle>TODO LIST</FormTitle>
				{todos && todos.length > 0 ? (
					todos.map(todo => (
						<TodoRow key={todo.id}>
							<TouchableOpacity
								onPress={() => onToggleTodo(todo.id)}
								activeOpacity={0.6}
								hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
								<Icon
									name={
										todo.isComplete
											? 'checkbox-marked'
											: 'checkbox-blank-outline'
									}
									size={16}
									color="#8f70ff9e"
									style={{marginRight: 4}}
								/>
							</TouchableOpacity>
							<FormText $isComplete={todo.isComplete}>{todo.content}</FormText>
						</TodoRow>
					))
				) : (
					<FormText $disabled>오늘은 어떤 목표를 가지고 계신가요?</FormText>
				)}
			</FormWrapper>
		</TouchableOpacity>
	)
}

const FormWrapper = styled(View)({
	display: 'flex',
	flexDirection: 'column',
	marginVertical: 4,
	marginHorizontal: 16,
	paddingVertical: 10,
	paddingHorizontal: 14,
	borderWidth: 1,
	borderColor: '#5a5a5a28',
	borderRadius: 10
})

const FormTitle = styled(Text)`
	font-size: 13px;
	font-family: 'Exo2-VariableFont_wght';
	color: #747474d3;
	margin-bottom: 8px;
`

const FormText = styled(Text)<{$isComplete?: boolean; $disabled?: boolean}>`
	font-size: 14px;
	align-items: center;
	color: ${({$isComplete, $disabled}) =>
		$isComplete ? '#c2c2c2' : $disabled ? '#c4c4c4' : '#4f4f4f'};
	text-decoration-line: ${({$isComplete}) =>
		$isComplete ? 'line-through' : 'none'};
`

const TodoRow = styled(View)`
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
	align-items: center;
	text-align: center;
`

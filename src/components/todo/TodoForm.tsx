import React from 'react'
import {TextInput, TouchableOpacity, View} from 'react-native'
import styled from '@emotion/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function TodoForm({
	content,
	onChange,
	onSubmit
}: {
	content: string
	onChange: (text: string) => void
	onSubmit: () => void
}) {
	return (
		<InputRow>
			<TodoInput
				placeholder="오늘의 목표를 입력하세요"
				value={content}
				placeholderTextColor="#b0b0b0"
				onChangeText={onChange}
				onSubmitEditing={onSubmit}
				returnKeyType="done"
				style={{backgroundColor: '#fff', zIndex: 10}}
			/>
			<TouchableOpacity onPress={onSubmit}>
				<Icon name="plus-circle" size={28} color="#8f70ff9e" />
			</TouchableOpacity>
		</InputRow>
	)
}

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

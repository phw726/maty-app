import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import styled from '@emotion/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Todo} from '../../utils/type'

export default function TodoListItem({
	item,
	onToggle,
	onDelete,
	isViewMode
}: {
	item: Todo
	onToggle: (id: string) => void
	onDelete: (id: string) => void
	isViewMode: boolean
}) {
	return (
		<TodoRow>
			<TouchableOpacity
				onPress={() => onToggle(item.id)}
				hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
				<Icon
					name={item.isComplete ? 'checkbox-marked' : 'checkbox-blank-outline'}
					size={20}
					color="#8f70ff9e"
				/>
			</TouchableOpacity>
			<TodoText $isComplete={item.isComplete}>{item.content}</TodoText>
			{!isViewMode && (
				<TouchableOpacity
					onPress={() => onDelete(item.id)}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
					style={{marginLeft: 'auto'}}>
					<Icon name="minus-circle-outline" size={20} color="#cdcdcd" />
				</TouchableOpacity>
			)}
		</TodoRow>
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

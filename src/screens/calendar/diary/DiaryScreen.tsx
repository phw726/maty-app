import React from 'react'
import {Text, View} from 'react-native'
import styled from '@emotion/native'
import Layout from '../../../layout/Layout'
import EditableHeaderLayout from '../../../layout/CalendarHeader'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../../utils/type'
import DeleteBtn from '../../../components/common/DeleteBtn'
import {deleteDiary} from '../../../aws/api/diary'
import {useUserStore} from '../../../store/useUserStore'

export default function DiaryScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const selectedData = useSelectedDateStore(
		state => state.dataByDate[selectedDate]
	)
	const hasContent = !!selectedData?.diary?.content
	const content = hasContent
		? selectedData.diary.content
		: '작성된 내용이 없습니다.'
	const userId = useUserStore(state => state.profile?.userId)
	const handleEdit = () => {
		navigation.navigate('DiaryFormScreen', {mode: 'edit'})
	}

	return (
		<Layout>
			<EditableHeaderLayout title="오늘의 기록" mode="view" onSave={handleEdit}>
				<Wrapper>
					<DiaryText $placeholder={!hasContent}>{content}</DiaryText>
				</Wrapper>
				{hasContent && (
					<DeleteBtn
						mode="create"
						hasContent={!!selectedData?.diary?.content}
						deleteFn={() => deleteDiary(userId, selectedDate)}
					/>
				)}
			</EditableHeaderLayout>
		</Layout>
	)
}

const Wrapper = styled(View)({
	flex: 1,
	padding: 16
})

const DiaryText = styled(Text)<{$placeholder?: boolean}>(({$placeholder}) => ({
	fontSize: 16,
	color: $placeholder ? '#c0c0c0' : '#333', // 회색 or 진한 텍스트
	lineHeight: 24
}))

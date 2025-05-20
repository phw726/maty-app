import React from 'react'
import {useSelectedDateStore} from '../../../store/useSelectDateStore'
import {useEffect, useState} from 'react'
import Layout from '../../../layout/Layout'
import EditableHeaderLayout from '../../../layout/CalendarHeader'
import styled from '@emotion/native'
import {Alert, TextInput, View} from 'react-native'
import {useUserStore} from '../../../store/useUserStore'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../../utils/type'
import {deleteDiary} from '../../../aws/api/diary'
import DeleteBtn from '../../../components/common/DeleteBtn'
// {
//   "userId": "user123",
//   "date": "2025-04-08",
//   "content": "오늘 하루도 열심히 살았다! 🌞"
// }

type RouteParams = {
	DiaryForm: {
		mode?: 'edit' | 'view'
	}
}
export default function DiaryFormScreen() {
	const userId = useUserStore(state => state.profile?.userId)
	const selectedDate = useSelectedDateStore(state => state.selectedDate)
	const selectedData = useSelectedDateStore(
		state => state.dataByDate[selectedDate]
	)
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()
	const updateDiary = useSelectedDateStore(state => state.updateDiary)
	const [content, setContent] = useState('')
	const route = useRoute<RouteProp<RouteParams, 'DiaryForm'>>()
	const mode = route.params?.mode ?? 'create'

	useEffect(() => {
		if (mode === 'edit' && selectedData?.diary?.content) {
			setContent(selectedData.diary.content)
		}
	}, [mode, selectedData, selectedDate])

	// if (!selectedDate) return null

	const handleSave = async () => {
		if (!userId || !selectedDate) return

		if (!content.trim()) {
			Alert.alert('내용이 없습니다', '내용을 입력해주세요.')
			return
		}

		try {
			await updateDiary(userId, selectedDate, content)
			navigation.navigate('DiaryScreen') // 또는 navigation.goBack()
		} catch (err) {
			Alert.alert('저장 실패', '네트워크 상태를 확인해주세요.')
		}
	}

	return (
		<Layout>
			<EditableHeaderLayout title="오늘의 기록" mode="edit" onSave={handleSave}>
				<Wrapper>
					<DiaryInput
						placeholder="오늘 하루는 어땠나요?"
						placeholderTextColor="#c0c0c0"
						multiline
						value={content}
						onChangeText={setContent}
					/>
					<DeleteBtn
						mode="edit"
						hasContent={!!selectedData?.diary?.content}
						deleteFn={() => deleteDiary(userId, selectedDate)}
					/>
				</Wrapper>
			</EditableHeaderLayout>
		</Layout>
	)
}

const Wrapper = styled(View)`
	flex: 1;
	padding: 16px 7px;
`

const DiaryInput = styled(TextInput)({
	flex: 1,
	fontSize: 16,
	color: '#22272b',
	// padding: 16,
	borderRadius: 12,
	textAlignVertical: 'top'
})

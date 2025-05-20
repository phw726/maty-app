import React from 'react'
import {Alert} from 'react-native'
import styled from '@emotion/native'
import Feather from 'react-native-vector-icons/Feather'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../utils/type'
import {useSelectedDateStore} from '../../store/useSelectDateStore'

type Props = {
	mode: 'edit' | 'create'
	deleteFn?: () => Promise<void>
	hasContent?: boolean
	onDone?: () => void
}

export default function DeleteBtn({
	mode,
	deleteFn,
	hasContent: _hasContent, // ❗ 사용 안할거면 _ 접두사 붙이기
	onDone
}: Props) {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()
	const selectedDate = useSelectedDateStore.getState().selectedDate
	const current = useSelectedDateStore.getState().dataByDate[selectedDate]
	const setDailyData = useSelectedDateStore.getState().setDailyData

	const handlePress = () => {
		Alert.alert(
			mode === 'edit' ? '정말 삭제할까요?' : '작성 취소할까요?',
			mode === 'edit'
				? '삭제한 내용은 복구할 수 없습니다.'
				: '작성 중인 내용이 사라집니다.',
			[
				{text: '취소', style: 'cancel'},
				{
					text: '확인',
					style: 'destructive',
					onPress: async () => {
						// ✅ 옵티미스틱 UI 처리
						if (selectedDate && current) {
							setDailyData(selectedDate, {
								...current,
								diary: undefined
							})
						}

						// ✅ 서버 요청
						if (mode === 'edit' && deleteFn) {
							try {
								await deleteFn()
							} catch (e) {
								Alert.alert('삭제 실패', '네트워크 상태를 확인해주세요.')
							}
						}

						// ✅ 뒤로가기 또는 콜백 실행
						onDone ? onDone() : navigation.goBack()
					}
				}
			]
		)
	}

	return (
		<DeleteButton onPress={handlePress}>
			<Feather name="trash-2" size={24} color="#fff" />
		</DeleteButton>
	)
}

const DeleteButton = styled(TouchableOpacity)({
	marginTop: 40,
	alignItems: 'center',
	borderRadius: 40,
	bottom: 20,
	width: 50,
	height: 50,
	position: 'relative',
	backgroundColor: '#414141',
	alignContent: 'center',
	justifyContent: 'center',
	alignSelf: 'center',
	elevation: 4
})

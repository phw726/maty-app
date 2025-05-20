import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Modal, Pressable} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import styled from '@emotion/native'

interface CustomTimePickerProps {
	label: string
	hour: string
	minute: string
	setHour: (val: string) => void
	setMinute: (val: string) => void
}

export default function CustomTimePicker({
	label,
	hour,
	minute,
	setHour,
	setMinute
}: CustomTimePickerProps) {
	const [showModal, setShowModal] = useState(false)

	const hours = Array.from({length: 24}, (_, i) =>
		i.toString().padStart(2, '0')
	)
	const minutes = Array.from({length: 60}, (_, i) =>
		i.toString().padStart(2, '0')
	)

	return (
		<Wrapper>
			<Label>{label}</Label>
			<TouchableOpacity onPress={() => setShowModal(true)}>
				<DisplayText>{`${hour || '--'}시 ${minute || '--'}분`}</DisplayText>
			</TouchableOpacity>

			<Modal transparent animationType="fade" visible={showModal}>
				<ModalBackground>
					<RowBox>
						<Picker
							selectedValue={hour}
							onValueChange={val => setHour(String(val))}
							style={{
								width: 120,
								height: 50,
								// backgroundColor: '#c4c4c450',
								textAlign: 'center',
								justifyContent: 'center',
								color: '#fafafa'
							}}
							itemStyle={{
								textAlign: 'center',
								fontSize: 16,
								color: '#000',
								justifyContent: 'center'
							}}>
							{hours.map(h => (
								<Picker.Item key={h} label={`${h}시`} value={h} />
							))}
						</Picker>

						<Picker
							selectedValue={minute}
							onValueChange={val => setMinute(String(val))}
							style={{
								width: 120,
								height: 50,
								// backgroundColor: '#8f8f8f50',
								textAlign: 'center',
								alignItems: 'center',
								color: '#f5f5f5',
								justifyContent: 'center'
							}}
							itemStyle={{
								textAlign: 'center',
								fontSize: 16,
								justifyContent: 'center'
							}}>
							{minutes.map(m => (
								<Picker.Item key={m} label={`${m}분`} value={m} />
							))}
						</Picker>

						<Pressable
							onPress={() => setShowModal(false)}
							style={{
								marginLeft: 12,
								backgroundColor: '#3b3b3b',
								paddingVertical: 12,
								paddingHorizontal: 18,
								borderRadius: 8,
								alignSelf: 'center'
							}}>
							<Text
								style={{
									color: '#ffffff',
									fontWeight: 'bold'
									// backgroundColor: '#000'
								}}>
								확인
							</Text>
						</Pressable>
					</RowBox>
				</ModalBackground>
			</Modal>
		</Wrapper>
	)
}

const Wrapper = styled(View)({
	marginBottom: 20
})

const Label = styled(Text)({
	fontSize: 14,
	color: '#333',
	marginBottom: 8
})

const DisplayText = styled(Text)({
	padding: 12,
	borderWidth: 1,
	borderColor: '#ccc',
	borderRadius: 8,
	// backgroundColor: '#f1f1f10',
	color: '#303030'
})

const ModalBackground = styled(View)({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'rgba(0,0,0,0.3)'
})

const RowBox = styled(View)({
	flexDirection: 'row',
	backgroundColor: '#535353d1',
	borderRadius: 12,
	padding: 16,
	alignItems: 'center'
})

import React from 'react'
import styled from '@emotion/native'
import {TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface ITabItem {
	iconName: string
	onPress: () => void
	isActive?: boolean
}

export const TabItem = ({iconName, onPress, isActive}: ITabItem) => {
	return (
		<TabBtn onPress={onPress}>
			<Ionicons
				name={iconName}
				size={24}
				color={isActive ? 'royalblue' : '#e0e0e0'}
			/>
		</TabBtn>
	)
}

const TabBtn = styled(TouchableOpacity)`
	flex: 1;
	align-items: center;
	justify-content: center;
`

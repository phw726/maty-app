import React, {useEffect, useRef} from 'react'
import {Animated, Easing, Pressable} from 'react-native'
import styled from '@emotion/native'

interface Props {
	isOn: boolean
	onToggle: () => void
}

export default function CustomToggle({isOn, onToggle}: Props) {
	const offset = useRef(new Animated.Value(isOn ? 26 : 2)).current

	useEffect(() => {
		Animated.timing(offset, {
			toValue: isOn ? 26 : 2,
			duration: 350,
			easing: Easing.out(Easing.circle),
			useNativeDriver: false
		}).start()
	}, [isOn, offset])

	return (
		<ToggleWrapper onPress={onToggle}>
			<Track isOn={isOn} />
			<Thumb style={{left: offset}} />
		</ToggleWrapper>
	)
}

const ToggleWrapper = styled(Pressable)({
	width: 48,
	height: 24,
	borderRadius: 12,
	position: 'relative',
	justifyContent: 'center'
})

const Track = styled.View<{isOn: boolean}>(({isOn}) => ({
	backgroundColor: isOn ? '#2196F3' : '#ccc',
	width: '100%',
	height: '100%',
	borderRadius: 12
}))

const Thumb = styled(Animated.View)({
	width: 20,
	height: 20,
	borderRadius: 10,
	backgroundColor: 'white',
	position: 'absolute',
	top: 2.1
})

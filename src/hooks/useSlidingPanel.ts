import {useRef} from 'react'
import {Animated, PanResponder, Dimensions} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height

const EXPANDED_POSITION = SCREEN_HEIGHT * -0.03

const DEFAULT_POSITION = SCREEN_HEIGHT * 0.6
const COLLAPSED_POSITION = DEFAULT_POSITION

export const useSlidingPanel = () => {
	const animatedY = useRef(new Animated.Value(DEFAULT_POSITION)).current
	const lastOffset = useRef(DEFAULT_POSITION)

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gestureState) => {
				return Math.abs(gestureState.dy) > 10
			},
			onPanResponderMove: (_, gestureState) => {
				const newY = gestureState.dy + lastOffset.current
				if (newY >= EXPANDED_POSITION && newY <= COLLAPSED_POSITION) {
					animatedY.setValue(newY)
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				let toValue = lastOffset.current

				if (gestureState.dy < -50) {
					toValue = EXPANDED_POSITION
				} else if (gestureState.dy > 50) {
					toValue = COLLAPSED_POSITION
				}

				// 애니메이션 시작
				Animated.spring(animatedY, {
					toValue,
					useNativeDriver: true
				}).start(() => {
					lastOffset.current = toValue
					animatedY.setValue(toValue)
				})
			}
		})
	).current

	return {animatedY, panResponder}
}

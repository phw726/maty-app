import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Platform,
	Animated
} from 'react-native'
import ISticker from 'react-native-vector-icons/Feather'
import ISchedule from 'react-native-vector-icons/FontAwesome'
import ITodo from 'react-native-vector-icons/FontAwesome5'
import IDiary from 'react-native-vector-icons/Octicons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../utils/type'

export default function FloatingUtils() {
	const [isToggle, setIsToggle] = useState(false)
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()
	const rotateAnim = useRef(new Animated.Value(0)).current
	const fadeAnims = useMemo(
		() => [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
		[]
	)

	const transAnims = useMemo(
		() => [
			new Animated.Value(10),
			new Animated.Value(10),
			new Animated.Value(10)
		],
		[]
	)
	const rotate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '90deg']
	})

	const handleToggle = () => {
		setIsToggle(prev => !prev)

		Animated.timing(rotateAnim, {
			toValue: isToggle ? 0 : 1,
			duration: 270,
			useNativeDriver: true
		}).start()
	}

	useEffect(() => {
		const indices = [2, 1, 0] // 가장 아래 버튼부터 애니메이션 시작
		if (isToggle) {
			const animations = indices.map((index, order) =>
				Animated.parallel([
					Animated.timing(fadeAnims[index], {
						toValue: 1,
						duration: 300,
						delay: order * 100,
						useNativeDriver: true
					}),
					Animated.timing(transAnims[index], {
						toValue: 0,
						duration: 300,
						delay: order * 100,
						useNativeDriver: true
					})
				])
			)
			Animated.stagger(100, animations).start()
		} else {
			fadeAnims.forEach((fade, index) => {
				Animated.parallel([
					Animated.timing(fade, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true
					}),
					Animated.timing(transAnims[index], {
						toValue: 10,
						duration: 200,
						useNativeDriver: true
					})
				]).start()
			})
		}
	}, [isToggle, fadeAnims, transAnims])

	return (
		<View style={styles.wrapper}>
			{isToggle &&
				['ScheduleFormScreen', 'TodoScreen', 'DiaryFormScreen'].map(
					(screen, idx) => (
						<Animated.View
							key={screen}
							style={{
								opacity: fadeAnims[idx],
								transform: [{translateY: transAnims[idx]}],
								marginBottom: 10
							}}>
							<TouchableOpacity
								style={[styles.toggleBtn, styles.activeBtn]}
								onPress={() =>
									navigation.navigate(screen as any, {mode: 'edit'})
								}>
								{screen === 'ScheduleFormScreen' && (
									<ISchedule name="calendar-plus-o" size={24} color="#fff" />
								)}
								{screen === 'TodoScreen' && (
									<ITodo name="list" size={24} color="#fff" />
								)}
								{screen === 'DiaryFormScreen' && (
									<IDiary name="pencil" size={24} color="#fff" />
								)}
							</TouchableOpacity>
						</Animated.View>
					)
				)}

			<TouchableOpacity
				style={[
					styles.toggleBtn,
					isToggle ? styles.inactiveBtn : styles.activeBtn
				]}
				onPress={handleToggle}>
				<Animated.View style={{transform: [{rotate}]}}>
					<ISticker name="plus-square" size={24} color="#fff" />
				</Animated.View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		bottom: 40,
		right: 20,
		zIndex: 10,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	toggleWrapper: {
		position: 'absolute',
		bottom: 50,
		padding: 10,
		borderRadius: 10,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	toggleBtn: {
		width: 50,
		height: 50,
		padding: 4,
		borderRadius: 50,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		...Platform.select({
			android: {
				elevation: 3
			}
		})
	},
	activeBtn: {
		backgroundColor: '#353535'
	},
	inactiveBtn: {
		backgroundColor: '#cccccc'
	}
})

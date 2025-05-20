import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {useSlidingPanel} from '../../hooks/useSlidingPanel'
import Layout from '../../layout/Layout'
import {CalendarUI} from '../../components/calendar/calendarUI/Calendar'
import BottomUI from '../../components/calendar/bottomSheet/BottomUI'
import FloatingUtils from '../../components/common/FloatingUtils'

export default function CalendarScreen() {
	const {animatedY, panResponder} = useSlidingPanel()

	return (
		<Layout>
			<FloatingUtils />
			<View style={styles.container}>
				<View style={styles.calendarSection}>
					<CalendarUI />
				</View>

				<Animated.View
					style={[
						styles.bottomPanel,
						{
							transform: [{translateY: animatedY}]
						}
					]}
					{...panResponder.panHandlers}>
					<BottomUI />
				</Animated.View>
			</View>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {flex: 1},
	calendarSection: {
		height: 800,
		backgroundColor: 'transparent'
	},
	bottomPanel: {
		position: 'absolute',
		height: '100%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: -2},
		// shadowOpacity: 0.1,
		shadowRadius: 4
		// elevation: 5
	}
})

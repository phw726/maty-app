import 'react-native-gesture-handler'
import 'react-native-get-random-values'

import {enableScreens} from 'react-native-screens'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import RootStackNavigator from './src/navigation/RootStackNavigator'

enableScreens()

export default function App() {
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<NavigationContainer>
				<RootStackNavigator />
			</NavigationContainer>
		</GestureHandlerRootView>
	)
}

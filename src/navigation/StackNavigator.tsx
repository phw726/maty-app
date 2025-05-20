/* eslint-disable prettier/prettier */
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import MyPageScreen from '../screens/MyPageScreen'
import SettingScreen from '../screens/SettingScreen'
import CalendarScreen from '../screens/calendar/CalendarScreen'
import DiaryScreen from '../screens/calendar/diary/DiaryScreen'
import {ROUTES} from '../constants/routes'
import DiaryFormScreen from '../screens/calendar/diary/DiaryFormScreen'

const Stack = createNativeStackNavigator()

export function HomeStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name={ROUTES.Home} component={HomeScreen} />
			<Stack.Screen name={ROUTES.Calendar} component={CalendarScreen} />
			<Stack.Screen name={ROUTES.Profile} component={MyPageScreen} />
		</Stack.Navigator>
	)
}

export function ProfileStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name={ROUTES.Profile} component={MyPageScreen} />
			<Stack.Screen name={ROUTES.Setting} component={SettingScreen} />
		</Stack.Navigator>
	)
}

export function CalendarStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name={ROUTES.Calendar} component={CalendarScreen} />
			<Stack.Screen name={ROUTES.Setting} component={SettingScreen} />
		</Stack.Navigator>
	)
}

export function DiaryStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name={ROUTES.DiaryScreen} component={DiaryScreen} />
			<Stack.Screen name={ROUTES.DiaryFormScreen} component={DiaryFormScreen} />
		</Stack.Navigator>
	)
}

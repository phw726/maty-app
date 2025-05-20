import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import {
	HomeStackNavigator,
	ProfileStackNavigator,
	CalendarStackNavigator,
	DiaryStackNavigator
} from './StackNavigator'
import TodoScreen from '../screens/calendar/todo/TodoScreen'
import {ROUTES} from '../constants/routes'
import DiaryFormScreen from '../screens/calendar/diary/DiaryFormScreen'
import DiaryScreen from '../screens/calendar/diary/DiaryScreen'
import ScheduleFormScreen from '../screens/calendar/schdule/ScheduleFormScreen'
import ScheduleScreen from '../screens/calendar/schdule/ScheduleScreen'

const Stack = createNativeStackNavigator()

export default function RootStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			{/* 메인 탭 */}
			<Stack.Screen name="MainTabs" component={TabNavigator} />

			{/* 개별 StackNavigator들 */}
			<Stack.Screen name="HomeStack" component={HomeStackNavigator} />
			<Stack.Screen name="ProfileStack" component={ProfileStackNavigator} />
			<Stack.Screen name="CalendarStack" component={CalendarStackNavigator} />
			<Stack.Screen name="DiaryStack" component={DiaryStackNavigator} />
			<Stack.Screen name={ROUTES.TodoScreen} component={TodoScreen} />
			<Stack.Screen name={ROUTES.DiaryFormScreen} component={DiaryFormScreen} />
			<Stack.Screen name={ROUTES.DiaryScreen} component={DiaryScreen} />
			<Stack.Screen
				name={ROUTES.ScheduleFormScreen}
				component={ScheduleFormScreen}
			/>
			<Stack.Screen name={ROUTES.ScheduleScreen} component={ScheduleScreen} />
		</Stack.Navigator>
	)
}

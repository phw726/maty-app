import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
	CalendarStackNavigator,
	DiaryStackNavigator,
	HomeStackNavigator,
	ProfileStackNavigator
} from './StackNavigator'
import {Platform} from 'react-native'
import {renderTabIcon} from '../components/renderTabIcon'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({route}) => ({
				tabBarIcon: renderTabIcon(route.name),
				tabBarActiveTintColor: '#2b2b2b',
				tabBarInactiveTintColor: '#a1a1a1',
				tabBarStyle: {
					backgroundColor: '#fffffff8',
					borderTopColor: '#f5f5f5',
					alignContent: 'center',
					justifyContent: 'center',
					height: 60
				},
				tabBarIconStyle: {
					marginTop: 0
				},
				tabBarLabelStyle: {
					fontSize: 10,
					marginTop: -10,
					marginBottom: 7,
					fontFamily: Platform.select({
						android: 'IBMPlexSansKR-Medium',
						default: 'Roboto'
					})
				},
				tabBarShowLabel: true,
				headerShown: false
			})}>
			<Tab.Screen
				name="HomeTab"
				component={HomeStackNavigator}
				options={{tabBarLabel: '마티'}}
			/>
			<Tab.Screen
				name="CalendarTab"
				component={CalendarStackNavigator}
				options={{tabBarLabel: '캘린더'}}
			/>
			<Tab.Screen
				name="DiaryTab"
				component={DiaryStackNavigator}
				options={{tabBarLabel: '오늘의 기록'}}
			/>
			<Tab.Screen
				name="ProfileTab"
				component={ProfileStackNavigator}
				options={{tabBarLabel: '마이페이지'}}
			/>
		</Tab.Navigator>
	)
}

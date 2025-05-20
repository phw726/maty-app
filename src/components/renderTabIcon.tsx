import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const getTabIconName = (routeName: string): string => {
	switch (routeName) {
		case 'HomeTab':
			return 'logo-snapchat'
		case 'CalendarTab':
			return 'calendar'
		case 'ProfileTab':
			return 'person'
		case 'DiaryTab':
			return 'document-text'
		default:
			return 'ellipse-outline'
	}
}

export const renderTabIcon =
	(routeName: string) =>
	({color, size}: {color: string; size: number}) => {
		const iconName = getTabIconName(routeName)
		return <Icon name={iconName} size={size} color={color} />
	}

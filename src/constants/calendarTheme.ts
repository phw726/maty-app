import {Dimensions} from 'react-native'

const screenWidth = Dimensions.get('window').width

export const calendarTheme = {
	textDayFontFamily: 'IBMPlexSansKR-Medium',
	textMonthFontFamily: 'IBMPlexSansKR-Medium',
	textDayHeaderFontFamily: 'IBMPlexSansKR-Medium',
	textDayFontSize: 12,
	textDayHeaderFontSize: 12,
	textMonthFontSize: 14,
	calendarBackground: 'transparent', /// 캘린더 back
	textSectionTitleColor: '#5e5e5e',
	selectedDayTextColor: '#000',
	todayTextColor: '#404040',
	dayTextColor: '#6f6f6f',
	textDisabledColor: '#000',
	arrowColor: '#dbdbdb',
	todayBackgroundColor: '#999999a0',
	backgroundColor: '#ffffff'
}

export const calendarStyle = {
	// paddingBottom: 8,
	// marginBottom: 10,
	width: screenWidth,
	height: '100%',
	left: -16
} as const

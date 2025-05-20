export const ROUTES = {
	Home: 'Home',
	Profile: 'Profile',
	Setting: 'Setting',

	// Todo
	TodoScreen: 'TodoScreen',

	// Diary
	DiaryScreen: 'DiaryScreen',
	DiaryFormScreen: 'DiaryFormScreen',

	// Schedule
	ScheduleScreen: 'ScheduleScreen',
	ScheduleFormScreen: 'ScheduleFormScreen',

	// Calendar
	Calendar: 'Calendar',

	// Sticker (별도 네비게이터에서 쓰는 이름들)
	StickerTodo: 'StickerTodo',
	StickerSchedule: 'StickerSchedule',
	StickerDiary: 'StickerDiary'
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]

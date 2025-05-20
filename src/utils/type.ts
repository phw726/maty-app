export type Diary = {
	content: string
}

export type Todo = {
	id: string
	content: string
	isComplete: boolean
}

export enum ScheduleColor {
	RED = '#FF4D4F',
	BLUE = '#1890FF',
	GREEN = '#52C41A',
	ORANGE = '#FA8C16',
	PURPLE = '#722ED1',
	PINK = '#EB2F96',
	CYAN = '#13C2C2'
}

export interface Schedule {
	id: string
	content: string
	startDate: string
	endDate: string
	startTime?: string
	endTime?: string
	isAllDay: boolean
	color: ScheduleColor
}

export type DailyData = {
	diary?: Diary
	todos?: Todo[]
	schedule?: Schedule[]
}

export type CalendarDataType = Record<string, DailyData>

export type RootStackParamList = {
	DiaryScreen: undefined
	TodoScreen: {mode?: 'edit' | 'view'}
	ScheduleScreen: {mode?: 'edit' | 'view'; scheduleId?: string}
	ScheduleFormScreen: {
		mode?: 'edit' | 'create'
		scheduleId?: string
	}
	DiaryFormScreen: {mode?: 'edit' | 'view'}

	MainTabs: undefined
}

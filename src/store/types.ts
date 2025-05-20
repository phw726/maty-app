import {DailyData, Schedule, Todo} from '../utils/type'

export interface SelectedDateStore {
	selectedDate: string
	dataByDate: Record<string, DailyData>

	setDailyData: (date: string, data: DailyData) => void

	// 날짜 선택
	setSelectedDate: (date: string) => void

	// 스케줄/투두/다이어리 하루 데이터, 전체데이터 가져오기기
	getDailyData: (userId: string, date: string) => Promise<void>
	getAllData: (userId: string) => Promise<void>

	// Diary
	updateDiary: (userId: string, date: string, content: string) => Promise<void>
	deleteDiary: (userId: string, date: string) => Promise<void>

	// Todo
	toggleTodo: (userId: string, date: string, todoId: string) => Promise<void>
	updateTodo: (userId: string, date: string, todo: Todo) => Promise<void>
	deleteTodo: (userId: string, date: string, todoId: string) => Promise<void>

	// Schedule
	updateSchedule: (
		userId: string,
		date: string,
		schedule: Schedule
	) => Promise<void>
	deleteSchedule: (
		userId: string,
		date: string,
		scheduleId: string
	) => Promise<void>
}

export interface UserProfile {
	userId: string
	birthDate: string
	birthTime: string
}

export interface UserStore {
	profile: UserProfile | null
	updateUserData: (profile: UserProfile) => void
	getUserData: (userId: string) => Promise<void>
}

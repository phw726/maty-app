import {
	toggleTodo as toggleAPI,
	deleteTodo as deleteAPI,
	updateTodo as updateAPI
} from '../../aws/api/todo'
import {StateCreator} from 'zustand'
import {SelectedDateStore} from '../types'
import {Todo} from '../../utils/type'

const DEFAULT_DAY_DATA = {
	diary: undefined,
	todos: [],
	schedule: []
}

const ensureDayData = (state: SelectedDateStore, date: string) => {
	if (!state.dataByDate[date]) {
		return {
			...state.dataByDate,
			[date]: DEFAULT_DAY_DATA
		}
	}
	return state.dataByDate
}

export const createTodoActions: StateCreator<
	SelectedDateStore,
	[],
	[],
	Pick<SelectedDateStore, 'toggleTodo' | 'updateTodo' | 'deleteTodo'>
> = (set, get) => ({
	toggleTodo: async (userId, date, todoId) => {
		const state = get()
		const dataByDate = ensureDayData(state, date)
		const current = dataByDate[date]
		const updatedTodos = current.todos.map(todo =>
			todo.id === todoId ? {...todo, isComplete: !todo.isComplete} : todo
		)

		// 옵티미스틱 업데이트
		set({
			dataByDate: {
				...dataByDate,
				[date]: {
					...current,
					todos: updatedTodos
				}
			}
		})

		const res = await toggleAPI(userId, date, todoId)
		console.log('[toggleTodo] 응답:', res)
	},

	updateTodo: async (userId, date, todo: Todo) => {
		const state = get()
		const dataByDate = {...state.dataByDate}
		const current = dataByDate[date] ?? {
			diary: undefined,
			todos: [],
			schedule: []
		}

		const todos = current.todos ?? [] // 🔒 여기서도 안전장치
		const existing = todos.findIndex(t => t.id === todo.id)
		const updatedTodos = [...todos]

		if (existing >= 0) {
			updatedTodos[existing] = todo
		} else {
			updatedTodos.push(todo)
		}

		// ✅ 옵티미스틱 업데이트
		set({
			dataByDate: {
				...dataByDate,
				[date]: {
					...current,
					todos: updatedTodos
				}
			}
		})

		const res = await updateAPI(userId, date, todo)
		console.log('[updateTodo] 응답:', res)
	},

	deleteTodo: async (userId, date, todoId) => {
		const state = get()
		const dataByDate = ensureDayData(state, date)
		const current = dataByDate[date]
		const updatedTodos = current.todos.filter(todo => todo.id !== todoId)

		// 옵티미스틱 업데이트
		set({
			dataByDate: {
				...dataByDate,
				[date]: {
					...current,
					todos: updatedTodos
				}
			}
		})

		const res = await deleteAPI(userId, date, todoId)
		console.log('[deleteTodo] 응답:', res)
	}
})

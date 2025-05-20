import create from 'zustand'
import {SelectedDateStore} from './types'
import {createTodoActions} from './actions/todo'
import {createScheduleActions} from './actions/schedule'
import {createDiaryActions} from './actions/diary'
import {createFetchActions} from './actions/fetch'

export const useSelectedDateStore = create<SelectedDateStore>()((...a) => {
	const base = {
		selectedDate: '',
		dataByDate: {},
		setSelectedDate: date => a[0]({selectedDate: date}),
		setDailyData: (date, data) =>
			a[0](state => ({
				dataByDate: {
					...state.dataByDate,
					[date]: data
				}
			}))
	}

	return {
		...base,
		...createTodoActions(...a),
		...createScheduleActions(...a),
		...createDiaryActions(...a),
		...createFetchActions(...a)
	} as SelectedDateStore
})

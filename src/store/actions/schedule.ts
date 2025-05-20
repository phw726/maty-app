import {deleteSchedule, updateSchedule} from '../../aws/api/schedule'
import {StateCreator} from 'zustand'
import {SelectedDateStore} from '../types'
import {Schedule} from '../../utils/type'

export const createScheduleActions: StateCreator<
	SelectedDateStore,
	[],
	[],
	Pick<SelectedDateStore, 'updateSchedule' | 'deleteSchedule'>
> = (set, get) => ({
	updateSchedule: async (userId, date, schedule: Schedule) => {
		const res = await updateSchedule(userId, date, schedule)
		if (res.success) {
			const prev = get().dataByDate[date]
			const schedules = prev?.schedule || []
			const index = schedules.findIndex(s => s.id === schedule.id)
			const updated = index >= 0 ? [...schedules] : [...schedules, schedule]
			if (index >= 0) updated[index] = {...schedules[index], ...schedule}

			set(state => ({
				dataByDate: {
					...state.dataByDate,
					[date]: {...prev, schedule: updated}
				}
			}))
		}
	},

	deleteSchedule: async (userId, date, scheduleId) => {
		const res = await deleteSchedule(userId, date, scheduleId)
		if (res.success) {
			const prev = get().dataByDate[date]
			const updated = prev?.schedule?.filter(s => s.id !== scheduleId)
			set(state => ({
				dataByDate: {
					...state.dataByDate,
					[date]: {...prev, schedule: updated || []}
				}
			}))
		}
	}
})

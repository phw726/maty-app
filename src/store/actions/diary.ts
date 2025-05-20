// ✅ actions/diary.ts
import {updateDiary, deleteDiary} from '../../aws/api/diary'
import {StateCreator} from 'zustand'
import {SelectedDateStore} from '../types'

export const createDiaryActions: StateCreator<
	SelectedDateStore,
	[],
	[],
	Pick<SelectedDateStore, 'updateDiary' | 'deleteDiary'>
> = (set, get) => ({
	updateDiary: async (userId, date, content) => {
		const res = await updateDiary(userId, date, content)
		if (res.success) {
			const prev = get().dataByDate[date] || {}
			set(state => ({
				dataByDate: {
					...state.dataByDate,
					[date]: {
						...prev,
						diary: {content}
					}
				}
			}))
		}
	},

	deleteDiary: async (userId, date) => {
		const res = await deleteDiary(userId, date)
		if (res.success) {
			const prev = get().dataByDate[date]
			if (!prev) return
			set(state => ({
				dataByDate: {
					...state.dataByDate,
					[date]: {
						...prev,
						diary: undefined
					}
				}
			}))
		}
	}
})

import {fetchDayData, fetchAllData} from '../../aws/api/fetch'
import {StateCreator} from 'zustand'
import {SelectedDateStore} from '../types'
import {DailyData} from '../../utils/type'

export const createFetchActions: StateCreator<
	SelectedDateStore,
	[],
	[],
	Pick<SelectedDateStore, 'getDailyData' | 'getAllData'>
> = set => ({
	getDailyData: async (userId: string, date: string) => {
		const data = await fetchDayData(userId, date)
		if (data) {
			set(state => ({
				dataByDate: {
					...state.dataByDate,
					[date]: data
				}
			}))
		}
	},

	getAllData: async userId => {
		const dataList = await fetchAllData(userId)
		if (dataList && Array.isArray(dataList)) {
			const map: Record<string, DailyData> = dataList.reduce(
				(acc: Record<string, DailyData>, curr: any) => {
					if (typeof curr.date === 'string') {
						acc[curr.date] = curr as DailyData
					}
					return acc
				},
				{}
			)

			set({dataByDate: map})
		}
	}
})

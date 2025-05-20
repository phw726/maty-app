import {API_BASE_URL} from '@env'
import {DailyData} from '../../utils/type'

export const fetchDayData = async (
	userId: string,
	date: string
): Promise<DailyData | null> => {
	const res = await fetch(
		`${API_BASE_URL}/calendar/day?userId=${userId}&date=${date}`
	)
	if (!res.ok) return null
	return await res.json()
}

export const fetchAllData = async (
	userId: string
): Promise<DailyData[] | null> => {
	const res = await fetch(`${API_BASE_URL}/calendar?userId=${userId}`)
	if (!res.ok) return null
	return await res.json()
}

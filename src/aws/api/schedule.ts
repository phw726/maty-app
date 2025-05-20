import {API_BASE_URL} from '@env'
import {Schedule} from '../../utils/type'

export const updateSchedule = async (
	userId: string,
	date: string,
	schedule: Schedule
) => {
	const res = await fetch(`${API_BASE_URL}/schedule`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date, schedule})
	})
	if (!res.ok) throw new Error('Failed to add schedule')

	return await res.json()
}

export const deleteSchedule = async (
	userId: string,
	date: string,
	scheduleId: string
) => {
	const res = await fetch(`${API_BASE_URL}/schedule`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date, scheduleId})
	})
	return await res.json()
}

import {API_BASE_URL} from '@env'

export const updateDiary = async (
	userId: string,
	date: string,
	content: string
) => {
	const res = await fetch(`${API_BASE_URL}/diary`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date, content})
	})
	if (!res.ok) throw new Error('Failed to update diary')
	console.log('📦 Diary API 응답 코드:', res.status)

	console.log('✅ API_BASE_URL:', API_BASE_URL)

	return await res.json()
}

export const deleteDiary = async (userId: string, date: string) => {
	const res = await fetch(`${API_BASE_URL}/diary`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date})
	})
	if (!res.ok) throw new Error('삭제 실패')

	return await res.json()
}

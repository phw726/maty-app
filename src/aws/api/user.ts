import {API_BASE_URL} from '@env'
import {UserProfile} from '../../store/types'

// 유저 정보 저장 (등록/수정)
export const updateUserData = async (data: UserProfile) => {
	const res = await fetch(`${API_BASE_URL}/user`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
	return res.json()
}

// 유저 정보 조회
export const getUserData = async (
	userId: string
): Promise<UserProfile | null> => {
	const res = await fetch(`${API_BASE_URL}/user/info?userId=${userId}`)
	if (!res.ok) return null
	return await res.json()
}

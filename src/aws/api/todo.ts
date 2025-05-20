import {API_BASE_URL} from '@env'
import {Todo} from '../../utils/type'

export const toggleTodo = async (
	userId: string,
	date: string,
	todoId: string
) => {
	const res = await fetch(`${API_BASE_URL}/todo/toggle`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date, todoId})
	})
	if (!res.ok) throw new Error('Failed to toggle todo')
	return await res.json()
}

export const updateTodo = async (userId: string, date: string, todo: Todo) => {
	const res = await fetch(`${API_BASE_URL}/todo`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date, todo})
	})
	return await res.json()
}

export const deleteTodo = async (
	userId: string,
	date: string,
	todoId: string
) => {
	const res = await fetch(`${API_BASE_URL}/todo`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userId, date, todoId})
	})
	return await res.json()
}

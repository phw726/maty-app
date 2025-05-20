import create from 'zustand'
import {createUserActions} from './actions/user'
import {UserStore} from './types'

export const useUserStore = create<UserStore>()((...a) => {
	return {
		profile: {
			userId: 'mock-user-id',
			birthDate: '1990-01-01',
			birthTime: '00:00'
		},
		...createUserActions(...a)
	} as UserStore
})

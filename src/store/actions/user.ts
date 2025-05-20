import {getUserData} from '../../aws/api/user'
import {StateCreator} from 'zustand'
import {UserStore, UserProfile} from '../types'

export const createUserActions: StateCreator<
	UserStore,
	[],
	[],
	Pick<UserStore, 'updateUserData' | 'getUserData'>
> = set => ({
	updateUserData: (profile: UserProfile) => {
		set({profile})
	},

	getUserData: async (userId: string) => {
		const profile = await getUserData(userId)
		if (profile) {
			set({profile})
		}
	}
})

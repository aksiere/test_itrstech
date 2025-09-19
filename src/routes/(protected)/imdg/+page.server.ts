import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('access', { path: '/' })
		redirect(302, '/')
	}
} satisfies Actions

import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
	return {
		imdg: fetch(`https://book.sequoialab.ru/api/imdg`, {
			headers: {
				'Token': cookies.get('access') || ''
			}
		}).then(d => d.json())
	}
}

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('access', { path: '/' })
		redirect(302, '/')
	}
} satisfies Actions

import { API_URL } from '$env/static/private'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	auth: async ({ request, cookies }) => {
		const { username, password } = Object.fromEntries(await request.formData())

		try {
			const response = await fetch(`${API_URL}/api/authentication`, {
				method: 'GET',
				headers: {
					'Authorization': 'Basic ' + btoa(username + ':' + password),
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				return {
					error: 'Неверные учетные данные'
				}
			}

			const { access, stage } = await response.json()

			cookies.set('refresh', access.token, {
				httpOnly: true,
				path: '/',
				maxAge: 900
			})

			redirect(301, '/imdg')
		} catch (error) {
			if (error instanceof Response) {
				throw error
			}
			
			return {
				error: 'Ошибка авторизации'
			}
		}
	}
} satisfies Actions;

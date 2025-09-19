import { API_URL } from '$env/static/private'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	auth: async ({ request, cookies }) => {
		const { username, password } = Object.fromEntries(await request.formData())
		console.log(username, password);
		

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

		const { access: { token, lifeTime } } = await response.json()

		cookies.set('access', token, {
			httpOnly: true,
			path: '/',
			maxAge: lifeTime
		})

		redirect(308, `/imdg`)
	}
} satisfies Actions;

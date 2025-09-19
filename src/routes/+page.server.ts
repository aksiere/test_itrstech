import { API_URL } from '$env/static/private'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	auth: async ({ request, cookies }) => {
		const { username, password } = Object.fromEntries(await request.formData())
		console.log(username, password);

		const response = await (await fetch(`${API_URL}/api/authentication`, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa(username + ':' + password),
				'Content-Type': 'application/json'
			}
		})).json()

		if (response.error) {
			return {
				code: response.statusCode,
				error: response.message
			}
		}

		cookies.set('access', response.access.token, {
			httpOnly: true,
			path: '/',
			maxAge: response.access.lifeTime
		})

		redirect(308, `/imdg`)
	}
} satisfies Actions;

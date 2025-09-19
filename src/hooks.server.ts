import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'
import { API_URL } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event
	
	const accessToken = cookies.get('refresh')
	const isProtectedRoute = event.route.id?.includes('protected')
	
	if (isProtectedRoute) {
		if (!accessToken) {
			redirect(302, '/')
		}

		if (accessToken) {
			const response = await fetch(`${API_URL}/api/authentication/refresh`, {
				method: 'GET',
				headers: {
					'Token': `${accessToken}`,
					'User-Agent': 'api'
				}
			})

			console.log(accessToken, response)
			if (response.ok) {
				const { token } = await response.json()
				cookies.set('refresh', token, { path: '/' })
			} else {
				// cookies.delete('refresh', { path: '/' })
				// redirect(302, '/')
			}
		}
	}
	
	return resolve(event)
}

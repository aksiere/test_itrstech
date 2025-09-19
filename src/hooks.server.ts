import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'
import { API_URL } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event
	
	const accessToken = cookies.get('access')
	const isProtectedRoute = event.route.id?.includes('protected')
	
	if (isProtectedRoute) {
		if (!accessToken) {
			redirect(302, '/')
		}

		// if (accessToken) {
		// 	const response = await fetch(`${API_URL}/api/authentication/refresh`, {
		// 		method: 'GET',
		// 		credentials: 'include',
		// 		headers: {
		// 			'Token': `${accessToken}`,
		// 			'User-Agent': 'api'
		// 		}
		// 	})
		// }
	}
	
	return resolve(event)
}

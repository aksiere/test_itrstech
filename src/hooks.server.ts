import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'
import { API_URL } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event
	
	const accessToken = cookies.get('access')
	const isProtectedRoute = event.route.id?.includes('protected')

	if (url.pathname === '/') {
		if (accessToken) {
			redirect(302, '/imdg')
		}
	}
	
	if (isProtectedRoute) {
		if (!accessToken) {
			redirect(302, '/')
		}

		if (accessToken) {
			// в идеале конечно здесь еще роут /verify чтобы проверять валиден ли текущий access_token jwt.
			// из доки не совсем понятно как обновлять токен: при пустом запросе из доков обновляется кука доков, а при запросе извне - 401 в любом случае

			// const response = await fetch(`${API_URL}/api/authentication/refresh`, {
			// 	method: 'GET',
			// 	credentials: 'include',
			// 	headers: {
			// 		'Token': `${accessToken}`,
			// 		'User-Agent': 'api'
			// 	}
			// })

			// const { access: { token, lifeTime } } = await response.json()

			// cookies.set('access', token, {
			// 	httpOnly: true,
			// 	path: '/',
			// 	maxAge: lifeTime
			// })
		}
	}
	
	return resolve(event)
}

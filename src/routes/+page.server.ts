import type { Actions } from './$types';

export const actions = {
	auth: async ({ request }) => {
		const { username, password } = Object.fromEntries(await request.formData())
	}
} satisfies Actions;

<script lang='ts'>
	import { applyAction, enhance } from '$app/forms'
    import { Button, Input, Icons } from '$lib/components'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<div class='flex-1 grid place-items-center'>
	<div>
		<p>Авторизация</p>

		{#if form?.error}
			<p class='text-red-500 mb-2'>{form.error}</p>
		{/if}

		<form class='flex gap-[.125rem]' action='?/auth' method='post' use:enhance={() => {
			return async ({ result }) => {
				console.log(result)
				await applyAction(result)
			}
		}}>
			<div class='flex flex-col gap-[.125rem] *:rounded-[.375rem] *:first:rounded-tl-[var(--rounded)] *:last:rounded-bl-[var(--rounded)]'>
				<Input type='text' name='username' placeholder='Логин' />
				<Input type='password' name='password' placeholder='Пароль' />
			</div>

			<Button class='rounded-l-[.375rem]'>
				<Icons.ChevronRight />
			</Button>
		</form>
	</div>
</div>
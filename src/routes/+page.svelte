<script lang='ts'>
	import { applyAction, enhance } from '$app/forms'
    import { Button, Input, Icons } from '$lib/components'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<div class='flex-1 grid items-center'>
	<div class='grid grid-rows-2 gap-[2rem]'>
		<div>
			<p class='text-center'>Авторизация</p>

			{#if form?.error}
				<p class='text-red-500 text-center'>{form.error}</p>
			{/if}
		</div>

		<form class='flex justify-center gap-[.125rem]' action='?/auth' method='post' use:enhance={() => {
			return async ({ result }) => {
				console.log(result)
				await applyAction(result)
			}
		}}>
			<div class='flex flex-col gap-[.125rem] *:rounded-[.375rem] *:first:rounded-tl-[var(--rounded)] *:last:rounded-bl-[var(--rounded)]'>
				<Input name='username' placeholder='Логин' />
				<Input type='password' name='password' placeholder='Пароль' />
			</div>

			<Button class='rounded-l-[.375rem]'>
				<Icons.ChevronRight />
			</Button>
		</form>
	</div>
</div>
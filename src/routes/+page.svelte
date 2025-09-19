<script lang='ts'>
	import { applyAction, enhance } from '$app/forms'
</script>

<div class='flex-1 grid place-items-center'>
	<div>
		<p>Авторизация</p>

		<form class='flex flex-col' action='?/login' method='post' use:enhance={() => {
			return async ({ result }) => {
				console.log(result)
				applyAction(result)
			}
		}}>
			<input type='text' name='username' placeholder='Логин' />
			<input type='password' name='password' placeholder='Пароль' />
			<button type='submit'>Войти</button>
		</form>
	</div>
</div>
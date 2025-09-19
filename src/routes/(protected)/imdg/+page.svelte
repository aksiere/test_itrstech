<script lang='ts'>
	import { enhance } from '$app/forms'
	import { Button } from '$lib/components'
</script>

<div class='flex-1 grid place-items-center'>
	<div class='text-center'>
		<h1 class='text-2xl font-bold mb-4'>IMDG - Защищенная страница</h1>
		<p class='mb-4'>Добро пожаловать! Вы успешно авторизованы.</p>
		
		<form action='?/logout' method='post' use:enhance>
			<Button type='submit'>Выйти</Button>
		</form>
	</div>
</div>
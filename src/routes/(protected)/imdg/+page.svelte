<script lang='ts'>
	import { enhance } from '$app/forms'
	import { Button } from '$lib/components'

	let { data } = $props()
</script>

<div>
	<svelte:boundary>
		{#snippet pending()}
			<p>Загрузка...</p>
		{/snippet}

		{#each await data.imdg as row, i (i)}
			<p>{row.name}</p>
		{/each}
	</svelte:boundary>
</div>

<div class='flex-1'>
	<div class='text-center'>
		<h1 class='text-2xl font-bold mb-4'>IMDG - Защищенная страница</h1>
		<p class='mb-4'>Добро пожаловать! Вы успешно авторизованы.</p>
		
		<form action='?/logout' method='post' use:enhance>
			<Button type='submit'>Выйти</Button>
		</form>
	</div>
</div>
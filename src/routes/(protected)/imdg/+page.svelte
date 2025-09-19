<script lang='ts'>
    import Button from '$lib/components/src/Button.svelte'

	let { data } = $props()
	
	let currentPage = $state(0)
	const itemsPerPage = 5
	
	function goToPage(page: number) {
		currentPage = page
	}
	
	function nextPage() {
		currentPage += 1
	}
	
	function prevPage() {
		currentPage -= 1
	}
</script>

<div class='flex flex-col gap-[1rem]'>
	<p class='font-medium text-xl'>Список опасных грузов</p>

	<div class='flex flex-col gap-[.5rem]'>
		{#await data.imdg}
			<p>Загрузка...</p>
		{:then items}
			{#each items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) as row, i (i)}
				<div>
					<p>{row.name.split('\n')[0]}</p>
					<p class='text-sm text-muted'>{row.name.split('\n')[1]}</p>
				</div>
			{/each}

			<div class='flex justify-center'>
				<Button onclick={prevPage} disabled={currentPage === 0}>Назад</Button>
				<Button onclick={nextPage} disabled={currentPage === Math.ceil(items.length / itemsPerPage) - 1}>Вперед</Button>
			</div>
		{/await}		
	</div>
</div>

<!-- <div class='flex-1'>
	<div class='text-center'>
		<h1 class='text-2xl font-bold mb-4'>IMDG - Защищенная страница</h1>
		<p class='mb-4'>Добро пожаловать! Вы успешно авторизованы.</p>
		
		<form action='?/logout' method='post' use:enhance>
			<Button type='submit'>Выйти</Button>
		</form>
	</div>
</div> -->

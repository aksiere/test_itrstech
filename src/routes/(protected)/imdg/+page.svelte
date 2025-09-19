<script lang='ts'>
    import { enhance } from '$app/forms'
    import Button from '$lib/components/src/Button.svelte'
    import Input from '$lib/components/src/Input.svelte'

	let { data } = $props()
	
	const perPage = 5
	let curPage = $state(0)

	let search = $state('')

	type FilterKeys = 'col3' | 'col9' | 'col17';

	let filters = $state<Record<FilterKeys, string>>({
		col3: 'all',
		col9: 'all',
		col17: 'all'
	})
	
	function getFiltered(items: any[], column: string) {
		let filtered = items
		
		if (search.trim()) filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
		if (column !== 'col3' && filters.col3 !== 'all') filtered = filtered.filter(item => item.col3 && item.col3.toString().trim() === filters.col3)
		if (column !== 'col9' && filters.col9 !== 'all') filtered = filtered.filter(item => item.col9 && item.col9.toString().trim() === filters.col9)
		if (column !== 'col17' && filters.col17 !== 'all') filtered = filtered.filter(item => item.col17 && item.col17.toString().trim() === filters.col17)
		
		const values = filtered
			.map(item => item[column])
			.filter(value => value && value.toString().trim() !== '')
			.map(value => value.toString().trim())
		
		return [...new Set(values)].sort()
	}
	
	function filterItems(items: any[]) {
		let filtered = items
		
		if (search.trim()) filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
		if (filters.col3 !== 'all') filtered = filtered.filter(item => item.col3 && item.col3.toString().trim() === filters.col3)
		if (filters.col9 !== 'all') filtered = filtered.filter(item => item.col9 && item.col9.toString().trim() === filters.col9)
		if (filters.col17 !== 'all') filtered = filtered.filter(item => item.col17 && item.col17.toString().trim() === filters.col17)

		return filtered
	}
	
	function resetCurrentPage() {
		curPage = 0
	}

	function nextPage() {
		curPage += 1
	}
	
	function prevPage() {
		curPage -= 1
	}
</script>

<div class='flex-1 h-full flex flex-col gap-[2rem]'>
	<div class='flex flex-col gap-[.5rem]'>
		<p class='font-medium text-xl'>Список опасных грузов</p>
		<Input class='w-full' bind:value={search}  placeholder='Поиск по названию' oninput={resetCurrentPage} />
	</div>

	<div class='flex flex-col gap-[2rem]'>
		{#await data.imdg}
			<p>Загрузка...</p>
		{:then items}
			{@const filteredItems = filterItems(items)}
			
			<div class='flex justify-between'>
				<div class='grid grid-cols-1 lg:grid-cols-[200px_200px_200px] gap-[1rem] items-end flex-wrap'>
					{#each Object.keys(filters) as key, i (i)}
						{@const filterKey = key as FilterKeys}
						<div class='flex flex-col gap-[.25rem]'>
							<label for={`${key}-filter`} class='text-sm text-muted'>{key}</label>
							<select bind:value={filters[filterKey]} onchange={resetCurrentPage}>
								<option value='all'>Все</option>
								{#each getFiltered(items, key) as value (value)}
									<option value={value}>{value}</option>
								{/each}
							</select>
						</div>
					{/each}
				</div>

				<div>
					<Button onclick={() => filters = { col3: 'all', col9: 'all', col17: 'all' }}>Сбросить параметры</Button>
				</div>
			</div>
			
			<div class='flex flex-col gap-[.5rem]'>
				<div class='text-sm text-muted mb-2'>
					Показано {Math.min(filteredItems.length, perPage)} из {filteredItems.length}
				</div>
				<div class='grid grid-cols-[40px_600px_1fr_1fr_1fr] gap-[.5rem] overflow-x-auto'>
					<div class='text-muted text-sm'>ID</div>
					<div class='text-muted text-sm'>Название</div>
					<div class='text-muted text-sm'>col3</div>
					<div class='text-muted text-sm'>col9</div>
					<div class='text-muted text-sm'>col17</div>

					{#each filteredItems.slice(curPage * perPage, (curPage + 1) * perPage) as row, i (i)}
						<div class='text-muted'>{row.id}</div>
						<div>{row.name.split('\n')[0]}</div>
						<div>{row.col3}</div>
						<div>{row.col9}</div>
						<div>{row.col17}</div>
					{/each}
				</div>
			</div>

			<div class='flex justify-center gap-[.5rem] select-none'>
				<Button onclick={prevPage} disabled={curPage === 0}>Назад</Button>
				<Button onclick={nextPage} disabled={curPage === Math.ceil(filteredItems.length / perPage) - 1}>Вперед</Button>
			</div>
		{/await}
	</div>

	<form class='mt-auto' action='?/logout' method='post' use:enhance>
		<Button>Выйти</Button>
	</form>
</div>

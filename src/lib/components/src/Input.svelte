<script>
	let {
		value = $bindable(''),
		..._
	} = $props()
</script>

<input
	bind:value
	type='text'

	class:px-[1rem]={true}
	class:py-[.5rem]={true}
	class:bg-1={true}
	class:rounded-[var(--rounded)]={true}
	class:truncate={true}
	class:focus:outline-[2px]={true}
	class:outline-offset-[2px]={true}
	class:outline-9={true}
	class:focus:z-2={true}
	class:placeholder:text-muted={true}
	class:disabled:pointer-events-none={true}
	class:disabled:opacity-50={true}
	class:transition-[background]={true}
	class:duration-250={true}
	class:focus:z-100={true}

	{..._}
>

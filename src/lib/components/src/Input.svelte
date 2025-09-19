<script>
	let {
		value = $bindable(''),
		pseudoDisabled = false,
		..._
	} = $props()

	let component

	export function get() {
		return component
	}
</script>

<input
	bind:value
	bind:this={component}
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
	class:pointer-events-none={pseudoDisabled}
	class:opacity-50={pseudoDisabled}
	class:transition-[background]={true}
	class:duration-250={true}
	class:focus:z-100={true}

	{..._}
>

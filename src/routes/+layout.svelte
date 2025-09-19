<script lang='ts'>
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	
	let { children } = $props()
</script>

<svelte:head>
	<link rel='icon' href={favicon} />
</svelte:head>

<div class='h-full max-w-[1200px] mx-auto'>
	<div class='min-h-full flex flex-col p-[2rem]'>
		{@render children?.()}
	</div>
</div>

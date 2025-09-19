<script lang='ts'>
	import { Icons } from '$lib/components'

	let {
		loading = false,
		onclick = () => {},
		danger = false,
		children,
		...rest
	} = $props()

	let l0 = $state(false)

	function onclick_() {
		l0 = true
		Promise.resolve(onclick())
			.finally(() => {
				l0 = false
			})
	}

	let btn = $state<HTMLButtonElement | null>(null)

	function scaleButton(shrinkPixels: number) {
		if (!btn) return
		const rect = btn.getBoundingClientRect()
		const scaleFactor = (rect.width - shrinkPixels) / rect.width
	
		btn.style.transform = `scale(${scaleFactor})`
		btn.style.transformOrigin = 'center'
	}

	function resetScale() {
		if (!btn) return
		btn.style.transform = ''
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			scaleButton(4)
			setTimeout(resetScale, 150)
		}
	}

	function setupFormHandler() {
		if (!btn) return
		const form = btn.closest('form')
		if (!form) return

		form.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				scaleButton(4)
				setTimeout(resetScale, 150)
			}
		})
	}

	$effect(() => {
		if (btn) {
			setupFormHandler()
		}
	})
</script>

<button
	bind:this={btn}
	type='submit'
	onclick={onclick_}
	onkeydown={handleKeydown}
	disabled={l0 || loading}

	class:px-[1rem]={true}
	class:py-[.5rem]={true}
	class:border-[2px]={true}
	class:border-1={true}
	class:hover:bg-1={true}
	class:rounded-[calc(var(--rounded))]={true}
	class:cursor-pointer={true}
	class:transition-[background,transform]={true}
	class:relative={true}
	class:disabled:pointer-events-none={true}
	class:disabled:opacity-50={true}
	class:focus:outline-[2px]={true}
	class:active:outline-none={true}
	class:outline-offset-[2px]={true}
	class:outline-9={true}
	class:text-danger={danger}
	class:border-[color-mix(in_srgb,var(--color-danger)_20%,transparent)]={danger}
	class:hover:bg-[color-mix(in_srgb,var(--color-danger)_20%,transparent)]={danger}
	class:duration-250={true}
	class:focus:z-100={true}

	onmousedown={() => scaleButton(4)}
	ontouchstart={() => scaleButton(4)}
	onmouseup={resetScale}
	onmouseleave={resetScale}
	ontouchend={resetScale}

	{...rest}
>
	{#if l0 || loading}
		<div class='opacity-0'>
			{@render children?.()}
		</div>
		<Icons.Loader class='absolute top-[50%] left-[50%] translate-[-50%] animate-spin text-muted' />
	{:else}
		{@render children?.()}
	{/if}
</button>

<script>
	import { PROPERTIES } from '..'

	let { ...rest } = $props()
</script>

<svg {...rest} xmlns='http://www.w3.org/2000/svg' width={PROPERTIES.width} height={PROPERTIES.height} viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width={PROPERTIES.strokeWidth} stroke-linecap='round' stroke-linejoin='round'><path d='M17 7 7 17'/><path d='M17 17H7V7'/></svg>

<script>
	let {
		checked = $bindable(),
		indeterminate = false,
		...rest
	} = $props()

	let id = $props.id()
</script>

<div
	class:w-[48px]={true}
	{...rest}
>
	<input class='peer opacity-0 absolute pointer-events-none' type='checkbox' bind:checked {id} style='width: 0px;' />
	<label
		for={id}
		class:block={true}
		class:cursor-pointer={true}
		class:rounded-full={true}
		class:p-[2px]={true}
		class:outline-[2px]={true}
		class:outline-transparent={true}
		class:outline-offset-[1px]={true}
		class={indeterminate ? 'bg-yellow-500!' : checked ? 'bg-brand!' : 'bg-1'}
	>
		<div
			class:bg-0={true}
			class:w-[26px]={true}
			class:h-[18px]={true}
			class:rounded-full={true}
			class:transition-[translate,background,width]={true}
			class:translate-x-[18px]={checked && !indeterminate}
			class:translate-x-[9px]={indeterminate}
		></div>
	</label>
</div>

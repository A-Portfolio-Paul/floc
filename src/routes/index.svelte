<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';

	let todos = [];
	onMount(async () => {
        let { data, error } = await supabase.from("todos").select("*");
		todos = data;
	});
</script>

{#each todos as todo}
<div class="todo">
    <input type="checkbox" checked={todo.isComplete}>
    <input type="text" value={todo.task}>
    <button>Delete</button>
</div>
{:else}
<p>no todos found</p>

{/each }
<style>
    .todo{
        display:flex;
    }
</style>
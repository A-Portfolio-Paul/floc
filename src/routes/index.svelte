<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import Todo from '../lib/Todo.svelte';

	let todos = [];
	onMount(async () => {
		let { data, error } = await supabase.from('todos').select('*');
		todos = data;
	});

	const updateTodo = async (todo) => {
		console.log('updateTodo running....');
		console.table(todo);
		try {
			const { data, error } = await supabase
				.from('todos')
				.update({ task: todo.task })
				.eq('id', todo.id);
		} catch {
			console.log(err);
		}
	};
</script>

{#each todos as todo}
	<Todo {todo} {updateTodo} />
{:else}
	<p>no todos found</p>
{/each}

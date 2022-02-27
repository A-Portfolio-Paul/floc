<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import Todo from '../lib/Todo.svelte';

	let todos = [];
	onMount(async () => {
		await getAllTodos();
		let { data, error } = await supabase.from('todos').select('*');
		todos = data;
	});
	const getAllTodos = async () => {
		try {
			let { data, err } = await supabase.from('todos').select('*');
            todos = data
		} catch {
			console.log(err);
		}
	};

	const updateTodo = async (todo) => {
		console.log('updateTodo running....');
		console.table(todo);
		try {
			const { data, error } = await supabase
				.from('todos')
				.update({ task: todo.task, isComplete: todo.isComplete })
				.eq('id', todo.id);
			await getAllTodos();
		} catch {
			console.log(err);
		}
	};
	const deleteTodo = async (todo) => {
		console.log('deleteTodo intiated.......');
		try {
			const { data, error } = await supabase
            .from('todos').
            delete().eq('id', todo.id);
			await getAllTodos();
		} catch {
			console.log(err);
		}
	};
</script>

{#each todos as todo}
	<Todo {todo} {updateTodo} {deleteTodo} />
{:else}
	<p>no todos found</p>
{/each}

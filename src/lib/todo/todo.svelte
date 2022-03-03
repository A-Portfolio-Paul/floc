<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import { user, sess } from '../lib/stores';
	import { goto } from '$app/navigation';
	import Todo from '../lib/Todo.svelte';

	let todos = [];
	let newTask = '';
	onMount(async () => {
		console.log('mounted.....')
		getSession()
		await getAllTodos();
		let { data, error } = await supabase.from('todos').select('*');
		todos = data;
	});
	const getAllTodos = async () => {
		try {
			let { data, err } = await supabase.from('todos').select('*');
			todos = data;
		} catch {
			console.log(err);
		}
	};
	const addTask = async (task) => {
		console.log('add task');
		try {
			const { data, error } = await supabase
				.from('todos')
				.insert([{ task: newTask, user_id: $user.id }]);
			await getAllTodos();
			newTask = '';
		} catch {
			console.log(error);
		}
	};

	const updateTodo = async (todo) => {
		console.table(todo);
		try {
			const { data, error } = await supabase
				.from('todos')
				.update({ task: todo.task, isComplete: todo.isComplete })
				.eq('id', todo.id);
			await getAllTodos();
		} catch {
			console.log(error);
		}
	};
	const deleteTodo = async (todo) => {
		try {
			const { data, error } = await supabase.from('todos').delete().eq('id', todo.id);
			await getAllTodos();
		} catch {
			console.log(err);
		}
	};
	const handleKeyPress = (event) => {
		console.log(event);
		if (event.key == 'Enter' && newTask != '') {
			addTask();
		}
	};
	const logout = async () => {
		let { error } = await supabase.auth.signOut();
		$user = false;
		goto('/login');
	};
	const getSession = () =>{
			supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'PASSWORD_RECOVERY') {
			console.log('RECOVERY HAS BEEN REQUESTED', 'my_event:', event, 'my_session', session);
			sess.update((val) => {
				val = { session };
				return val;
			});
			goto('/passwordReset');
		} else {
			// save the user session
		}
	});
	}

</script>

<h4>Welcome {$user?.email ? $user.email : ''}!</h4>
<div class="addTodo">
	<input type="text" bind:value={newTask} />
	<button
		on:click={() => {
			addTask();
		}}>Add task</button
	>
</div>
{#each todos as todo}
	<Todo {todo} {updateTodo} {deleteTodo} />
{:else}
	<p>no todos found</p>
{/each}
{#if $user.email}
	<p on:click={logout} class="switch">logout</p>
{/if}

<svelte:window on:keypress={handleKeyPress} />

<style>
	.addTodo {
		display: flex;
		margin-bottom: 0.5em;
	}
	:global(.switch) {
		color: skyblue;
		cursor: pointer;
	}
	:global(.switch:hover) {
		text-decoration: underline;
	}
</style>

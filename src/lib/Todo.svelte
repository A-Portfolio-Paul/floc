<script>
	export let todo, updateTodo;
</script>

<div class="todo">
	<input type="checkbox" checked={todo.isComplete} />
	<input
		type="text"
		value={todo.task}
		on:input={(e) => {
			console.log('input clicked');
			todo.task = e.currentTarget.value;
			updateTodo(todo);
		}}
	/>
	<button>Delete</button>
</div>

<style>
	.todo {
		display: flex;
	}
</style>

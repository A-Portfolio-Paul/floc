<script>
	export let todo, updateTodo, deleteTodo;
</script>

<div class="todo" class:done={todo.isComplete}>
	<input
		type="checkbox"
		checked={todo.isComplete}
		on:change={(e) => {
			todo.isComplete = e.currentTarget.checked;
			updateTodo(todo);
		}}
	/>

	<input
		type="text"
		value={todo.task}
		on:input={(e) => {
			todo.task = e.currentTarget.value;
			updateTodo(todo);
		}}
	/>
	<button on:click={()=>deleteTodo(todo)}>Delete</button>
</div>

<style>
	.todo {
		display: flex;
	}
    .done {
        opacity:0.5
    }
    .done input[type="text"]{
        text-decoration:line-through
    }
</style>

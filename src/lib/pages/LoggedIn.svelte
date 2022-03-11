
<script>
import TodoContainer from '../docs/todo/todoContainer.svelte'
import Document from '../docs/myDocuments/FlocsContainer.svelte'
import Button from '$lib/layout/furniture/buttons/Button.svelte'
let todo = true


const toggle =() => {
    todo = !todo
    console.log('todo', todo)
}

export let label
    export let action
    export let data = 'default'
</script>

<h1>Welcome to your docs</h1>
<Button label='view docs' action={toggle} />

{#if todo}
<TodoContainer/>
{:else}
<Document/>
{/if}
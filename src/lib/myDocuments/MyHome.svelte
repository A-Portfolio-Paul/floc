<script>
import Icon from "$lib/layout/furniture/Icon.svelte";
import FlocContainer from "./FlocContainer.svelte";

</script>
<script>
import Home from "$lib/content/home.svelte";

</script>
<script>
import Forgot from "src/routes/forgot.svelte";

</script>
<script>
import Button from "$lib/layout/furniture/buttons/Button.svelte";

</script>
<script>
import Banner from "$lib/layout/Banner.svelte";

</script>
<script>
import TodoContainer from '../';
import Document from './FlocContainer.svelte'
let todo = true


const toggle =() => {
    todo != todo
}
</script>

<h1>Welcome to your docs</h1>
<button on:click></button>

{#if todo}
<TodoContainer/>
{:else}
<Document/>
{/if}
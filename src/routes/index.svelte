<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import { user, sess } from '../lib/stores';
	import { goto } from '$app/navigation';
	import TodoContainer from '../lib/todo/todoContainer.svelte';
	import Home from '../lib/content/home.svelte'

	onMount(async () => {
		getSession();
	});

	const getSession = () => {
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
	};
</script>

{#if $user.email}
	<TodoContainer/>
{:else}
	<Home/>
{/if}

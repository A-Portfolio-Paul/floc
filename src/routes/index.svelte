<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import { user, sess } from '../lib/stores';
	import { goto } from '$app/navigation';
	// import Todo from '../lib/Todo.svelte';

	onMount(async () => {
		console.log('mounted.....');
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
	<h2>Logged in</h2>

{:else}
	<h2>looged out</h2>
{/if}

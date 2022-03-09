<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import { user, sess } from '../lib/stores';
	import { goto } from '$app/navigation';
	import Home from '../lib/content/home.svelte'
	import MyHome from '../lib/myDocuments/MyHome.svelte'

	onMount(async () => {
		getSession();
	});

	const getSession = () => {
		supabase.auth.onAuthStateChange((event, session) => {
			console.log('EVENT:',event)
			if (event === 'PASSWORD_RECOVERY') {
				console.log('RECOVERY HAS BEEN REQUESTED', 'my_event:', event, 'my_session', session);
				sess.update((val) => {
					val = { session };
					return val;
				});
				goto('/passwordReset');
			} else if (event === 'SIGNED_IN')  {
				// save the user session
				goto('/login');
			}
		});
	};
</script>

{#if $user.email}
<MyHome/>
{:else}
	<Home/>
{/if}

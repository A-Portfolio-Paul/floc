<script>
	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import { user } from '../lib/stores';
	import { alerts } from '../lib/stores';
	import Register from '../lib/auth/register.svelte';
	import Login from '../lib/auth/login.svelte';

	export let isNewRegistration = false;


	user.subscribe((value) => {
		console.log('STORE:user:', value);
	});

	let email = '';
	let password = '';


	const signup = async () => {
		let { user: userDetails, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		console.log('Error code:', error);
		updateAlert('Please check your email', 'notify');
		$user = userDetails;

		goto('/');
	};
	const login = async () => {
		let { user: userDetails, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});
		if (error) {
			updateAlert(error, 'error');
		}
		updateAlert('You have logged in!', 'notify');
		$user = userDetails;
		goto('/');
	};

	const forgotPassword = () => {
		goto('/forgot');
	};
	// update alerts
	const updateAlert = (msg, msgType) => {
		alerts.update((val) => {
			val = { msg: msg, msgType: msgType };
			return val;
		});
	};
</script>

{#if isNewRegistration}
	<Register bind:password={password} bind:email={email} signup={signup} bind:isNewRegistration={isNewRegistration} />
{:else}
	<Login bind:password={password} bind:email={email} login={login} bind:isNewRegistration={isNewRegistration}  />
{/if}

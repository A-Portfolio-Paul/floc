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

	const getUSersDocs = async () => {
		try {
			let { data, err } = await supabase.from('users_documents').select('*');
			docs = data;
		} catch {
			console.log(err);
		}
	};

	const signup = async () => {
		let { user: userDetails, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		if (error) {
			console.log('error', error);
		} else {
			updateAlert('Please check your email', 'notify');
			$user = userDetails;
			goto('/login');
		}
	};

	const login = async () => {
		let { data: users_documents, err } = await supabase
			.from('users_documents')
			.select('*')
			.eq('users_id', 'd82d629e-168d-48f3-8100-b66e745c6b21');
		console.log('users_documents', users_documents);
		console.log('err', err);


		let { user: userDetails, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});
		if (error) {
			updateAlert(error.message, 'error');
		} else {
			console.log('logged in')
			updateAlert('You have logged in!', 'notify');
			$user = userDetails;
			goto('/');
		}
	};

	const getUsersDocs = () =>{
		
	}

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
	<Register bind:password bind:email {signup} bind:isNewRegistration />
{:else}
	<Login bind:password bind:email {login} bind:isNewRegistration />
{/if}

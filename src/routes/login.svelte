<script>
	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import { user, userDocIds } from '../lib/stores';
	import Register from '../lib/auth/register.svelte';
	import Login from '../lib/auth/login.svelte';
	import { updateAlert } from '../lib/functions/alerts';
	export let isNewRegistration = false;

	user.subscribe((value) => {
		console.log('STORE:user:', value);
	});
	userDocIds.subscribe((value) => {
		console.log('STORE:userDocIds:', value);
	});
	//set vars
	let email = '';
	let password = '';

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
		await authenticate()
		await updateDocIds($user.id);
		await goto('/') ;
	};

	const authenticate = async () => {
		let { user: userDetails, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});
		if (error) {
			updateAlert(error.message, 'error');
		} else {
			updateAlert('You have logged in!', 'notify');
			// Update user details
			$user = userDetails;
			// updateDocIds($user.id);
			// goto('/');
		}
	};

	// update userDocs
	const updateDocIds = async (userId) => {
		let { data: users_documents, err } = await supabase
			.from('users_documents')
			.select('document_id')
			.eq('users_id', userId);
		if (err) {
			updateAlert(error.message, 'error');
		} else {
			updateStoreUserDocs(users_documents);
		}
	};

	const updateStoreUserDocs = (doc_ids) => {
		userDocIds.update((val) => {
			val = doc_ids;
			return val;
		});
	};
</script>

{#if isNewRegistration}
	<Register bind:password bind:email {signup} bind:isNewRegistration />
{:else}
	<Login bind:password bind:email {login} bind:isNewRegistration />
{/if}
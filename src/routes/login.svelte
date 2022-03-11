<script>
	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import { user, alerts, userDocIds } from '../lib/stores';
	import Register from '../lib/auth/register.svelte';
	import Login from '../lib/auth/login.svelte';
	import {updateAlert} from '../lib/functions/alerts'

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
			updateDocIds($user.id);
			goto('/');
		}
	};

	const forgotPassword = () => {
		goto('/forgot');
	};

	const getUSersDocs = async () => {
		try {
			let { data, error } = await supabase.from('users_documents').select('*');
			docs = data;
		} catch {
			console.log(error);
		}
	};


	// Update store for users documents
	const getUserDocs = async (userDocIds) => {
		let arr=['1','2','3']
		try {
			let { data, error } = await supabase.from('documents').select('*').in('id', userDocIds[0].document_id)			
			docs = data;
			console.log('getUserDocs:RESR:documents',docs)
		} catch {
			console.log('BIG BAD ERROR',error);
		}
		return docs
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


// STEPS - move login to function

// login
	// authenticate
	// then updateDocuments
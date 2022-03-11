<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/db';
	import { user, sess, userDocIds, documents } from '../../stores';
	import { goto } from '$app/navigation';

	let docs = [];
	let allUsers = [];

	documents.subscribe((value) => {
		console.log('STORE:Documents:', value);
	});

	onMount(async () => {
		getSession();
		let docs = await getUserDocs($userDocIds);

	});

	const getUserDocs = async (userDocIds) => {
		console.log('userDocIds',userDocIds)
		try {
			let { data, error } = await supabase.from('documents').select('*').in('id', userDocIds[0].document_id)			
			docs = data;
			console.log('getUserDocs:RESR:documents',docs)
			updateStoreDocs(docs) 
		} catch {
			console.log('BIG BAD ERROR');
		}
		return docs
	};

	const logout = async () => {
		let { error } = await supabase.auth.signOut();
		$user = false;
		goto('/login');
	};
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
	const updateStoreDocs = (docs) =>{
		documents.update((val) => {
			val = docs;
			return val;
		});
	}
</script>

<section class="m-10 p-10 bg-slate-200 rounded-md">
	<h1
		class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10"
	>
		Welcome {$user?.email ? $user.email : ''}!
	</h1>
	{docs}
</section>


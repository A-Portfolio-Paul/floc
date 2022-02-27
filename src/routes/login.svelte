
<script>
    import { goto } from "$app/navigation"
   import supabase from '$lib/db';
   import {user} from "../lib/stores"
    let email = ""
	const signup = async () => {
		let { user :userDetails, error } = await supabase.auth.signUp({
			email: email,
			password: 'sAlUXbfIHTOjOsWMaUaP'
		});
        $user = userDetails
        goto("/")
	};
	const login = async () => {
        let { user :userDetails, error } = await supabase.auth.signIn({
            email: email,
			password: 'sAlUXbfIHTOjOsWMaUaP'
		});
        $user = userDetails
        goto("/")
	};
</script>

<label for="">
    Email
    <input bind:value={email} type="email" placeholder="email@email.com" >
</label>
<button on:click={login}>Login</button>
<button  on:click={signup}>Signup</button>
<style>

</style>
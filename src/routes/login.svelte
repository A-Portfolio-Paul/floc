
<script>
    import { goto } from "$app/navigation"
   import supabase from '$lib/db';
   import {user} from "../lib/stores"
    let email = ""
    let isNewRegistration = false
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
{#if isNewRegistration}
<button  on:click={signup}>Signup</button>
<p class="switch" on:click={()=>(isNewRegistration = false)}>Allready have an account?</p>
{:else}
<button on:click={login}>Login</button>
<p class="switch" on:click={()=>(isNewRegistration = true)}>Create New Account?</p>
{/if}
<style>

</style>
<script>
	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import { user } from '../lib/stores';

	let email = '';

	const passwordReset = async () => {
		const { data, error } = supabase.auth.api.resetPasswordForEmail(email);
	};
</script>
<div
class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full  flex flex-col  justify-center"
>
<div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
    <div class="space-y-4">
        <div>
            <label for="email" class="block mb-1 text-gray-600 font-semibold">Enter Your Email</label>
            <input
                bind:value={email}
                type="email"
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
            />
        </div>
    </div>
</div>

</div>
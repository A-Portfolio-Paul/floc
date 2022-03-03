<script>
  import Notification from './Notification.svelte'
  let msg = ('Password has been reset')
  let displayNotification = true  // this will be a prop

  const hide = ()=>{
    displayNotification = false
  }
</script>

<!-- Toast Container -->
  <!-- put taost notification in here , to cope when the toast more than one -->
  <!-- class="absolute right-0 top-0 m-5" For put toast on top right -->
  {#if displayNotification}
  <div on:click={hide} class="pt-4 flex flex-col justify-center">

    <Notification msg="Your Password has been Updated" msgType="notify"/>
   </div>
  {/if}
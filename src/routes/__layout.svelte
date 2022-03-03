<script>
    import "../app.css";
    import Navbar from '../lib/layout/navbar/Navbar.svelte'
    import Notifications from '../lib/layout/notifications/Notifications.svelte'
    // import Banner from '../lib/Banner.svelte'
  </script>
  <!-- <Banner/> -->
  <Navbar/>
  <Notifications/>
  <slot />
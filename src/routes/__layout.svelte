<script>
    import "../app.css";
    import Navbar from '../lib/layout/Navbar.svelte'
    import Notifications from '../lib/layout/Notifications.svelte'
    // import Banner from '../lib/Banner.svelte'
  </script>
  <!-- <Banner/> -->
  <Navbar/>
  <Notifications/>
  <slot />
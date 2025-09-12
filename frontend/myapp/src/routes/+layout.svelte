<script>
	import favicon from '$lib/assets/favicon.svg';
	  import '$lib/styles/main.css';
	let { children } = $props();

  let mobileOpen = false;
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Departments", href: "/departments" },
    { label: "Providers", href: "/providers" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    { label: "Data", href: "/data" }
  ];

</script>


<header class="header">
  <div class="container navwrap">
    <a class="brand" href="/" aria-label="Pulse Point Home">
      <svg viewBox="0 0 64 64" aria-hidden="true" class="brand-logo">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stop-color="#00E1FF" />
            <stop offset="50%" stop-color="#7C4DFF" />
            <stop offset="100%" stop-color="#FF4D8D" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#g1)" opacity="0.15"/>
        <path d="M8 34h10l6-14 8 23 5-11h19" fill="none" stroke="url(#g1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="brand-text">Pulse Point</span>
    </a>


    <nav id="primary-nav" class="nav">
      {#each navLinks as l}
        <a href={l.href} >{l.label}</a>
      {/each}
      <a class="btn btn--ghost" href="#contact">Contact</a>
      <a class="btn" href="#book">Book Appointment</a>
    </nav>
  </div>
</header>
{@render children?.()}

<style>
  .header {
    position: sticky; top:0; z-index: 50;
    background: rgba(10,12,20,0.75);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
	    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    color: var(--txt); background: radial-gradient(1200px 600px at 10% -10%, #112 0%, #0b0c10 60%, #090a0f 100%);
    line-height: 1.5;
  }
  
	.navwrap {
	display: flex;
	justify-content: center;  
	align-items: center;
	gap: 24px;               
	padding: 14px 0;
	}
	.nav { margin-left: 0; }     
  .brand { display:flex; align-items:center; gap:12px; text-decoration:none; color:var(--txt); font-weight:700; letter-spacing:.3px; }
  .brand-logo { width:34px; height:34px; }
  .brand-text strong { color: var(--brandA); font-weight: 800; }

  .nav { display:flex; align-items:center; gap: 18px; }
  .nav a { color: var(--txt); text-decoration:none; opacity:.9; }
  .nav a:hover { opacity:1; }
  @media (max-width: 720px){
    .nav { display: none; flex-direction: column; }
    .nav.open { display: flex; }
    .mobile-toggle { display:block; }
  }
  .btn {
	color: #131212fd;
  }
</style>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>



<script>
  // Simple, self-contained data for sections
  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Departments", href: "#departments" },
    { label: "Providers", href: "#providers" },
    { label: "Contact", href: "#contact" }
  ];

  const services = [
    {
      title: "24/7 Emergency",
      desc: "Fast, compassionate emergency care with board-certified physicians.",
      icon: "🚑",
    },
    {
      title: "Cardiology",
      desc: "Advanced heart diagnostics, imaging, and minimally invasive procedures.",
      icon: "❤️",
    },
    {
      title: "Pediatrics",
      desc: "Kid-first care, from routine checkups to specialized treatments.",
      icon: "🧸",
    },
    {
      title: "Telehealth",
      desc: "Secure virtual visits from anywhere—on your schedule.",
      icon: "📱",
    },
  ];

  const departments = [
    "Cardiology", "Neurology", "Oncology", "Orthopedics",
    "Maternity", "Pediatrics", "Radiology", "Rehabilitation"
  ];

  const providers = [
    { name: "Dr. Maya Patel", role: "Cardiologist", image: "/images/doctor1.jpg"},
    { name: "Dr. Luis Romero", role: "Pediatrician", image: "/images/doctor3.jfif" },
    { name: "Dr. Anika Shah", role: "Neurologist", image: "/images/doctor2.webp" },
    { name: "Dr. James Chen", role: "Orthopedic Surgeon", image: "/images/doctor4.jpg" },
  ];

  const faqs = [
    { q: "Do you accept walk-ins?", a: "Yes. Our urgent care accepts walk-ins daily. Emergency services are available 24/7." },
    { q: "How do I book an appointment?", a: "Click 'Book Appointment' or call (800) 555-PULSE. Telehealth options are available." },
    { q: "Do you offer financial assistance?", a: "We provide flexible payment plans and financial counseling for eligible patients." }
  ];

  let email = "";
  const subscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing, ${email || "friend"}!`);
    email = "";
  };
</script>

<a id="top" class="sr-only" href="#main">Skip to content</a>



<!-- Hero -->
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <h1>Bright Care. <span class="grad">Beating Hearts.</span></h1>
      <p class="subtitle">
        At <strong>Pulse Point</strong>, we bring world-class medicine closer to you—delivered with warmth,
        technology, and a human touch.
      </p>

      <div class="cta-row">
        <a class="btn btn--xl" href="#book">Book Appointment</a>
        <a class="btn btn--xl btn--ghost" href="#services">Explore Services</a>
      </div>

      <ul class="badges" aria-label="Key highlights">
        <li>⏱ 24/7 Emergency</li>
        <li>🩺 150+ Specialists</li>
        <li>🏥 12 Centers of Excellence</li>
      </ul>
    </div>

    <div class="hero-visual" role="img" aria-label="Illustration of vibrant heartbeat and care">
      <div class="pulse"></div>
      <div class="card stat">
        <span class="stat-number">98%</span>
        <span class="stat-label">Patient Satisfaction</span>
      </div>
      <div class="card stat delay">
        <span class="stat-number">15m</span>
        <span class="stat-label">Avg. ER Wait</span>
      </div>
    </div>
  </div>
</section>

<main id="main">
  <!-- Quick Actions -->
  <section id="book" class="quick">
    <div class="container quick-grid">
      <a class="qcard" href="#providers" aria-label="Find a provider">
        <span class="qicon">👩‍⚕️</span>
        <span class="qtitle">Find a Provider</span>
        <span class="qdesc">Browse specialists by name, department, or symptoms.</span>
      </a>
      <a class="qcard" href="#services" aria-label="View services">
        <span class="qicon">🧭</span>
        <span class="qtitle">View Services</span>
        <span class="qdesc">From preventative care to advanced surgery.</span>
      </a>
      <a class="qcard" href="#contact" aria-label="Locations & directions">
        <span class="qicon">📍</span>
        <span class="qtitle">Locations</span>
        <span class="qdesc">Get directions, parking info, and hours.</span>
      </a>
      <a class="qcard" href="#telehealth" aria-label="Start a telehealth visit">
        <span class="qicon">💻</span>
        <span class="qtitle">Start Telehealth</span>
        <span class="qdesc">Connect securely with your provider online.</span>
      </a>
    </div>
  </section>

  <!-- Services -->
  <section id="services" class="section">
    <div class="container">
      <h2 class="section-title">Care that Meets the Moment</h2>
      <p class="section-sub">Bright, modern medicine across specialties—backed by cutting-edge tech.</p>

      <div class="cards">
        {#each services as s}
          <article class="card service">
            <div class="service-icon" aria-hidden="true">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a href="#contact" class="link">Learn more →</a>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- Departments -->
  <section id="departments" class="section alt">
    <div class="container">
      <h2 class="section-title">Departments</h2>
      <ul class="chips" aria-label="Departments list">
        {#each departments as d}
          <li class="chip">{d}</li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Providers -->
  <section id="providers" class="section">
    <div class="container">
      <h2 class="section-title">Featured Providers</h2>
      <div class="cards providers">
        {#each providers as p}
          <article class="card provider">
            <div class="avatar" aria-hidden="true">
                <img src={p.image} alt="Doctor">
            </div>
            <div class="pinfo">
              <h3>{p.name}</h3>
              <p class="muted">{p.role}</p>
              <a href="#book" class="btn btn--sm">Book</a>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- Telehealth -->
  <section id="telehealth" class="section alt">
    <div class="container tele">
      <div class="tele-copy">
        <h2>Care, Anywhere</h2>
        <p>
          Pulse Point Telehealth brings our specialists to your screen—securely and on your time.
          Prescriptions, follow-ups, and second opinions without the commute.
        </p>
        <ul class="checks">
          <li>HIPAA-compliant video</li>
          <li>Same-day availability</li>
          <li>Works on any device</li>
        </ul>
        <a href="#book" class="btn">Start a Virtual Visit</a>
      </div>
        <img src="/images/doctors1.jpg" alt="Hospital exterior" style="float: right;"/>
    </div>
  </section>

  <!-- FAQs -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq">
        {#each faqs as f, i}
          <details class="faq-item" open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        {/each}
      </div>
    </div>
  </section>

  <!-- Newsletter / Contact -->
  <section id="contact" class="section contact">
    <div class="container contact-grid">
      <div class="contact-box">
        <h2>Stay in the Loop</h2>
        <p class="muted">Health tips, updates, and community events—right to your inbox.</p>
        <form on:submit|preventDefault={subscribe} class="subscribe" aria-label="Newsletter subscription form">
          <input
            type="email"
            placeholder="Your email"
            bind:value={email}
            required
            aria-label="Email address" />
          <button class="btn" type="submit">Subscribe</button>
        </form>
        <p class="tiny">We’ll never share your email. Unsubscribe anytime.</p>
      </div>

      <div class="contact-box">
        <h2>Contact & Location</h2>
        <ul class="contact-list">
          <li>📍 123 Pulse Avenue</li>
          <li>📞 (800) 555-PULSE</li>
          <li>✉️ hello@pulse.point</li>
          <li>🕒 Open 24/7 for Emergency Care</li>
        </ul>
        <a class="btn btn--ghost" href="https://maps.example.com" aria-label="Open map">Get Directions</a>
      </div>
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="footer">
  <div class="container footgrid">
    <div>
      <div class="brand foot-brand">
        <span class="brand-dot" aria-hidden="true"></span>
        Pulse <strong>Point</strong>
      </div>
      <p class="muted">Bright, modern care for every heartbeat.</p>
    </div>
    <nav aria-label="Footer">
      <a href="#services">Services</a>
      <a href="#departments">Departments</a>
      <a href="#providers">Providers</a>
      <a href="#contact">Contact</a>
      <a href="#book">Appointments</a>
    </nav>
  </div>
  <div class="tiny center">© {new Date().getFullYear()} Pulse Point. All rights reserved.</div>
</footer>

<style>
  :root{
    --bg: #0B0C10;
    --panel: #0f1226;
    --muted: #A7A9BE;
    --txt: #e0e1e4ff;
    --brandA: #00E1FF;
    --brandB: #7C4DFF;
    --brandC: #FF4D8D;
    --ring: rgba(255,255,255,0.35);
    --shadow: 0 10px 30px rgba(0,0,0,0.25);
    --radius: 18px;
    --btn: #131212fd;
    font-family: 'Poppins', sans-serif;
    font-weight: 600; /* bold for emphasis */
  }

  * { box-sizing: border-box; }
  html, body { margin:0; padding:0; scroll-behavior: smooth; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    color: var(--txt); background: radial-gradient(1200px 600px at 10% -10%, #112 0%, #0b0c10 60%, #090a0f 100%);
    line-height: 1.5;
  }
  .container { width: min(1150px, 90vw); margin: 0 auto; }

  .sr-only { position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden; }

  /* Header */
  .header {
    position: sticky; top:0; z-index: 50;
    background: rgba(10,12,20,0.75);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .navwrap { display:flex; align-items:center; justify-content:space-between; padding: 14px 0; gap: 16px; }
  .brand { display:flex; align-items:center; gap:12px; text-decoration:none; color:var(--txt); font-weight:700; letter-spacing:.3px; }
  .brand-logo { width:34px; height:34px; }
  .brand-text strong { color: var(--brandA); font-weight: 800; }

  .nav { display:flex; align-items:center; gap: 18px; }
  .nav a { color: var(--txt); text-decoration:none; opacity:.9; }
  .nav a:hover { opacity:1; }

  /* Buttons */
.btn {
  background-image: linear-gradient(
    90deg,
    var(--brandA) 0%,
    var(--brandB) 50%,
    var(--brandC) 100%
  );
  background-size: 300% 200%;  
  background-position: 10% 50%;    
  background-repeat: no-repeat; 
  color:var(--btn);
  border: 2px solid transparent;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight:700;
  box-shadow: var(--shadow);
  transition: transform .15s ease, background-position .5s ease;
}
.btn:hover {
  background-position: 100% 50%;  
  transform: translateY(-1px);
}
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--ring); }
  .btn--ghost {
    background: transparent; color: var(--txt); border: 2px solid rgba(255,255,255,0.18);
    box-shadow: none;
  }
  .btn--ghost:hover { border-color: rgba(255,255,255,0.35); }
  .btn--xl { padding: 14px 24px; font-size: 1.05rem; }
  .btn--sm { padding: 8px 12px; font-size: .9rem; }

  /* Hero */
  .hero { position:relative; overflow:hidden; padding: 48px 0 28px; }
  .hero:before {
    content:""; position:absolute; inset:-30% -10% auto -10%;
    height: 80%; z-index:-1;
    background: radial-gradient(600px 300px at 20% 10%, rgba(0,225,255,0.22), transparent 60%),
                radial-gradient(600px 300px at 80% 0%, rgba(124,77,255,0.22), transparent 60%),
                radial-gradient(600px 300px at 50% 40%, rgba(255,77,141,0.18), transparent 60%);
    filter: blur(10px);
  }
  .hero-grid { display:grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items:center; }
  .hero-copy h1 { font-size: clamp(2.1rem, 3.2vw + 1rem, 4rem); margin: 10px 0 8px; line-height: 1.05; }
  .grad { background: linear-gradient(90deg, var(--brandA), var(--brandB), var(--brandC)); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .subtitle { color: var(--muted); font-size: 1.05rem; max-width: 52ch; }
  .cta-row { display:flex; flex-wrap: wrap; gap: 12px; margin: 18px 0 6px; }
  .badges { display:flex; gap: 14px; flex-wrap:wrap; padding:0; margin: 18px 0 0; list-style:none; }
  .badges li { background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); padding:8px 12px; border-radius:999px; font-weight:600; }

  .hero-visual { position:relative; min-height: 300px; }
  .pulse {
    position:absolute; inset: 10% 0 10% 0; margin:auto; width:100%; height: 12px; border-radius: 6px;
    background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.18), rgba(255,255,255,0.06));
    overflow:hidden;
  }
  .pulse:after {
    content:""; position:absolute; left:-20%; top: -12px; width: 40%; height: 36px; border-radius: 999px;
    background: linear-gradient(90deg, var(--brandA), var(--brandB), var(--brandC));
    animation: sweep 2.6s linear infinite;
  }
  @keyframes sweep { to { transform: translateX(320%); } }

  .card {
    background: radial-gradient(120% 120% at 10% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
  .stat {
    position:absolute; right: 0; padding: 14px 16px; width: 175px;
    transform: translateY(-10px);
    animation: float 6s ease-in-out infinite;
  }
  .stat.delay { top: 56%; right: 14%; animation-delay: 1.4s; }
  .stat-number { font-size: 1.6rem; font-weight: 900; }
  .stat-label { display:block; font-size:.9rem; color: var(--muted); }
  @keyframes float {
    0%,100%{ transform: translateY(-10px); }
    50%{ transform: translateY(6px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .pulse:after, .stat { animation: none; }
  }

  .ribbon { margin-top: 28px; opacity: .85; }

  /* Quick actions */
  .quick { padding: 26px 0 10px; }
  .quick-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .qcard {
    display:grid; gap:6px; padding:16px; text-decoration:none; color:var(--txt);
    border-radius: var(--radius);
    background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.12);
    transition: transform .15s ease, border-color .15s ease;
  }
  .qcard:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.25); }
  .qicon { font-size: 1.4rem; }
  .qtitle { font-weight:800; }
  .qdesc { color: var(--muted); font-size: .95rem; }

  /* Sections */
  .section { padding: 64px 0; }
  .section.alt { background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); }
  .section-title { font-size: clamp(1.6rem, 1.6vw + 1rem, 2.2rem); margin:0 0 6px; }
  .section-sub { color: var(--muted); margin:0 0 24px; }

  .cards { display:grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  .card.service { padding: 18px; display:grid; gap:10px; }
  .service-icon { font-size: 1.6rem; }
  .card.service h3 { margin: 2px 0; }
  .card.service p { color: var(--muted); margin: 0 0 6px; }
  .link { color: var(--txt); text-decoration: none; font-weight: 700; opacity: .9; }
  .link:hover { opacity: 1; text-decoration: underline; text-underline-offset: 3px; }

  .chips { display:flex; flex-wrap:wrap; gap: 10px; padding:0; margin: 12px 0 0; list-style:none; }
  .chip { padding: 10px 14px; border-radius:999px; font-weight:700; background: rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); }

  .providers { grid-template-columns: repeat(4, 1fr); }
  .provider { display:flex; gap:14px; padding: 16px; align-items:center; }
  .avatar {
    width: 56px; 
    height: 56px; 
    border-radius: 50%;
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .avatar img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pinfo h3 { margin:0; font-size: 1rem; }
  .muted { color: var(--muted); }

  .tele { display:grid; grid-template-columns: 1.2fr 1fr; gap: 22px; align-items:center; }
  .tele-copy { display:grid; gap: 8px; }
  .checks { display:grid; gap: 6px; padding:0; margin: 8px 0 8px; list-style: none; }
  .checks li::before { content: "✔"; margin-right: 8px; color: var(--brandA); }

  .tele-visual { position:relative; min-height: 200px; }
  .device { position:absolute; border-radius: 12px; background: #0b0f1a; border:1px solid rgba(255,255,255,0.14); box-shadow: var(--shadow); }
  .device.laptop { width: 84%; height: 58%; bottom: 0; right: 0; }
  .device.phone { width: 34%; height: 60%; top: 0; left: 4%; transform: rotate(-6deg); }

  .faq { display:grid; gap: 10px; }
  .faq-item { background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 12px 14px; }
  .faq-item summary { cursor: pointer; font-weight: 700; }
  .faq-item p { margin: 8px 0 0; color: var(--muted); }

  .contact { padding-bottom: 80px; }
  .contact-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .contact-box { padding: 18px; border-radius: var(--radius); background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); }
  .subscribe { display:flex; gap: 10px; margin: 8px 0 0; }
  .subscribe input {
    flex:1; padding: 12px 14px; border-radius: 999px; border:1px solid rgba(255,255,255,0.18); background: rgba(12,16,28,0.8); color: var(--txt);
  }
  .tiny { font-size: .8rem; color: var(--muted); }
  .center { text-align:center; }

  /* Footer */
  .footer { padding: 26px 0 30px; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(10,12,20,0.65); }
  .footgrid { display:flex; align-items:start; justify-content:space-between; gap: 18px; }
  .foot-brand { font-weight: 800; display:flex; align-items:center; gap: 8px; }
  .brand-dot { width: 10px; height:10px; background: linear-gradient(90deg, var(--brandA), var(--brandB), var(--brandC)); border-radius: 999px; display:inline-block; }
  .footer nav { display:flex; gap: 16px; flex-wrap:wrap; }
  .footer nav a { color: var(--txt); text-decoration:none; opacity:.9; }
  .footer nav a:hover { opacity: 1; text-decoration: underline; text-underline-offset:3px;}

  /* Responsive */
  @media (max-width: 980px){
    .hero-grid { grid-template-columns: 1fr; }
    .cards { grid-template-columns: repeat(2, 1fr); }
    .providers { grid-template-columns: repeat(2, 1fr); }
    .tele { grid-template-columns: 1fr; }
    .quick-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 720px){
    .nav { position: absolute; right: 5vw; top: 60px; background: rgba(14,16,28,0.95); padding: 12px; border:1px solid rgba(255,255,255,0.12); border-radius: 12px; display:none; flex-direction: column; width: 240px; }
    .nav.open { display:flex; }
    .footgrid { flex-direction: column; align-items: start; }
    .cards { grid-template-columns: 1fr; }
    .providers { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
  }
</style>

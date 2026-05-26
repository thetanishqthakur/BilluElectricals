import { useState, useRef } from "react";
import CounterCard from "./CounterCard";

const products = [
  { id: 1,  icon: "⚡", name: "Generators",         desc: "Petrol & diesel generators for home, shop, and industrial use. Power cuts? No problem.",                    tag: "Bestseller", tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/30"  },
  { id: 2,  icon: "🌀", name: "Aata Chakki",        desc: "Heavy-duty flour mills — domestic and commercial. Fresh chakki atta, bilkul ghar pe.",                      tag: "Popular",    tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"},
  { id: 3,  icon: "⚙️", name: "Electric Motors",    desc: "Single-phase & three-phase motors for every industrial & agricultural need.",                               tag: "Wide Range", tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/30"       },
  { id: 4,  icon: "💧", name: "Water Pumps",         desc: "Submersible, monoblock, centrifugal pumps. Paani ki kami kabhi nahi hogi.",                                tag: "Top Selling",tagColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30"        },
  { id: 5,  icon: "🔧", name: "Electric Drills",     desc: "Rotary, hammer & impact drills for professionals and DIY warriors alike.",                                  tag: "Heavy Duty", tagColor: "text-violet-400 bg-violet-400/10 border-violet-400/30" },
  { id: 6,  icon: "❄️", name: "Cooler Pumps",        desc: "Desert & window cooler pumps, pads, and motors. Beat the summer heat!",                                    tag: "Seasonal",   tagColor: "text-pink-400 bg-pink-400/10 border-pink-400/30"        },
  { id: 7,  icon: "🔌", name: "Wiring & Cables",     desc: "ISI-marked wires, cables, switches, sockets — complete electrical wiring solutions.",                       tag: "ISI Marked", tagColor: "text-orange-400 bg-orange-400/10 border-orange-400/30" },
  { id: 8,  icon: "💡", name: "LED Lights & Fans",   desc: "Energy-saving LED bulbs, panels, street lights, and ceiling fans of all brands.",                          tag: "Energy Save", tagColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"},
  { id: 9,  icon: "🏗️", name: "Angle Grinders",     desc: "Cutting & grinding machines for metal, stone, and tiles. Industrial grade quality.",                        tag: "Pro Grade",  tagColor: "text-red-400 bg-red-400/10 border-red-400/30"          },
  { id: 10, icon: "🔋", name: "Inverters & UPS",     desc: "Home & office inverters, batteries, and UPS systems for uninterrupted power.",                             tag: "New Stock",  tagColor: "text-teal-400 bg-teal-400/10 border-teal-400/30"       },
  { id: 11, icon: "🚜", name: "Agriculture Motors",  desc: "Submersible & monoblock motors for irrigation and farm use in Kullu Valley.",                               tag: "Farm Ready", tagColor: "text-lime-400 bg-lime-400/10 border-lime-400/30"       },
  { id: 12, icon: "🛠️", name: "Repair Services",     desc: "Rewinding, repair of motors, pumps, generators, chakki — same day service available!",                     tag: "Service",    tagColor: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
];

const services = [
  { icon: "🔁", title: "Motor Rewinding",   desc: "Expert rewinding of all types of motors — fast turnaround, guaranteed quality." },
  { icon: "🔧", title: "Generator Repair",  desc: "Petrol/diesel generator servicing, AVR repair, and complete overhauling." },
  { icon: "⚙️", title: "Pump Servicing",    desc: "Submersible and monoblock pump repair, seal replacement, and testing." },
  { icon: "🌀", title: "Chakki Repair",     desc: "Aata chakki motor and blade repair, balancing, and full maintenance." },
  { icon: "🏠", title: "Home Wiring",       desc: "Complete house wiring, switchboard fitting, earthing, and safety inspection." },
  { icon: "📦", title: "Annual Maintenance",desc: "AMC packages for shops, factories, and residential complexes — tension free raho." },
];

const testimonials = [
  { name: "Rajesh Thakur", loc: "Bhuntar",  text: "Billu bhai ne mera water pump ek ghante mein theek kar diya. Bahut tez aur sasta kaam!", stars: 5 },
  { name: "Sunita Devi",   loc: "Kullu",    text: "Generator liya yahan se, seedha ghar delivery bhi ki. Service bahut acha hai yahan ka.", stars: 5 },
  { name: "Mohan Singh",   loc: "Manali",   text: "Motor rewinding ka kaam sabse best yahan hota hai poori Kullu Valley mein.", stars: 5 },
];

const whyUs = [
  { icon: "⚡", title: "Same Day Service",    sub: "Zyaadatar kaam usi din" },
  { icon: "💰", title: "Sasta aur Best",      sub: "Fair pricing, no overcharging" },
  { icon: "🛡️", title: "3 Mahine Warranty",  sub: "Sabhi repairs par guarantee" },
  { icon: "📍", title: "Ghar pe bhi aate",   sub: "Home service available" },
];

const brands = ["Havells", "Kirloskar", "Crompton", "Luminous", "V-Guard", "Anchor", "Siemens", "Bosch"];

// ── APNA NUMBER YAHAN DAALO ────────────────────────────────────────
const PHONE = "919816039937"; // Country code + number, no + or spaces
const PHONE_DISPLAY = "+91 98160 39937";
// ───────────────────────────────────────────────────────────────────

const navItems = ["home", "products", "services", "about", "contact"];

const orbitIcons = [
  { icon: "⚙️", angle: 0   },
  { icon: "💧", angle: 60  },
  { icon: "🔌", angle: 120 },
  { icon: "🌀", angle: 180 },
  { icon: "🔧", angle: 240 },
  { icon: "💡", angle: 300 },
];

function StarRating({ count }) {
  return (
    <div className="text-amber-400 text-base tracking-widest">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav]       = useState("home");
  const [hoveredCard, setHoveredCard]   = useState(null);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [toast, setToast]               = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleCall = () => { window.location.href = `tel:+${PHONE}`; };
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${PHONE}?text=Namaste%20Billu%20bhai%2C%20mujhe%20electrical%20service%20ke%20baare%20mein%20jaankari%20chahiye.`,
      "_blank"
    );
  };

  return (
    <div className="font-rajdhani bg-[#0a0e1a] text-slate-200 min-h-screen overflow-x-hidden">

      {/* ── ANIMATED BACKGROUND BOLTS ─────────────────────────────── */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="hero-bolt z-0"
          style={{
            left: `${8 + i * 16}%`,
            animationDuration: `${4 + i * 1.2}s`,
            animationDelay: `${i * 0.9}s`,
          }}
        >⚡</div>
      ))}

      {/* ══════════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[70px]">

          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 bg-transparent border-none cursor-pointer">
            <span className="text-3xl animate-zap">⚡</span>
            <div className="text-left">
              <div className="font-bebas text-2xl text-amber-500 tracking-[3px] leading-none">
                BILLU ELECTRICALS
              </div>
              <div className="text-[10px] text-slate-500 tracking-[3px] uppercase">
                Sainik Chowk, Bhuntar
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item}
                className={`nav-link ${activeNav === item ? "active" : ""}`}
                onClick={() => scrollTo(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button className="cta-btn hidden sm:block text-base px-5 py-2" onClick={handleCall}>
              📞 Call Now
            </button>
            <button
              className="md:hidden bg-transparent border-none text-amber-500 text-2xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0a0e1a] border-t border-amber-500/20 px-6 py-4">
            {navItems.map(item => (
              <div key={item} className="border-b border-slate-700/30 py-3">
                <button
                  className={`nav-link text-lg ${activeNav === item ? "active" : ""}`}
                  onClick={() => scrollTo(item)}
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-[100px] pb-16 px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 50%)",
        }}
      >
        {/* Grid BG */}
        <div className="absolute inset-0 grid-bg z-0" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="animate-fadeInUp">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-zap inline-block" />
                <span className="text-amber-500 text-xs font-bold tracking-widest uppercase font-rajdhani">
                  Open Now — Sainik Chowk, Bhuntar HP
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-bebas leading-[0.9] tracking-wide mb-6" style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}>
                <span className="glowing-text">BILLU</span>
                <br />
                <span className="text-slate-200">ELEC</span>
                <span className="text-amber-500">TRICALS</span>
              </h1>

              <p className="text-slate-400 text-xl leading-relaxed mb-8 max-w-xl font-medium">
                Kullu Valley ka{" "}
                <span className="text-amber-500 font-bold">sabse bharosemand</span>{" "}
                electrical shop. Generator se lekar Aata Chakki tak — sale bhi, repair bhi.{" "}
                <span className="text-emerald-400 font-bold">25+ saalon ka tajurbaa.</span>
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button className="cta-btn" onClick={() => scrollTo("products")}>
                  🛒 Products Dekho
                </button>
                <button className="outline-btn" onClick={() => scrollTo("services")}>
                  🔧 Repair Service
                </button>
              </div>

              <div className="flex flex-wrap gap-6">
                {[["⚡", "Same Day Repair"], ["🚚", "Home Delivery"], ["✅", "ISI Certified"]].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Orbit Visual */}
            <div className="flex justify-center">
              <div
                className="animate-float relative flex items-center justify-center rounded-full border-2 border-amber-500/20"
                style={{
                  width: 320, height: 320,
                  background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
                }}
              >
                <span className="text-[8rem]" style={{ filter: "drop-shadow(0 0 30px rgba(245,158,11,0.8))" }}>⚡</span>

                {orbitIcons.map(({ icon, angle }) => {
                  const rad = (angle * Math.PI) / 180;
                  const r = 145;
                  return (
                    <div
                      key={angle}
                      className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xl bg-slate-900/90 border border-amber-500/40"
                      style={{
                        left: `calc(50% + ${Math.cos(rad) * r}px - 20px)`,
                        top: `calc(50% + ${Math.sin(rad) * r}px - 20px)`,
                      }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-amber-500/[0.03] border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          <CounterCard end={25}   suffix="+" label="Years Experience"    />
          <CounterCard end={5000} suffix="+" label="Happy Customers"     />
          <CounterCard end={50}   suffix="+" label="Brands Available"    />
          <CounterCard end={99}   suffix="%" label="Repair Success Rate" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════════════════════ */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">⚡ Humara Saman</p>
            <h2 className="section-heading text-slate-200">
              HAMARE <span className="glowing-text">PRODUCTS</span>
            </h2>
            <p className="text-slate-500 text-lg mt-3 max-w-md mx-auto">
              Sab kuch milega yahan — quality guarantee ke saath
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="product-card group"
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Tag */}
                <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-rajdhani ${p.tagColor}`}>
                  {p.tag}
                </span>

                {/* Icon */}
                <div
                  className={`text-5xl mb-4 transition-all duration-300 ${hoveredCard === p.id ? "animate-float" : ""}`}
                  style={{ filter: hoveredCard === p.id ? "drop-shadow(0 0 12px rgba(245,158,11,0.8))" : "none" }}
                >
                  {p.icon}
                </div>

                <h3 className={`font-teko text-2xl tracking-wide mb-2 transition-colors duration-300 ${hoveredCard === p.id ? "text-amber-400" : "text-slate-200"}`}>
                  {p.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>

                {hoveredCard === p.id && (
                  <div className="mt-4 pt-4 border-t border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase font-rajdhani">
                    Inquiry Karo →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="services"
        className="py-24 px-6 border-t border-slate-700/20"
        style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, transparent 70%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">🔧 Repair & Maintenance</p>
            <h2 className="section-heading text-slate-200">
              HAMARI <span className="glowing-text">SERVICES</span>
            </h2>
            <p className="text-slate-500 text-lg mt-3">
              Toot gaya? Billu bhai theek kar denge — guaranteed!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-teko text-2xl tracking-wide text-amber-400 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Why Us Banner */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {whyUs.map(({ icon, title, sub }) => (
              <div key={title}>
                <div className="text-4xl mb-2">{icon}</div>
                <div className="font-teko text-xl text-amber-400 tracking-wide">{title}</div>
                <div className="text-slate-500 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 border-t border-slate-700/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Text */}
          <div>
            <p className="section-label">🏪 Hamare Baare Mein</p>
            <h2 className="section-heading text-slate-200 mb-6">
              KULLU VALLEY KI <span className="glowing-text">SHAAN</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-4">
              <strong className="text-amber-500">Billu Electricals</strong> — Sainik Chowk, Bhuntar mein pichhle{" "}
              <strong className="text-slate-200">25 saalon</strong> se Kullu Valley ki electrical zarooratein poori karta aa raha hai.
              Generator se lekar Aata Chakki tak, motors se lekar LED lights tak — sab kuch ek hi jagah.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              Hamare paas <strong className="text-slate-200">ISI-certified products</strong>, trained technicians, aur best-in-valley
              repair service hai. Manali, Kullu, Kasol — sab jagah se log yahan aate hain.
            </p>

            {/* Brands */}
            <div className="flex flex-wrap gap-2">
              {brands.map(b => (
                <span
                  key={b}
                  className="bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg font-rajdhani"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { bg: "bg-amber-400/10  border-amber-400/30",   icon: "🏆", title: "Best Shop Award",  sub: "Kullu District 2023"  },
              { bg: "bg-emerald-400/10 border-emerald-400/30", icon: "✅", title: "ISI Certified",    sub: "All Products"         },
              { bg: "bg-blue-400/10   border-blue-400/30",    icon: "🚚", title: "Free Delivery",    sub: "Bhuntar & nearby"     },
              { bg: "bg-violet-400/10 border-violet-400/30",  icon: "📞", title: "24/7 Support",     sub: "Emergency calls"      },
            ].map(({ bg, icon, title, sub }) => (
              <div key={title} className={`rounded-2xl border p-6 text-center ${bg}`}>
                <div className="text-4xl mb-2">{icon}</div>
                <div className="font-teko text-xl text-slate-200 tracking-wide">{title}</div>
                <div className="text-slate-500 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-black/20 border-t border-slate-700/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">⭐ Customer Reviews</p>
            <h2 className="section-heading text-slate-200">
              LOG <span className="glowing-text">KYA KEHTE HAIN</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <StarRating count={t.stars} />
                <p className="text-slate-400 mt-4 leading-relaxed text-base italic">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bebas text-xl text-[#0a0e1a]"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-200">{t.name}</div>
                    <div className="text-slate-500 text-xs">📍 {t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 border-t border-slate-700/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">📍 Hamare Paas Aao</p>
            <h2 className="section-heading text-slate-200">
              MILIYE <span className="glowing-text">HUMSE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {[
                { icon: "📍", label: "Address",          value: "Sainik Chowk, Bhuntar\nKullu, Himachal Pradesh — 175125" },
                { icon: "📞", label: "Call / WhatsApp",  value: PHONE_DISPLAY },
                { icon: "🕐", label: "Timings",          value: "Mon–Sat: 8:00 AM – 8:00 PM\nSunday: 9:00 AM – 6:00 PM" },
                { icon: "📧", label: "Email",            value: "billuelectricals@gmail.com" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="contact-info-card">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <div className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1 font-rajdhani">{label}</div>
                    <div className="text-slate-400 leading-relaxed whitespace-pre-line">{value}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-2">
                <button className="cta-btn flex-1 text-center" onClick={handleCall}>📞 Call Karen</button>
                <button
                  className="flex-1 rounded-full font-teko font-semibold text-xl uppercase tracking-widest text-white border-none cursor-pointer py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ background: "#25D366", letterSpacing: "2px" }}
                  onClick={handleWhatsApp}
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>

            {/* Map Card */}
            <div className="relative rounded-2xl border border-slate-700/30 bg-slate-900/60 overflow-hidden min-h-[420px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="relative z-10 text-center p-10">
                <div className="text-7xl mb-4 animate-float inline-block">📍</div>
                <h3 className="font-bebas text-3xl text-amber-500 tracking-[3px] mb-1">SAINIK CHOWK</h3>
                <p className="text-slate-400 mb-6">Bhuntar, Kullu — HP 175125</p>
                <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mb-6 text-slate-400 text-sm leading-relaxed">
                  🏔️ Beas River ke paas<br />
                  ✈️ Bhuntar Airport se 2 min<br />
                  🚌 Bus Stand ke bilkul nazdeek
                </div>
                <button
                  className="cta-btn"
                  onClick={() => window.open("https://maps.app.goo.gl/UYfQiTnHsJP9EMuz9?g_st=ac", "_blank")}
                >
                  🗺️ Google Maps Kholo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#050810] border-t border-amber-500/20 pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-8 mb-8">
            <div>
              <div className="font-bebas text-3xl text-amber-500 tracking-[3px]">⚡ BILLU ELECTRICALS</div>
              <div className="text-slate-500 text-sm mt-1">Kullu Valley ka Sabse Trusted Electrical Shop</div>
            </div>
            <div className="flex flex-wrap gap-6">
              {navItems.map(item => (
                <button key={item} className="nav-link" onClick={() => scrollTo(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-700/30 pt-6 text-center text-slate-500 text-sm">
            © 2026 Billu Electricals, Bhuntar, Himachal Pradesh. All rights reserved. Made by Tanishq Thakur (HunteR)
          </div>
        </div>
      </footer>

      {/* ── WhatsApp FAB ──────────────────────────────────────────── */}
      <a
        className="whatsapp-fab"
        href={`https://wa.me/${PHONE}?text=Namaste%20Billu%20bhai%2C%20mujhe%20electrical%20service%20ke%20baare%20mein%20jaankari%20chahiye.`}
        target="_blank"
        rel="noreferrer"
        title="WhatsApp par message karo"
      >
        💬
      </a>

      {/* ── Toast ─────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-28 right-8 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm font-rajdhani shadow-xl">
          ✅ Call karen: {PHONE_DISPLAY}
        </div>
      )}
    </div>
  );
}

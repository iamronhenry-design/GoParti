import { useMemo, useState } from "react";

/** -----------------------------
 *  Mock content (swap later)
 *  ----------------------------- */
const SPONSORED = [
  {
    id: "s1",
    title: "Omnia • Calvin Harris (Tonight)",
    cta: "Get Tickets",
    url: "/go/omnia-calvin",
    img: "https://images.unsplash.com/photo-1561484930-998f19d8fc65?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s2",
    title: "Wet Republic • Dayclub Cabanas",
    cta: "Book VIP",
    url: "/go/wet-republic-cabanas",
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600&auto=format&fit=crop",
  },
];

const EVENTS = [
  {
    id: "e1",
    name: "Rooftop Hip-Hop",
    venue: "Chateau Rooftop",
    date: "Tonight • 10:30 PM",
    area: "Strip",
    priceMin: 25,
    genres: ["hip-hop"],
    tags: ["rooftop", "guestlist"],
    img: "https://images.unsplash.com/photo-1482690207933-71d67dc1c5d9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e2",
    name: "Pool Party + Brunch",
    venue: "Encore Beach Club",
    date: "Sat • 11:00 AM",
    area: "Strip",
    priceMin: 49,
    genres: ["edm"],
    tags: ["dayclub", "pool"],
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e3",
    name: "Tech House Underground",
    venue: "Downtown Warehouse",
    date: "Fri • 11:30 PM",
    area: "Downtown",
    priceMin: 20,
    genres: ["house"],
    tags: ["underground", "budget"],
    img: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e4",
    name: "VIP Table for 6 (Bundle)",
    venue: "XS Nightclub",
    date: "Sat • 10:00 PM",
    area: "Strip",
    priceMin: 950,
    genres: ["edm"],
    tags: ["vip", "table", "luxury"],
    img: "https://images.unsplash.com/photo-1520012218364-1f6d3a1a4c51?q=80&w=1600&auto=format&fit=crop",
  },
];

const CHIPS = ["Tonight", "Dayclub", "Hip-Hop", "EDM", "Near the Strip", "Budget", "Luxury"];

/** ----------------------------- */
const n = (s) => (s || "").toLowerCase();
function matches(ev, q) {
  if (!q) return true;
  const hay = n(
    [ev.name, ev.venue, ev.date, ev.area, ev.genres.join(" "), ev.tags.join(" "), ev.priceMin].join(" ")
  );
  return q.split(/\s+/).filter(Boolean).every((t) => hay.includes(n(t)));
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState("");

  const filtered = useMemo(() => {
    const q = [query, chip].filter(Boolean).join(" ");
    return EVENTS.filter((e) => matches(e, q));
  }, [query, chip]);

  // sponsored insertion after first organic card
  const results = useMemo(() => {
    const out = [];
    filtered.forEach((e, i) => {
      out.push({ type: "event", data: e });
      if (i === 0 && SPONSORED[0]) out.push({ type: "sponsored", data: SPONSORED[0] });
    });
    return out;
  }, [filtered]);

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">
          <div className="mark" />
          <span>GoParti</span>
        </div>
        <nav className="navlinks">
          <a href="#">Hot Tickets</a>
          <a href="#">VIP & Groups</a>
          <a href="#">Partners</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Where the night starts.</h1>
          <p className="sub">Type your vibe. We’ll plan your night—events, guestlists, tickets, and tables in seconds.</p>

          <div className="search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try: "hip-hop rooftop tonight under $50" or "table for 6 near the Strip"'
            />
            <button onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>Search</button>
          </div>

          <div className="chips">
            {CHIPS.map((c) => (
              <button
                key={c}
                className={`chip ${chip === c ? "active" : ""}`}
                onClick={() => setChip(chip === c ? "" : c)}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="srail">
          <div className="srailHead">
            <h2>Hot in Vegas</h2>
            <span className="badge">Sponsored</span>
          </div>
          <div className="sgrid">
            {SPONSORED.map((s) => (
              <a key={s.id} href={s.url} className="scard">
                <img src={s.img} alt="" />
                <div className="overlay" />
                <div className="scardFoot">
                  <div className="title">{s.title}</div>
                  <div className="cta">{s.cta}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="results">
          <div className="rhead">
            <h3>Results</h3>
            <div className="count">{filtered.length} matches</div>
          </div>
          <div className="grid">
            {results.map((item) =>
              item.type === "event" ? (
                <article key={item.data.id} className="card">
                  <div className="img">
                    <img src={item.data.img} alt="" />
                  </div>
                  <div className="body">
                    <div className="name">{item.data.name}</div>
                    <div className="meta">
                      {item.data.venue} • {item.data.area}
                    </div>
                    <div className="meta">
                      {item.data.date} • from ${item.data.priceMin}
                    </div>
                    <div className="actions">
                      <button className="ghost">Guestlist</button>
                      <button className="ghost">Tickets</button>
                      <button className="solid">Book Table</button>
                    </div>
                  </div>
                </article>
              ) : (
                <a key={"ad-" + item.data.id} href={item.data.url} className="adcard">
                  <img src={item.data.img} alt="" />
                  <div className="overlay" />
                  <div className="adBadge">Sponsored</div>
                  <div className="adFoot">
                    <div className="title">{item.data.title}</div>
                    <div className="cta">{item.data.cta}</div>
                  </div>
                </a>
              )
            )}
          </div>
        </section>
      </main>

      <footer className="foot">
        Some listings are paid placements. Prices & availability set by partners. © {new Date().getFullYear()} GoParti
      </footer>

      {/* Minimal, premium CSS */}
      <style jsx global>{`
        :root{
          --bg:#0B0B0F;
          --panel:#101218;
          --line:rgba(255,255,255,0.08);
          --soft:rgba(255,255,255,0.6);
          --muted:rgba(255,255,255,0.45);
          --white:#fff;
          --black:#000;
        }
        *{box-sizing:border-box}
        body{margin:0;background:var(--bg);color:var(--white);font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif}
        a{color:inherit;text-decoration:none}
        main{max-width:1200px;margin:0 auto;padding:0 20px}
        /* nav */
        .nav{position:sticky;top:0;z-index:30;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--line);background:rgba(11,11,15,.65);backdrop-filter:saturate(140%) blur(8px)}
        .brand{display:flex;align-items:center;gap:10px;font-weight:600}
        .mark{width:26px;height:26px;border-radius:9px;background:radial-gradient(120% 120% at 0% 0%, #7c4dff 0%, #00e5ff 60%, transparent 70%),linear-gradient(135deg,#15161d,#0f1218)}
        .navlinks a{margin-left:18px;opacity:.8;font-size:14px}
        .navlinks a:hover{opacity:1}
        /* hero */
        .hero{padding:64px 0 20px}
        .hero h1{font-size:clamp(36px,5vw,56px);margin:0 0 10px}
        .sub{color:var(--soft);max-width:640px}
        .search{display:flex;gap:10px;margin-top:16px}
        .search input{flex:1;padding:15px 14px;border-radius:14px;background:#0d0f14;border:1px solid var(--line);color:var(--white)}
        .search button{padding:14px 16px;border-radius:12px;background:#e8e8ea;color:#000;border:1px solid #e8e8ea;cursor:pointer}
        .search button:hover{filter:brightness(.95)}
        .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
        .chip{padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:#0d0f14;color:var(--white);font-size:13px;opacity:.9}
        .chip:hover{opacity:1}
        .chip.active{background:#fff;color:#000;border-color:#fff}
        /* sponsored rail */
        .srail{padding:26px 0 0}
        .srailHead{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}
        .srail h2{font-size:18px;margin:0}
        .badge{font-size:11px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase}
        .sgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
        .scard{position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--line);background:#0d0f14}
        .scard img{width:100%;height:180px;object-fit:cover;display:block;transition:transform .4s ease}
        .scard .overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%, rgba(0,0,0,.85))}
        .scard:hover img{transform:scale(1.03)}
        .scardFoot{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:12px;padding:12px}
        .scard .title{font-weight:600}
        .scard .cta{margin-left:auto;background:#fff;color:#000;border-radius:10px;padding:6px 10px;font-size:13px}
        /* results */
        .results{padding:28px 0 56px}
        .rhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
        .count{color:var(--muted);font-size:14px}
        .grid{display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px}
        .card{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#0d0f14}
        .img img{width:100%;height:180px;object-fit:cover;display:block}
        .body{padding:14px}
        .name{font-weight:600}
        .meta{color:var(--muted);font-size:14px;margin-top:2px}
        .actions{display:flex;gap:8px;margin-top:12px}
        .ghost{background:transparent;border:1px solid var(--line);color:#fff;padding:8px 10px;border-radius:10px;cursor:pointer}
        .solid{background:#fff;color:#000;border:none;padding:8px 10px;border-radius:10px;cursor:pointer}
        /* sponsored card in grid */
        .adcard{position:relative;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#0d0f14}
        .adcard img{width:100%;height:180px;object-fit:cover;display:block;transition:transform .4s ease}
        .adcard .overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%, rgba(0,0,0,.9))}
        .adcard:hover img{transform:scale(1.03)}
        .adBadge{position:absolute;top:10px;left:10px;font-size:11px;padding:4px 8px;border-radius:10px;background:rgba(0,0,0,.55);border:1px solid var(--line)}
        .adFoot{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:10px;padding:12px}
        .foot{border-top:1px solid var(--line);padding:28px 16px;text-align:center;color:var(--muted);font-size:14px}
      `}</style>
    </div>
  );
}

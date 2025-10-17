import { useMemo, useState } from "react";

/** -----------------------------
 *  MOCK DATA (replace later)
 *  ----------------------------- */
const SPONSORED = [
  {
    id: "s1",
    title: "Omnia • Calvin Harris (Tonight)",
    cta: "Get Tickets",
    url: "#",
    img: "https://images.unsplash.com/photo-1561484930-998f19d8fc65?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "s2",
    title: "Wet Republic • Dayclub Cabanas",
    cta: "Book VIP",
    url: "#",
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
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
    tags: ["rooftop", "tonight", "guestlist"],
    img: "https://images.unsplash.com/photo-1482690207933-71d67dc1c5d9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e2",
    name: "Pool Party + Brunch",
    venue: "Encore Beach Club",
    date: "Sat • 11:00 AM",
    area: "Strip",
    priceMin: 49,
    genres: ["edm"],
    tags: ["dayclub", "brunch", "pool"],
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1520012218364-1f6d3a1a4c51?q=80&w=1200&auto=format&fit=crop",
  },
];

const QUICK_CHIPS = [
  "Tonight",
  "Dayclub",
  "Hip-Hop",
  "EDM",
  "Near the Strip",
  "Budget",
  "Luxury",
  "Bachelor",
  "Birthday",
];

/** -----------------------------
 *  SIMPLE HELPERS
 *  ----------------------------- */
const norm = (s) => (s || "").toLowerCase();

function matches(ev, q) {
  if (!q) return true;
  const hay = norm(
    [
      ev.name,
      ev.venue,
      ev.date,
      ev.area,
      ev.genres.join(" "),
      ev.tags.join(" "),
      ev.priceMin,
    ].join(" ")
  );
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(norm(term)));
}

/** -----------------------------
 *  PAGE
 *  ----------------------------- */
export default function Home() {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState("");

  const filtered = useMemo(() => {
    const q = [query, chip].filter(Boolean).join(" ");
    return EVENTS.filter((e) => matches(e, q));
  }, [query, chip]);

  // Inject 1 sponsored card after first event
  const results = useMemo(() => {
    const out = [];
    filtered.forEach((e, i) => {
      out.push({ type: "event", data: e });
      if (i === 0 && SPONSORED[0]) out.push({ type: "sponsored", data: SPONSORED[0] });
    });
    return out;
  }, [filtered]);

  return (
    <div className="wrap">
      <header className="nav">
        <div className="brand">
          <div className="logo" />
          <span>GoParti</span>
        </div>
        <nav className="links">
          <a href="#">Hot Tickets</a>
          <a href="#">VIP &amp; Groups</a>
          <a href="#">Partners</a>
        </nav>
      </header>

      <section className="hero">
        <h1>The night starts here.</h1>
        <p className="sub">
          Type your vibe. We’ll plan your night—events, guestlists, tickets, and tables in seconds.
        </p>

        <div className="search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`"hip-hop rooftop tonight under $50" • "table for 6 near the Strip" • "pool party + brunch"`}
          />
          <button onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>
            Search
          </button>
        </div>

        <div className="chips">
          {QUICK_CHIPS.map((c) => (
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

      <section className="rail">
        <div className="railHead">
          <h2>Hot in Vegas</h2>
          <span className="sponsored">Sponsored</span>
        </div>
        <div className="cards">
          {SPONSORED.map((s) => (
            <a key={s.id} href={s.url} className="card">
              <img src={s.img} alt="" />
              <div className="cardText">
                <div className="badge">Sponsored</div>
                <div className="title">{s.title}</div>
                <div className="cta">{s.cta}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="results">
        <div className="resultsHead">
          <h3>Results</h3>
          <div className="count">{filtered.length} matches</div>
        </div>

        <div className="grid">
          {results.map((item) =>
            item.type === "event" ? (
              <div key={item.data.id} className="eventCard">
                <div className="imgWrap">
                  <img src={item.data.img} alt="" />
                </div>
                <div className="pad">
                  <div className="name">{item.data.name}</div>
                  <div className="meta">
                    {item.data.venue} • {item.data.area}
                  </div>
                  <div className="meta">
                    {item.data.date} • from ${item.data.priceMin}
                  </div>
                  <div className="btns">
                    <button className="ghost">Guestlist</button>
                    <button className="ghost">Tickets</button>
                    <button className="solid">Book Table</button>
                  </div>
                </div>
              </div>
            ) : (
              <a key={"ad-" + item.data.id} href={item.data.url} className="sponsoredCard">
                <img src={item.data.img} alt="" />
                <div className="sponsoredLabel">Sponsored</div>
                <div className="sponsoredFooter">
                  <div className="title">{item.data.title}</div>
                  <div className="cta">{item.data.cta}</div>
                </div>
              </a>
            )
          )}
        </div>
      </section>

      <footer className="foot">
        Some listings are paid placements. Prices & availability set by partners. © {new Date().getFullYear()} GoParti
      </footer>

      {/* Minimal CSS (no Tailwind needed) */}
      <style jsx global>{`
        body { margin: 0; background: #000; color: #fff; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
        a { color: inherit; text-decoration: none; }
        .wrap { min-height: 100vh; }
        .nav { position: sticky; top: 0; z-index: 10; display: flex; gap: 24px; align-items: center; justify-content: space-between; padding: 14px 20px; background: rgba(0,0,0,.75); backdrop-filter: blur(6px); border-bottom: 1px solid rgba(255,255,255,.08); }
        .brand { display: flex; align-items: center; gap: 10px; font-weight: 600; }
        .logo { width: 28px; height: 28px; border-radius: 10px; background: linear-gradient(135deg,#f0c,#0ff); }
        .links a { opacity: .75; margin-left: 18px; font-size: 14px; }
        .links a:hover { opacity: 1; }
        .hero { max-width: 860px; margin: 56px auto 28px; padding: 0 16px; text-align: left; }
        .hero h1 { font-size: clamp(36px, 5vw, 56px); margin: 0 0 10px; }
        .sub { opacity: .7; max-width: 620px; }
        .search { margin-top: 16px; position: relative; display: flex; gap: 8px; }
        .search input { flex: 1; padding: 16px 14px; border-radius: 14px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); color: #fff; }
        .search button { padding: 14px 16px; border-radius: 12px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); color: #fff; cursor: pointer; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .chip { padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,.25); background: transparent; color: #fff; cursor: pointer; font-size: 13px; }
        .chip.active, .chip:hover { background: #fff; color: #000; }
        .rail { max-width: 1100px; margin: 30px auto 0; padding: 0 16px; }
        .railHead { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 10px; }
        .sponsored { font-size: 11px; letter-spacing: .08em; opacity: .6; text-transform: uppercase; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 14px; }
        .card { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,.12); }
        .card img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .cardText { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 12px; background: linear-gradient(180deg,transparent 30%, rgba(0,0,0,.85)); }
        .badge { font-size: 11px; opacity: .7; }
        .title { font-weight: 600; }
        .cta { margin-left: auto; background: #fff; color: #000; border-radius: 10px; padding: 6px 10px; font-size: 13px; }
        .results { max-width: 1100px; margin: 26px auto 60px; padding: 0 16px; }
        .resultsHead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .count { opacity: .6; font-size: 14px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        .eventCard, .sponsoredCard { border: 1px solid rgba(255,255,255,.12); border-radius: 16px; overflow: hidden; background: rgba(255,255,255,.02); }
        .imgWrap img, .sponsoredCard img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .pad { padding: 14px; }
        .name { font-weight: 600; }
        .meta { opacity: .7; font-size: 14px; margin-top: 2px; }
        .btns { display: flex; gap: 8px; margin-top: 10px; }
        .ghost { background: transparent; border: 1px solid rgba(255,255,255,.25); color: #fff; padding: 8px 10px; border-radius: 10px; cursor: pointer; }
        .solid { background: #fff; color: #000; border: none; padding: 8px 10px; border-radius: 10px; cursor: pointer; }
        .sponsoredCard { position: relative; }
        .sponsoredLabel { position: absolute; top: 8px; left: 8px; font-size: 11px; padding: 4px 8px; border-radius: 10px; background: rgba(0,0,0,.55); border: 1px solid rgba(255,255,255,.2); }
        .sponsoredFooter { display: flex; align-items: center; gap: 8px; padding: 10px; }
        .foot { border-top: 1px solid rgba(255,255,255,.1); padding: 28px 16px; text-align: center; opacity: .65; font-size: 14px; }
      `}</style>
    </div>
  );
}

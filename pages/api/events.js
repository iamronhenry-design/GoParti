import data from "../../data/vegas-events.json";

// /api/events?city=Las%20Vegas&from=2025-10-18
export default function handler(req, res) {
  const { city = "Las Vegas", from } = req.query;
  const now = from ? new Date(from) : new Date();

  const events = data.filter(
    (e) =>
      (e.city || "").toLowerCase() === city.toLowerCase() &&
      new Date(e.starts_at) >= now
  );

  // Sort by soonest start time, then price
  events.sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at) || a.price_min - b.price_min);

  res.status(200).json({ city, count: events.length, events });
}

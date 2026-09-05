const names = [
  "Aarav Sharma",
  "Maya Patel",
  "Noah Williams",
  "Emma Johnson",
  "Riya Singh",
  "Liam Brown",
  "Ananya Das",
  "Oliver Wilson",
];
const companies = [
  "Northstar Labs",
  "Orbit Systems",
  "Terra Analytics",
  "Vertex AI",
  "Signal Works",
  "Blue Horizon",
];
const BASE = Array.from({ length: 120 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    name: names[i % names.length],
    email: `user${id}@example.com`,
    company: companies[i % companies.length],
    status: id % 5 === 0 ? "inactive" : "active",
    createdAt: new Date(2026, (id - 1) % 8, ((id - 1) % 27) + 1).toISOString(),
  };
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
export async function fetchRecords({
  delay = false,
  error = false,
  empty = false,
  missingFields = false,
  largeDataset = false,
} = {}) {
  await wait(delay ? 3000 : 450);
  if (error) throw new Error("The API returned a 500 Internal Server Error.");
  if (empty) return [];
  let data = largeDataset
    ? Array.from({ length: 5000 }, (_, i) => ({
        ...BASE[i % BASE.length],
        id: i + 1,
      }))
    : BASE.map((x) => ({ ...x }));
  if (missingFields)
    data = data.map((r, i) =>
      i % 7 === 0
        ? { ...r, name: null }
        : i % 11 === 0
          ? { ...r, email: null }
          : r,
    );
  return data;
}

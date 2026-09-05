export default function StatsBar({ stats }) {
  return (
    <section className="stats-grid">
      {[
        ["Total records", stats.total],
        ["Matching", stats.visible],
        ["Active", stats.active],
        ["Inactive", stats.inactive],
      ].map(([l, v]) => (
        <div className="stat-card" key={l}>
          <span>{l}</span>
          <strong>{v.toLocaleString()}</strong>
        </div>
      ))}
    </section>
  );
}

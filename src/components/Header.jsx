export default function Header({ onRefresh, refreshing }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">AX</div>
        <div>
          <strong>Atlas Console</strong>
          <span>Data quality workspace</span>
        </div>
      </div>
      <button
        className="refresh-button"
        onClick={onRefresh}
        disabled={refreshing}
      >
        {refreshing ? "Refreshing..." : "↻ Refresh data"}
      </button>
    </header>
  );
}

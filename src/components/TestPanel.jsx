export default function TestPanel({ value, onChange, onRun, loading }) {
  const tests = [
    ["delay", "Slow API", "Simulate a 3-second response"],
    ["error", "500 error", "Simulate a failed request"],
    ["empty", "Empty response", "Return zero records"],
    ["missingFields", "Missing fields", "Return null values"],
    ["largeDataset", "Large dataset", "Load 5,000 records"],
  ];
  return (
    <section className="test-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">EDGE-CASE TESTING</span>
          <h2>API failure lab</h2>
        </div>
        <button className="primary-button" onClick={onRun} disabled={loading}>
          Run selected test
        </button>
      </div>
      <div className="test-grid">
        {tests.map(([k, t, d]) => (
          <label
            className={`test-option ${value[k] ? "selected" : ""}`}
            key={k}
          >
            <input
              type="checkbox"
              checked={value[k]}
              onChange={() => onChange({ ...value, [k]: !value[k] })}
            />
            <span className="fake-check">{value[k] ? "✓" : ""}</span>
            <span>
              <strong>{t}</strong>
              <small>{d}</small>
            </span>
          </label>
        ))}
      </div>
      <p className="test-note">
        Combine tests to see how the UI behaves when multiple real-world
        conditions happen together.
      </p>
    </section>
  );
}

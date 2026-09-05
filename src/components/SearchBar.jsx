export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <span>⌕</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, email or company..."
        aria-label="Search records"
      />
      {value && (
        <button
          className="clear-search"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </label>
  );
}

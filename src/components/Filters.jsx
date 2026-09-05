export default function Filters({ value, onChange }) {
  return (
    <label className="filter-control">
      <span>Status</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All records</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </label>
  );
}

const safe = (v, f = "—") =>
  v === null || v === undefined || v === "" ? f : v;
export default function TableRow({ record }) {
  const date = record.createdAt
    ? new Date(record.createdAt).toLocaleDateString()
    : "—";
  return (
    <tr>
      <td className="id-cell">#{safe(record.id)}</td>
      <td>
        <div className="person">
          <div className="avatar">
            {String(safe(record.name, "?")).charAt(0).toUpperCase()}
          </div>
          <strong>{safe(record.name, "Unknown name")}</strong>
        </div>
      </td>
      <td>{safe(record.email, "No email")}</td>
      <td>{safe(record.company, "Unknown company")}</td>
      <td>
        <span
          className={`badge ${record.status === "active" ? "active" : "inactive"}`}
        >
          {safe(record.status, "unknown")}
        </span>
      </td>
      <td>{date}</td>
    </tr>
  );
}

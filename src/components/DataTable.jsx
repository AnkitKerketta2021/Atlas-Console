import TableRow from "./TableRow";
export default function DataTable({ records }) {
  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">API records</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <TableRow key={r.id} record={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

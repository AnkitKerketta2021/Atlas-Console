export default function LoadingState() {
  return (
    <div className="state-card" role="status">
      <div className="spinner" />
      <h2>Loading records</h2>
      <p>Waiting for the API response...</p>
    </div>
  );
}

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card" role="alert">
      <div className="state-icon">!</div>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button className="primary-button" onClick={onRetry}>
        Retry request
      </button>
    </div>
  );
}

export default function Pagination({ page, totalPages, onChange }) {
  const pages = [
    ...new Set([
      1,
      Math.max(1, page - 1),
      page,
      Math.min(totalPages, page + 1),
      totalPages,
    ]),
  ].sort((a, b) => a - b);
  return (
    <nav className="pagination" aria-label="Pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <div className="page-numbers">
        {pages.map((n, i) => {
          const gap = pages[i - 1] && n - pages[i - 1] > 1;
          return (
            <span className="page-slot" key={n}>
              {gap && <span className="gap">…</span>}
              <button
                className={n === page ? "current" : ""}
                onClick={() => onChange(n)}
                aria-current={n === page ? "page" : undefined}
              >
                {n}
              </button>
            </span>
          );
        })}
      </div>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}

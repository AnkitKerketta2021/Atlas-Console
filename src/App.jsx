import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRecords } from "./api/recordsApi";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import TestPanel from "./components/TestPanel";

const PAGE_SIZE = 10;

export default function App() {
  const [records, setRecords] = useState([]),
    [loading, setLoading] = useState(true),
    [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(""),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState("all"),
    [page, setPage] = useState(1);
  const [testMode, setTestMode] = useState({
    delay: false,
    error: false,
    empty: false,
    missingFields: false,
    largeDataset: false,
  });

  const loadRecords = useCallback(
    async ({ initial = false } = {}) => {
      setError("");
      initial ? setLoading(true) : setRefreshing(true);
      try {
        setRecords(await fetchRecords(testMode));
        setPage(1);
      } catch (e) {
        setError(e.message || "Unable to load records.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [testMode],
  );

  useEffect(() => {
    loadRecords({ initial: true });
  }, [loadRecords]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter(
      (r) =>
        (!q ||
          String(r.name ?? "")
            .toLowerCase()
            .includes(q) ||
          String(r.email ?? "")
            .toLowerCase()
            .includes(q) ||
          String(r.company ?? "")
            .toLowerCase()
            .includes(q)) &&
        (status === "all" || r.status === status),
    );
  }, [records, search, status]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRecords = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);
  const stats = useMemo(
    () => ({
      total: records.length,
      visible: filtered.length,
      active: records.filter((r) => r.status === "active").length,
      inactive: records.filter((r) => r.status === "inactive").length,
    }),
    [records, filtered],
  );

  return (
    <div className="app-shell">
      <Header onRefresh={() => loadRecords()} refreshing={refreshing} />
      <main className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">PRODUCTION READINESS LAB</span>
            <h1>API Data Explorer</h1>
            <p>
              Explore records while testing the states real production APIs can
              throw at your UI.
            </p>
          </div>
          <div className="status-pill">
            <span className={`dot ${error ? "danger" : ""}`} />
            {error ? "API issue" : "API connected"}
          </div>
        </section>
        <StatsBar stats={stats} />
        <section className="workspace">
          <div className="toolbar">
            <SearchBar
              value={search}
              onChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
            />
            <Filters
              value={status}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            />
          </div>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={() => loadRecords()} />
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <DataTable records={pageRecords} />
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </>
          )}
        </section>
        <TestPanel
          value={testMode}
          onChange={setTestMode}
          onRun={() => loadRecords()}
          loading={loading || refreshing}
        />
      </main>
    </div>
  );
}

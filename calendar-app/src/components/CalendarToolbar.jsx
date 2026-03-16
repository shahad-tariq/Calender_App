
import React from 'react';

export default function CalendarToolbar({
  search, setSearch,
  onRefresh,
  onAddSession,
  addDisabled,
  addTitle
}) {
  return (
    <div className="calendar-toolbar">
      <div className="search-wrap">
        <span className="icon">
          <svg width="13" height="13" viewBox="0 0 13 13">
            <path
              d="M12.835,12.122,9.667,8.953a5.472,5.472,0,1,0-.714.714l3.169,3.169a.5.5,0,1,0,.714-.714ZM1.01,5.465A4.455,4.455,0,1,1,5.464,9.919,4.46,4.46,0,0,1,1.01,5.465Z"
              fill="#707070"
              opacity=".63"
            />
          </svg>
        </span>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="icon-btn" type="button" title="Filters">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M3 6h18M6 12h12M10 18h4"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button className="icon-btn" type="button" title="Refresh" onClick={onRefresh}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M20 12a 8 8 0 1 1-2.34-5.66"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 4v6h-6"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button
        className="primary-btn"
        type="button"
        onClick={onAddSession}
        disabled={addDisabled}
        title={addTitle}
      >
        Add New Session
      </button>
    </div>
  );
}

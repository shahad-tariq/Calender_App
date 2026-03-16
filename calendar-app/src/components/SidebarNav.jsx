
import React from 'react';

export default function SidebarNav({ activeKey, setActiveKey, NAV, logoSrc }) {
  return (
    <aside className="sidebar">
      <div className="brand" title="Clinic">
        <img src={logoSrc} alt="logo" />
      </div>

      <nav className="nav-col">
        {NAV.map((i) => (
          <button
            key={i.key}
            type="button"
            className={`nav-item ${activeKey === i.key ? 'active' : ''}`}
            onClick={() => setActiveKey(i.key)}
            title={i.label}
            aria-label={i.label}
          >
            <span className="nav-icon">{i.icon}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="avatar">
          <span className="avatar-dot" />
        </div>
      </div>
    </aside>
  );
}

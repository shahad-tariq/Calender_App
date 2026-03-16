// src/components/DoctorResourceHeader.jsx
import React from 'react';
import slide1 from '../assets/react.svg';

export default function DoctorResourceHeader(props) {
  const rd = props?.resourceData || {};
  const { Text = '', Designation = '', Avatar } = rd;

  const initials = String(Text)
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="template-wrap">
      <div className="employee-category">
        {Avatar ? (
          <img
            className="emp-avatar"
            src={Avatar}
            alt={Text}
            onError={(e) => (e.currentTarget.src = slide1)}
          />
        ) : (
          <div className="emp-avatar placeholder">{initials || 'DR'}</div>
        )}
        <div className="emp-meta">
          <div className="employee-name">{Text}</div>
          <div className="employee-designation">{Designation}</div>
        </div>
      </div>
    </div>
  );
}

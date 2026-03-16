// src/components/AddSessionModal.jsx
import React from 'react';

function toLocalInput(d) {
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = d.getFullYear(), MM = pad(d.getMonth() + 1), DD = pad(d.getDate());
  const hh = pad(d.getHours()), mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${DD}T${hh}:${mm}`;
}

export default function AddSessionModal({
  isOpen,
  onClose,
  doctors,
  form,
  setForm,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <strong>Add Session</strong>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          <label className="field col-2">
            <span>Title</span>
            <input
              value={form.Subject}
              onChange={(e) => setForm((f) => ({ ...f, Subject: e.target.value }))}
              placeholder="Consultation / Visit…"
            />
          </label>

          <label className="field">
            <span>Patient</span>
            <input
              value={form.Patient}
              onChange={(e) => setForm((f) => ({ ...f, Patient: e.target.value }))}
            />
          </label>

          <label className="field">
            <span>Doctor</span>
            <select
              value={form.EmployeeId ?? doctors[0]?.Id ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, EmployeeId: Number(e.target.value) }))}
            >
              {doctors.map((d) => (
                <option key={d.Id} value={d.Id}>{d.Text}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Status</span>
            <select
              value={form.Status}
              onChange={(e) => setForm((f) => ({ ...f, Status: e.target.value }))}
            >
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Canceled</option>
              <option>No-Show</option>
            </select>
          </label>

          <label className="field">
            <span>Start</span>
            <input
              type="datetime-local"
              value={toLocalInput(new Date(form.StartTime))}
              onChange={(e) => setForm((f) => ({ ...f, StartTime: new Date(e.target.value) }))}
            />
          </label>

          <label className="field">
            <span>End</span>
            <input
              type="datetime-local"
              value={toLocalInput(new Date(form.EndTime))}
              onChange={(e) => setForm((f) => ({ ...f, EndTime: new Date(e.target.value) }))}
            />
          </label>
        </div>

        <div className="modal-footer">
          <button className="icon-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={onSave} disabled={!doctors.length}>Save</button>
        </div>
      </div>
    </div>
  );
}

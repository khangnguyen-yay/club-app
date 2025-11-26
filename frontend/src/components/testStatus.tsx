import React, { useState } from 'react';

// Simple test component to exercise the backend:
// - POST /api/user/statuses to add or update a user's club status
// Assumes you are already logged in via Google OAuth so the browser has the session cookie.

const TestStatus: React.FC = () => {
  const [clubId, setClubId] = useState<number>(0);
  const [status, setStatus] = useState<string>('none');
  const [result, setResult] = useState<string>('');
  const [listStatus, setListStatus] = useState<string>('none');
  type ClubRow = { clubID?: number; club_name?: string; type?: string; preference?: string; [key: string]: unknown };
  const [clubs, setClubs] = useState<ClubRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function postStatus() {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('http://localhost:3000/api/user/statuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // send session cookie
        body: JSON.stringify({ clubId, preference: status })
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(`Error ${res.status}: ${data?.error || 'Request failed'}`);
      } else {
        setResult(JSON.stringify(data));
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setResult(`Network error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  async function fetchClubsByStatus() {
    setLoading(true);
    setResult('');
    setClubs([]);
    try {
      const res = await fetch(`http://localhost:3000/api/user/clubs?status=${encodeURIComponent(listStatus)}` , {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(`Error ${res.status}: ${data?.error || 'Request failed'}`);
      } else {
        setClubs(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setResult(`Network error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Test: Add/Update Club Status</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>
          Club ID:
          <input
            type="number"
            value={clubId}
            onChange={e => setClubId(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="applied">applied</option>
            <option value="applying">applying</option>
            <option value="considering">considering</option>
            <option value="none">none</option>
          </select>
        </label>
        <button onClick={postStatus} disabled={loading || !clubId}>
          {loading ? 'Submitting…' : 'Add/Update Status'}
        </button>
      </div>
      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        {result && (<>
          <strong>Result:</strong>
          <div>{result}</div>
        </>)}
      </div>
      <hr style={{ margin: '16px 0' }} />
      <h3>View Clubs By Status</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>
          Status:
          <select value={listStatus} onChange={e => setListStatus(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="applied">applied</option>
            <option value="applying">applying</option>
            <option value="considering">considering</option>
            <option value="none">none</option>
          </select>
        </label>
        <button onClick={fetchClubsByStatus} disabled={loading}>
          {loading ? 'Loading…' : 'Fetch Clubs'}
        </button>
      </div>
      {!!clubs.length && (
        <div>
          <strong>Clubs:</strong>
          <ul>
            {clubs.map((c, idx) => {
              const altName = (c as Record<string, unknown>)['name'];
              const altNameStr = typeof altName === 'string' ? altName : undefined;
              const label = (typeof c.club_name === 'string' && c.club_name)
                || altNameStr
                || (typeof c.clubID === 'number' ? `Club ${c.clubID}` : 'Club');
              const statusText = typeof c.preference === 'string' ? c.preference : '';
              const idText = typeof c.clubID === 'number' ? `#${c.clubID}` : '';
              return (
                <li key={idx}>{`${label} ${idText} — status: ${statusText}`}</li>
              );
            })}
          </ul>
        </div>
      )}
      <p style={{ color: '#666' }}>
        Note: You must be logged in (Google OAuth) so your browser has the session cookie.
      </p>
    </div>
  );
};

export default TestStatus;
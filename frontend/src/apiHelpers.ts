 export async function postStatus(clubID : string, status : string) {
    try {
      const res = await fetch('http://localhost:3000/api/user/statuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // send session cookie
        body: JSON.stringify({ clubId : clubID, preference: status })
      });
      const data = await res.json();
      if (!res.ok) {
        return `Error ${res.status}: ${data?.error || 'Request failed'}`;
      } else {
        return data;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return `Network error: ${msg}`;
    }
  }

  export async function fetchClubsByStatus(status : string) {
    try {
      const res = await fetch(`http://localhost:3000/api/user/clubs?status=${encodeURIComponent(status)}` , {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        return `Error ${res.status}: ${data?.error || 'Request failed'}`;
      } else {
        return Array.isArray(data) ? data : [];
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return `Network error: ${msg}`;
    }
  }

  export async function fetchClubsWithStatus() {
    try {
      const res = await fetch(`http://localhost:3000/api/user/clubs` , {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        return `Error ${res.status}: ${data?.error || 'Request failed'}`;
      } else {
        return Array.isArray(data) ? data : [];
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return `Network error: ${msg}`;
  }
  }
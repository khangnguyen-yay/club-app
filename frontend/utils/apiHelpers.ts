//API HELPER METHODS FOR POST/GET REQUESTS

//Purpose: Abstract retrieving club information from the backend/posting club information to the backend
//Used for cards in Home/Explore page
 
 //For given club ID and status, update club in backend to store the new status
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

  //For given status, return all clubs that are currently under that status
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

//Return all clubs in database, including the status/preference field
  export async function fetchClubsWithStatus() {
    try {
      const res = await fetch(`http://localhost:3000/api/user/clubsWithStatus` , {
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
  
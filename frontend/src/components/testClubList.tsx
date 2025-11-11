import React, { useEffect, useState } from "react";

// Define the Club type
interface Club {
  name: string;
  type: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  notes?: string;
}

export default function ClubList() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from backend
    fetch("http://localhost:3000/api/clubs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clubs");
        return res.json();
      })
      .then((data: Club[]) => {
        setClubs(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading clubs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Clubs</h2>
      <div style={styles.list}>
        {clubs.map((club, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.clubName}>{club.name}</h3>
            <p><strong>Type:</strong> {club.type}</p>
            {club.website && (
              <p>
                🌐 <a href={club.website} target="_blank" rel="noreferrer">{club.website}</a>
              </p>
            )}
            {club.instagram && (
              <p>
                📸 <a href={club.instagram} target="_blank" rel="noreferrer">{club.instagram}</a>
              </p>
            )}
            {club.facebook && (
              <p>
                👍 <a href={club.facebook} target="_blank" rel="noreferrer">{club.facebook}</a>
              </p>
            )}
            {club.notes && <p>{club.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    background: "white",
  },
  clubName: {
    marginBottom: "8px",
  },
};

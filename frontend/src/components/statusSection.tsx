import { fetchClubsByStatus } from "../../utils/apiHelpers";
import { useState, useEffect } from "react";
import type { Club } from '../appCard/CardList.tsx';

export default function useStatusSections() {
  const [applyingClubs, setApplyingClubs] = useState<Club[]>([]);
  const [appliedClubs, setAppliedClubs] = useState<Club[]>([]);
  const [considerClubs, setConsiderClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchClubs() {

        const applyingClubs = await getClubsByStatus("applying");
        setApplyingClubs(applyingClubs);

        const appliedClubs = await getClubsByStatus("applied");
        setAppliedClubs(appliedClubs);

        const considerClubs = await getClubsByStatus("considering");
        setConsiderClubs(considerClubs);
        
        setLoading(false);
      }
      fetchClubs();
    }, []);

  return { loading, applyingClubs, appliedClubs, considerClubs }
}

async function getClubsByStatus(status : string) {
    try {
      let res = await fetchClubsByStatus(status);
        const clubs = await res;
        if (typeof clubs == "string") {
          return [];
        }
        const clubsWithStatus = clubs.map(club => ({
          ...club,
          preference: status
        }))
        return clubsWithStatus;
      } catch (err) {
        console.error(err);
        return [];
      }
    }
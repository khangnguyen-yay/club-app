import { fetchClubsByStatus } from "../../utils/apiHelpers";
import { useState, useEffect } from "react";
import type { Club } from '../appCard/CardList.tsx';

//Provides Home Page with lists of applying, applied, and considering clubs
export default function useStatusSections() {

  const [applyingClubs, setApplyingClubs] = useState<Club[]>([]);
  const [appliedClubs, setAppliedClubs] = useState<Club[]>([]);
  const [considerClubs, setConsiderClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchClubs() {
        try {
            const applyingClubs = await getClubsByStatus("applying");
            setApplyingClubs(applyingClubs);

            const appliedClubs = await getClubsByStatus("applied");
            setAppliedClubs(appliedClubs);

            const considerClubs = await getClubsByStatus("considering");
            setConsiderClubs(considerClubs);
        }
        finally {
            setLoading(false);
        }
      }
      fetchClubs();
    }, []);

  return { loading, applyingClubs, appliedClubs, considerClubs }
}

async function getClubsByStatus(status : string) {
    
    if (!isValidStatus(status)) {
        console.error(`Invalid status ${status}`);
        return [];
    }

    const clubs = await fetchClubsByStatus(status);

    if (typeof clubs === "string") { //Since backend returns string if there is error (ex. 401 unauthorized)
        console.error('Error fetching clubs');  
        return [];
    }

    const clubsWithStatus = clubs.map(club => ({
      ...club,
      preference: status //Home page (which uses this code) relies on preference field to display correct status button toggle state
    }))

    return clubsWithStatus;
  }

function isValidStatus(status : string) {
    if (status == "applied" || status == "applying" || status == "considering")
        return true;
    else 
        return false;
}
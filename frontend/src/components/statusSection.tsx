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

//Given a status (applied/applying/considering), return an array of Clubs categorized under that status 
async function getClubsByStatus(status : string) {
    
    if (!isValidStatus(status)) {
        console.error(`Invalid status ${status}`);
        return [];
    }

    const clubs = await fetchClubsByStatus(status);

    if (typeof clubs === "string") { //Exit early if API returns an error message (ex. 401 unauthorized)
        console.error('Error fetching clubs');  
        return [];
    }

    //Append preference field to each club, which will be necessary for cards on Home page
    //to display correct status button toggle states
    const clubsWithStatus = clubs.map(club => ({
      ...club,
      preference: status
    }))

    return clubsWithStatus;
  }

//Verifies a string is one of the statuses recognized by the backend API
//In order to avoid querying the backend with unsupported statuses
function isValidStatus(status : string) {
    if (status == "applied" || status == "applying" || status == "considering")
        return true;
    else 
        return false;
}
import '../styles/Home.css';
import useStatusSections from "../components/statusSection.tsx" 
import ClubList from '../appCard/CardList.tsx';

//Display club cards in sections grouped by status (applied/applying/consider)
function Home() {

//Retrieve lists of clubs corresponding to each status
const { loading, applyingClubs, appliedClubs, considerClubs } = useStatusSections();

if (loading) return <div>Loading...</div>;

  return (
    <div className="homeContainer">
      <h1 className="heading">Home</h1>

      <div className="appliedSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applied</h2>
          <span className="countBox">{appliedClubs.length}</span> {/* Display category count */}
        </div>
        <ClubList filteredCards={appliedClubs}></ClubList> {/* Display list of clubs for Applied section in ClubList format */}
      </div>

      <div className="applyingSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applying</h2>
          <span className="countBox">{applyingClubs.length}</span>
        </div>
        <ClubList filteredCards={applyingClubs}></ClubList>
      </div>

      <div className="considerSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Considering</h2>
          <span className="countBox">{considerClubs.length}</span>
        </div>
        <ClubList filteredCards={considerClubs}></ClubList>
      </div>
    </div>
  );
}

export default Home;
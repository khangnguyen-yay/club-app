import "./Card.css"
import membersSymbol from './CardImages/members.svg'
//import calendarSymbol from './CardImages/calendar.svg'
//import locationSymbol from './CardImages/location.svg'
import instagramSymbol from './CardImages/instagram.svg'
import websiteSymbol from './CardImages/website.svg'

type CardProps = {
  name : string
  category : string
  description: string
  numMembers : number
  website : string
  instagram : string
  filters : string[]
}

//Card component displaying club stuff
//(no need to implement statuses yet just UI
//place holder buttons for the different statuses)

//later: add assertions about width/contents of each parameter before displaying it (ex. isn't too long, etc)
export function Card({name, category, description, numMembers, website, instagram, filters} : CardProps) {
  const instagramHandle = extractInstagramHandle(instagram)
  return (
      <div className="box">
        <h1 className="clubName">{name}</h1>
        <h2 className="category">{category}</h2>
        <div className="descriptionLines description">{description}</div>
  
        <div className="descriptionLines">
          <img className="symbol" src={membersSymbol}></img>
          <div className="line">{numMembers} members</div>
        </div>
  
        <div className="descriptionLines">
          <img className="symbol" src={websiteSymbol}></img>
          <a className="line" href={website}>{website}</a>
        </div>
  
        <div className="descriptionLines">
          <img className="symbol" src={instagramSymbol}></img>
          <a className="line" href={instagram}>{instagramHandle}</a>
        </div>

        <div className="filtersContainer">
          {filters.map((filter) => (
            <div className="filterBox">
              <div className="filterText"> {filter} </div>
            </div>
          ))}
        </div>

        <div className="addToTracker">Add to tracker:</div>
        <div className="buttonBox">
          <button className="statusButton considerButton">Consider</button>
          <button className="statusButton applyingButton">Applying</button>
          <button className="statusButton appliedButton">Applied</button>
        </div>
      </div>
    )
}

  //This function extracts an Instagram handle from an Instagram link,
  //so that the card component can display the handle instead of the link
  //https://www.instagram.com/ucladanceteam/ -> ucladanceteam
  function extractInstagramHandle(instagram : string) : (string | null) {
    console.log(instagram)
    //(match returns an array with the capture groups)
    const match : (RegExpMatchArray | null) = instagram.match(/(instagram\.com\/)([A-Za-z]+)/)
    console.log(match)
    const handle : (string | null) = match == null ? null : "@" + match[2]
    console.log(handle)
    return handle

  }
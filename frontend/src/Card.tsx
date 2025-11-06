import membersSymbol from './assets/members.svg'
import calendarSymbol from './assets/calendar.svg'
import locationSymbol from './assets/location.svg'
import "./Card.css"

type CardProps = {
  name : string
  category : string
  description: string
  numMembers : number
  meetingTime : string
  location : string
  filters : string[]
}

//Card component displaying club stuff
//(no need to implement statuses yet just UI
//place holder buttons for the different statuses)

//later: add assertions about width/contents of each parameter before displaying it (ex. isn't too long, etc)
export function Card({name, category, description, numMembers, meetingTime, location, filters} : CardProps) {
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
            <img className="symbol" src={calendarSymbol}></img>
            <div className="line">{meetingTime}</div>
          </div>
    
          <div className="descriptionLines">
            <img className="symbol" src={locationSymbol}></img>
            <div className="line">{location}</div>
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
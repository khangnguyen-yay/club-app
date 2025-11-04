import membersSymbol from './assets/members.svg'
import calendarSymbol from './assets/calendar.svg'
import locationSymbol from './assets/location.svg'
import "./Card.css"

//Card component displaying club stuff
//(no need to implement statuses yet just UI
//place holder buttons for the different statuses)
export function Card() {
    return (
        <div className="box">
          <h1 className="clubName">Robotics Club</h1>
          <h2 className="category">Technology</h2>
          <div className="descriptionLines description">Build and program robots for competitions and projects</div>
    
          <div className="descriptionLines">
            <img className="symbol" src={membersSymbol}></img>
            <div className="line">45 members</div>
          </div>
    
          <div className="descriptionLines">
            <img className="symbol" src={calendarSymbol}></img>
            <div className="line">Wednesdays 6-8 PM</div>
          </div>
    
          <div className="descriptionLines">
            <img className="symbol" src={locationSymbol}></img>
            <div className="line">Engineering Building Room 201</div>
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
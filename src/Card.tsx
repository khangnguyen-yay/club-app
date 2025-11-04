//Card component displaying club stuff
//(no need to implement statuses yet just UI
//place holder buttons for the different statuses)
export function Card() {
    return (
      <div className="box">
        <h1 className="clubName">Robotics Club</h1>
        <h2 className="category">Technology</h2>
        <div className="description">Build and program robots for competitions and projects</div>
        <div className="line">45 members</div>
        <div className="line">Wednesdays 6-8 PM</div>
        <div className="line">Engineering Building Room 201</div>
        <div className="addToTracker">Add to tracker:</div>
        <div className="buttonBox">
          <button className="statusButton">Consider</button>
          <button className="statusButton">Applying</button>
          <button className="statusButton">Applied</button>
        </div>
      </div>
    )
  }
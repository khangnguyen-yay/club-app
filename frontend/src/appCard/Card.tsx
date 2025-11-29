import "./Card.css"
import membersSymbol from './CardImages/members.svg'
//import calendarSymbol from './CardImages/calendar.svg'
//import locationSymbol from './CardImages/location.svg'
import instagramSymbol from './CardImages/instagram.svg'
import websiteSymbol from './CardImages/website.svg'
import { useState } from 'react'

type CardProps = {
  name : string
  type : string
  notes: string
  website? : string
  instagram? : string
  filters? : string[]
}

//const [clicked, setClicked]

//Card component displaying club stuff
//(no need to implement statuses yet just UI
//place holder buttons for the different statuses)

//later: add assertions about width/contents of each parameter before displaying it (ex. isn't too long, etc)
export function Card({name, type, notes, website, instagram, filters} : CardProps) {
  const [clickedOrange, setClickedOrange] = useState(false);
  const [clickedBlue, setClickedBlue] = useState(false);
  const [clickedGreen, setClickedGreen] = useState(false);

  function handleClickOrange() {
    setClickedOrange(true);
  }

  function handleClickBlue() {
    setClickedBlue(true);
  }

  function handleClickGreen() {
    setClickedGreen(true);
  }

  const classNameOrange = ["statusButton", 
  clickedOrange ? "applyingButtonClicked" : "applyingButton"
  ].join(' ');

  const classNameBlue = ["statusButton", 
  clickedBlue ? "considerButtonClicked" : "considerButton"
  ].join(' ')

  const classNameGreen = ["statusButton", 
    clickedGreen ? "appliedButtonClicked" : "appliedButton"
    ].join(' ')

  const instagramHandle = extractInstagramHandle(instagram || '')
  return (
      <div className="club-card" data-testid="club-card">
        <h1 className="clubName">{name}</h1>
        <h2 className="category">{type}</h2>
        <div className="descriptionLines description">{notes}</div>
  
        <div className="descriptionLines">
          <img className="symbol" src={membersSymbol}></img>
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
          {filters && filters.map((filter) => (
            <div className="filterBox">
              <div className="filterText"> {filter} </div>
            </div>
          ))}
        </div>

        <div className="addToTracker">Add to tracker:</div>
        <div className="buttonBox">
          <button className={classNameBlue} onClick={handleClickBlue}>Consider</button>
          <button className={classNameOrange} onClick={handleClickOrange}>Applying</button>
          <button className={classNameGreen} onClick={handleClickGreen}>Applied</button>
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
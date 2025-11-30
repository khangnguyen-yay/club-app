import "./Card.css"
import membersSymbol from './CardImages/members.svg'
//import calendarSymbol from './CardImages/calendar.svg'
//import locationSymbol from './CardImages/location.svg'
import instagramSymbol from './CardImages/instagram.svg'
import websiteSymbol from './CardImages/website.svg'
import { useState } from 'react'
import { postStatus } from "../apiHelpers.ts"

type CardProps = {
  name : string
  type : string
  notes: string
  website? : string
  instagram? : string
  filters? : string[]
}

//later: add assertions about width/contents of each parameter before displaying it (ex. isn't too long, etc)
export function Card({name, type, notes, website, instagram, filters} : CardProps) {

  const [clicked, setClicked] = useState({
    consider: false,
    applying: false,
    applied: false,
  });

  function handleClick(label : string) {
    //setClicked lets you pass in a function that also returns a struct instead of a struct
    //React will pass in the current state
    setClicked((prev) => 
      {
        const labelSelected = !prev[label as keyof typeof prev];

        if (labelSelected) {
          postStatus("1", "applying");
        }
        else {
          postStatus("1", "none");
        }

        return  {...prev, [label] : !prev[label as keyof typeof prev]};
        
      }
    ); //second part of struct overwrites current state

  }

  const classNameConsider = ["statusButton", 
  clicked.consider ? "considerButtonClicked" : "considerButton"].join(' ')

  const classNameApplying = ["statusButton", 
    clicked.applying ? "applyingButtonClicked" : "applyingButton"].join(' ');

  const classNameApplied = ["statusButton", 
  clicked.applied ? "appliedButtonClicked" : "appliedButton"].join(' ')

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
          <button className={classNameConsider} onClick={() => handleClick("consider")}>Consider</button>
          <button className={classNameApplying} onClick={() => handleClick("applying")}>Applying</button>
          <button className={classNameApplied} onClick={() => handleClick("applied")}>Applied</button>
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
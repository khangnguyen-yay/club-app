import "./Card.css"
import instagramSymbol from './CardImages/instagram.svg';
import websiteSymbol from './CardImages/website.svg';
import { useState } from 'react';
import { postStatus } from "../../utils/apiHelpers.ts";


type CardProps = {
  id : string
  name : string
  type : string
  notes: string
  website? : string
  instagram? : string
  filters? : string[]
  preference : string
  test : string
}

//later: add assertions about width/contents of each parameter before displaying it (ex. isn't too long, etc)
export function Card({id, name, type, notes, website, instagram, filters, preference, test} : CardProps) {

  const [selected, setSelected] = useState({
    considering: (preference === "considering"),
    applying: (preference === "applying"),
    applied: (preference === "applied")
  });

  function handleClick(label : string) {
    //setClicked lets you pass in a function that also returns a struct instead of a struct
    //React will pass in the current state
    let labelSelected = !selected[label as keyof typeof selected];
    if (labelSelected) {
      postStatus(id, label);
    }
    else {
      postStatus(id, "none");
    }

    setSelected((prev) => 
      {
        const newState = { ...prev, [label]: labelSelected }; //second part of struct overwrites current state
        return  newState;
      }
    );
  }

  const classNameConsider = ["statusButton", 
  selected.considering ? "considerButtonClicked" : "considerButton"].join(' ')

  const classNameApplying = ["statusButton", 
    selected.applying ? "applyingButtonClicked" : "applyingButton"].join(' ');

  const classNameApplied = ["statusButton", 
  selected.applied ? "appliedButtonClicked" : "appliedButton"].join(' ')

  const instagramHandle = extractInstagramHandle(instagram || '')
  return (
      <div className="club-card" data-testid="club-card">
        <h1 className="clubName">{name}</h1>
        <h2 className="category">{type}</h2>
        <div className="descriptionLines description">{notes}</div>


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
          <button className={classNameConsider} onClick={() => handleClick("considering")}>Consider</button>
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
    //(match returns an array with the capture groups)
    const match : (RegExpMatchArray | null) = instagram.match(/(instagram\.com\/)([A-Za-z]+)/)
    const handle : (string | null) = match == null ? null : "@" + match[2]
    return handle;
  }
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
}

export function Card({id, name, type, notes, website, instagram, filters, preference} : CardProps) {

  const [selected, setSelected] = useState({
    considering: (preference === "considering"),
    applying: (preference === "applying"),
    applied: (preference === "applied")
  });

  function handleClick(label : string) {
    //Button changes to selected if originally unselected
    //Button changes to unselected if originally selected
    let labelSelected = !selected[label as keyof typeof selected];

    //Update backend with new status for the club
    if (labelSelected) {
      postStatus(id, label);
    }
    else {
      postStatus(id, "none");
    }

    //Update frontend to reflect new button state
    setSelected((prev) => 
      {
        const newState = { ...prev, [label]: labelSelected };
        return  newState;
      }
    );
  }

  //Determine CSS classes depending on button status
  //Since selected/unselected buttons use different CSS styling
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

  //Extracts an Instagram handle from an Instagram link,
  //So that the card component can display the handle instead of the link
  //Ex. https://www.instagram.com/ucladanceteam/ -> ucladanceteam
  function extractInstagramHandle(instagram : string) : (string | null) {
    //(match returns an array with the capture groups)
    const match : (RegExpMatchArray | null) = instagram.match(/(instagram\.com\/)([A-Za-z]+)/)
    const handle : (string | null) = match == null ? null : "@" + match[2]
    return handle;
  }
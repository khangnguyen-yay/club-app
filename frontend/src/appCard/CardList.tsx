import React from "react";
import { Card } from './Card.tsx'
import './CardList.css'

/*SAMPLE
{
    "id": 1,
    "name": "UCLA Dance Team",
    "category": "Performing Arts",
    "description": "Join the UCLA Dance Team to showcase your moves and perform at campus events.",
    "website": "https://ucla.edu/danceteam",
    "instagram": "https://instagram.com/ucladanceteam"
}
*/

export interface Club {
  id : string;
  club_name: string;
  type: string;
  fb?: string;
  ig?: string;
  website?: string;
  notes: string;
  preference: string;
  test : string;
}

interface CardListProps {
  filteredCards: Club[]
}

export default function ClubList({filteredCards}: CardListProps) {
    return (
      <div className="cardGrid">
        {filteredCards.map((club) => (
                <Card id={club.id} name={club.club_name} type={club.type} notes={club.notes} website={club.website} instagram={club.ig} preference={club.preference} test={club.test}></Card>
        ))}
      </div>
    )
    

}
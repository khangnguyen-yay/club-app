import React from "react"
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
type CardProps = {
  name: string
  category: string
  description: string
  numMembers: number
  website: string
  instagram: string
  filters: string[]
}

type Club = Omit<CardProps, "numMembers" | "filters"> & { id: number }

interface CardListProps {
  filteredCards: Club[]
}


export function CardList({filteredCards}: CardListProps) {
    return (
      <div className="cardGrid">
        {filteredCards.map((club) => (
                <Card name={club.name} category={club.category} description={club.description} numMembers={12} website={club.website} instagram={club.instagram} filters={["temp filter 1", "temp filter2"]}></Card>
        ))}
      </div>
    )
    
}
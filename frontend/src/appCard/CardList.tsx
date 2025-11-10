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

let clubs = [
    {
      "id": 1,
      "name": "UCLA Dance Team",
      "category": "Performing Arts",
      "description": "Join the UCLA Dance Team to showcase your moves and perform at campus events.",
      "website": "https://ucla.edu/danceteam",
      "instagram": "https://instagram.com/ucladanceteam"
    },
    {
      "id": 2,
      "name": "UCLA Robotics Club",
      "category": "STEM",
      "description": "Hands-on robotics projects and competitions for students interested in engineering and AI.",
      "website": "https://ucla.edu/robotics",
      "instagram": "https://instagram.com/uclarobotics"
    },
    {
      "id": 3,
      "name": "UCLA Photography Society",
      "category": "Arts & Media",
      "description": "Capture the world through your lens and join fellow photographers in workshops and events.",
      "website": "https://ucla.edu/photography",
      "instagram": "https://instagram.com/uclaphotography"
    },
    {
      "id": 4,
      "name": "UCLA Environmental Club",
      "category": "Community Service",
      "description": "Promoting sustainability and organizing environmental initiatives on campus.",
      "website": "https://ucla.edu/envclub",
      "instagram": "https://instagram.com/uclaenvclub"
    },
    {
      "id": 5,
      "name": "UCLA Debate Society",
      "category": "Academic",
      "description": "Practice public speaking, argumentation, and participate in competitive debates.",
      "website": "https://ucla.edu/debate",
      "instagram": "https://instagram.com/ucladebate"
}]

export function CardList() {
    return (
      <div className="cardGrid">
        {clubs.map((club) => (
                <Card name={club.name} category={club.category} description={club.description} numMembers={12} website={club.website} instagram={club.instagram} filters={["temp filter 1", "temp filter2"]}></Card>
        ))}
      </div>
    )
    return (
    <ul>
        {clubs.map((club) => (
            <li key={club.id}>
                <Card name={club.name} category={club.category} description={club.description} numMembers={12} website={club.website} instagram={club.instagram} filters={["temp filter 1", "temp filter2"]}></Card>
            </li>
        ))}
    </ul>
    )
}
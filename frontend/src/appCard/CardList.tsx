import { Card } from './Card.tsx'
import './CardList.css'

/*SAMPLE
{
    "id": 1,
    "club_name": "Pilipinos In Engineering and Science",
    "type": "Academic",
    "ig": "https://www.instagram.com/pierrethepiebear/",
    "website": "https://piesucla.wixsite.com/pies"
    "notes": "",
    preference: "none",
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
}

interface CardListProps {
  filteredCards: Club[]
}

//Displays each club in filteredCards as a Card component in a grid format
export default function CardList({filteredCards}: CardListProps) {
    return (
      <div className="cardGrid">
        {filteredCards.map((club) => (
                <Card id={club.id} name={club.club_name} type={club.type} notes={club.notes} website={club.website} instagram={club.ig} preference={club.preference}></Card>
        ))}
      </div>
    )
}
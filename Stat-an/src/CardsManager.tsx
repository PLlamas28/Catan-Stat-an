import React, {useState} from 'react';
import Card from './Card';
import './CardsManager.css';

const CardsManager: React.FC = () => {
    const [cards, setCards] = useState<number[]>([1, 2]);
  
    const addCard = () => {
      const newCardId = cards.length > 0 ? Math.max(...cards) + 1 : 1;
      setCards([...cards, newCardId]);
    };
  
    const deleteCard = (id: number) => {
      setCards(cards.filter((cardId) => cardId !== id));
    };
  
    return (
      <div className='CM-wrapper' id='mainincm'>
        <section className='mainDiv' >
          {cards.map((id) => (
            <Card key={id} id={id} initialName='Sample Name' onDelete={() => deleteCard(id)} />
          ))}

          
          {/* <Card key={1} id={1} initialName='Sample Name' onDelete={() => deleteCard(1)}/>
          <Card key={2} id={2} initialName='Sample Name' onDelete={() => deleteCard(2)}/>
          <Card key={3} id={3} initialName='Sample Name' onDelete={() => deleteCard(3)}/> */}

        </section>
      {(cards.length < 6) ?<button onClick={addCard} >Add Card</button>:null}
      </div>
      
      
    );
};  

export default CardsManager;
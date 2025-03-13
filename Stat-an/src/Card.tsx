import React, { useState, useEffect } from 'react';
import NumTable from './NumTable';
import DropdownMenu from './DropDownMenu';
import './Card.css'

// Define an interface for the Card component props
interface CardProps {
    initialName: string;
    onDelete: () => void;
    id: number;
    latestRoll: number;
    triggerRoll: boolean;
}

const Card: React.FC<CardProps> = ({ initialName, id, onDelete, latestRoll, triggerRoll}) => {
  const [name, setName] = useState(initialName);
  const [ptsState, setPtsState] = useState(2);
  const [housesState, setHousesState] = useState(2);
  const [citiesState, setCitiesState] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('')

  

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<any>) => {
    setName(e.target.value);
    console.log("name changed")
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
        setIsEditing(false);
    }
    console.log("enter pressed")

    /* let elem = document.getElementById('1')!;
    let elemWidth = window.getComputedStyle(elem).getPropertyValue("width");
    console.log("Card 1 "+elemWidth);

    let appVar = document.getElementById('appy')!
    let appVarWidth = window.getComputedStyle(appVar).getPropertyValue("width");
    console.log("App width "+appVarWidth);

    let innercmdivVar = document.getElementById('mainincm')!
    let innercmdivVarWidth = window.getComputedStyle(innercmdivVar).getPropertyValue("width");
    console.log("inner cmdivVar width "+ innercmdivVarWidth); */


  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  const updateCount = (setter: React.Dispatch<React.SetStateAction<number>>, change: number) => {
    setter((prevCount) => prevCount + change);
  };

  useEffect(() => {
    setTextColor(backgroundColor == "white" ? "black":"white");
  },[backgroundColor])

  useEffect(() => {
    setPtsState(housesState + 2 * citiesState);
  }, [housesState, citiesState]);

  const headerData: string[] = ["Number", "Frequency"];
  
  const initialData: string[][] = [
    ['', ''],
    ['', ''],
  ];


  return (
    <div className="Card" style={{backgroundColor:backgroundColor, color:textColor}} id={id.toString()}>

      {isEditing ? (

        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          onBlur={handleNameBlur}
          autoFocus
        />

      ) : (
        <h3 onClick={handleNameClick} style={{ cursor: 'pointer' }}>{name}</h3>
      )}
      
      <DropdownMenu onColorChange={setBackgroundColor} />

      <br></br>

      <button onClick={onDelete}>Delete Card</button>

      <p>Points: {ptsState}</p>

      <button onClick={() => updateCount(setHousesState,-1)} disabled = {housesState == 0}>-</button>
      <span>Houses: {housesState}</span>
      <button onClick={() => updateCount(setHousesState,1)} disabled = {housesState == 5}>+</button>

      <br></br>

      <button onClick={() => updateCount(setCitiesState,-1)} disabled = {citiesState == 0}>-</button>
      <span>Cities: {citiesState}</span>
      <button onClick={() => updateCount(setCitiesState,1)} disabled = {citiesState == 4}>+</button>
      
      <div className="numTable">
        <NumTable data={initialData} headers={headerData} latestRoll={latestRoll} triggerRoll={triggerRoll}/>
      </div>

      
    </div>

  );

};

export default Card;
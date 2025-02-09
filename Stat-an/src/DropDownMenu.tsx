import React from 'react';

// Dropdown menu component
const DropdownMenu: React.FC<{ onColorChange: (color: string) => void }> = ({ onColorChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onColorChange(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select Color</option>
      <option value="#b83931">Red</option>
      <option value="#D78938">Orange</option>
      <option value="white">White</option>
      <option value="#458cdc">Blue</option>
      <option value="#127b12">Green</option>
      <option value="#492a0a">Brown</option>

    </select>
  );
};

export default DropdownMenu;

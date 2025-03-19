import React, { useState } from 'react';
import VisionBoardItem from '../components/VisionBoardItem.jsx';

const VisionBoard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Handle adding new items
  const addItem = () => {
    setItems([...items, newItem]);
    setNewItem(""); // Clear input field
  };

  return (
    <div className="vision-board-container">
      <h2>Your Vision Board</h2>

      <div className="vision-board">
        {items.map((item, index) => (
          <VisionBoardItem key={index} content={item} />
        ))}
      </div>

      <div className="add-item">
        <input
          type="text"
          placeholder="Add a vision item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

export default VisionBoard;

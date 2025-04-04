import React, { useState, useEffect } from 'react';
import VisionBoardItem from '../components/VisionBoardItem.jsx';
import '../css/VisionBoard.css';
import axios from 'axios';

const VisionBoard = () => {
    const [items, setItems] = useState([]);
    const [newItemText, setNewItemText] = useState("");

    // Fetch existing items from the backend when the component mounts
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:7777/api/visionboard');
          console.log('Fetched items:', response.data);
          setItems(response.data);  // Assuming setItems is your state updater
        } catch (error) {
          console.error('Error fetching vision board items:', error);
        }
      };
    
      fetchData();
    }, []);
    // Handle adding new items
    const addItem = () => {
      const newItem = {
        text: newItemText,
        image: null,
        position: { x: 50, y: 50 },
        size: { width: 250, height: 200 },
      };

      axios
        .post('http://localhost:7777/api/visionboard', newItem, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          console.log('Response from backend:', response.data);
          setItems((prevItems) => [...prevItems, response.data]);
        })
        .catch((error) => {
          console.error('Error in POST request:', error);
        });
    };

    // Handle updating an item
    const handleUpdate = (id, updatedItem) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? updatedItem : item))
      );
    };

    return (
      <div className="vision-board-container">
        <h2>Your Vision Board</h2>

        <div className="vision-board">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <VisionBoardItem key={item._id} id={item._id} content={item} onUpdate={handleUpdate} />
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>

        <div className="add-item">
          <input
            type="text"
            placeholder="Add a vision item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
      </div>
    );
};

export default VisionBoard;

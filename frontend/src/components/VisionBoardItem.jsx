import React, { useState } from 'react';
import { Rnd } from "react-rnd";
import axios from 'axios';
import '../css/VisionBoard.css';


const VisionBoardItem = ({ id, content, onUpdate }) => {
  const [note, setNote] = useState(content?.text || '');
  const [image, setImage] = useState(content?.image || null);
  const [position, setPosition] = useState(content?.position || { x: 50, y: 50 });
  const [size, setSize] = useState(content?.size || { width: 250, height: 200 });

  // Handle text change
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // Handle image upload and send to backend
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await axios.post("https://journalapp-ab7i.onrender.com/api/visionboard/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const imagePath = response.data.filePath; // ✅ Get the uploaded image URL
      setImage(imagePath); // ✅ Update state with Cloudinary image URL
  
      // ✅ Save the updated vision board item
      const updatedItem = { ...content, image: imagePath };
      await axios.put(`https://journalapp-ab7i.onrender.com/api/visionboard/${updatedItem._id}`, updatedItem);
      onUpdate(updatedItem._id, updatedItem);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  // Save vision board item
  const handleSave = () => {
    if (!id) {
      console.error('Error: Missing ID for vision board item');
      return;
    }
  
    const updatedData = { text: note, image, position, size };
  
    axios
      .put(`https://journalapp-ab7i.onrender.com/api/visionboard/${id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('Data saved successfully:', response.data);
        onUpdate(id, response.data); 
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
  
  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      bounds="parent"
      enableResizing={true}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: ref.style.width, height: ref.style.height });
        setPosition(position);
      }}
      minWidth={150}
      minHeight={120}
      className="vision-board-item"
    >
      <div className="vision-board-content">
        {/* Editable Note */}
        <textarea className="vision-note" value={note} onChange={handleNoteChange} placeholder="Write your thoughts..." />

        {/* Image Preview */}
        {image && <img src={image} alt="Vision" className="vision-image" />}

        {/* Image Upload */}
        <div className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Save Button */}
        <button onClick={handleSave}>Save</button>
      </div>
    </Rnd>
  );
};

export default VisionBoardItem;

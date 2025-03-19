import React from 'react';
import { useState } from 'react';


const VisionBoardItem = ({ content }) => {
    const [note, setNote] = useState(content || ''); // Track the note
    const [image, setImage] = useState(null); // Track the image
  
    // Handle note change
    const handleNoteChange = (e) => {
      setNote(e.target.value);
    };
  
    // Handle image upload
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result); // Save image data as base64 URL
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="vision-board-item">
        {/* Editable note */}
        <textarea
          className="vision-note"
          value={note}
          onChange={handleNoteChange}
          placeholder="Write your thoughts..."
        />
  
        {/* Image upload */}
        <div className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
  
        {/* If image is uploaded, display it */}
        {image && <img src={image} alt="Vision" className="vision-image" />}
  
        {/* Optional: Display the note if no image */}
        {!image && <p className="vision-note-text">{note}</p>}
      </div>
    );
  };
  
  export default VisionBoardItem
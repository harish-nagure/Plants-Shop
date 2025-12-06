import React, { useState, useEffect, useRef } from "react";
import "./IdentifyPlant.css";
import { assets } from "../../frontend/src/assets/assets";

export default function IdentifyPlant({ setPlantNamePhoto }) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const pasteAreaRef = useRef(null);

  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        handleImageUpload({ target: { files: [file] } });
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setPreview(URL.createObjectURL(file));

    // Prepare formData
    const formData = new FormData();
    formData.append("image", file);

    setResult("Analyzing plant...");

    try {
      const response = await fetch(
        "http://localhost:4000/api/search/identify-plant",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      const cleaned = data.plant
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      // Show only name
      setResult(`${parsed.name}`);

      // Send only name upward
      setPlantNamePhoto(parsed.name);
    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  // Reset function
  const handleReset = () => {
    setPreview(null);
    setResult("");
    setPlantNamePhoto("");
  };

  return (
    <div className="identify-container">
      <span className="close-icon" onClick={handleReset}>
          &times;
      </span>
      <h2 className="identify-title">🌿 Identify Plant</h2>
      <label className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <span>📸 Upload or Paste Image</span>
      </label>
      

       {preview && (
        <div className="preview-wrapper">
          <img src={preview} className="preview-img" alt="preview" />
          
        </div>
      )}

      {result && <div className="result-box">{result}
            </div>
        }
    </div>
  );
}

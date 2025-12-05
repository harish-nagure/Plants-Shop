import React, { useState, useEffect, useRef } from "react";
import "./IdentifyPlant.css";

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
      const response = await fetch("http://localhost:4000/api/search/identify-plant", {
        method: "POST",
        body: formData, // important (NO JSON)
      });

      const data = await response.json();
      console.log(data);

      const cleaned = data.plant
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      console.log("CLEANED:", cleaned);

      const parsed = JSON.parse(cleaned);
      console.log("PARSED:", parsed);

      // Show readable output
      setResult(`${parsed.name} — ${parsed.description}`);

      // Send only name upward
      setPlantNamePhoto(parsed.name);


    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <div className="identify-container">
      <h2 className="identify-title">🌿 Identify Plant</h2>

      <label className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <span>📸 Upload or Paste Image</span>
      </label>

      {preview && <img src={preview} className="preview-img" alt="preview" />}

      {result && <div className="result-box">{result}</div>}
    </div>
  );
}

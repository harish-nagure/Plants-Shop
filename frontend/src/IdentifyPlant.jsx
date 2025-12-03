import React, { useState,useEffect,useRef } from "react";

export default function IdentifyPlant() {
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
      setResult(data.plant);
    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Plant Identifier</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {preview && <img src={preview} width="200" alt="preview" />}

      <pre>{result}</pre>
    </div>
  );
}

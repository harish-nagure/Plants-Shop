// import React, { useState, useEffect, useRef } from "react";
// import "./IdentifyPlant.css";
// import { assets } from "../../frontend/src/assets/assets";

// export default function IdentifyPlant({ setPlantNamePhoto }) {
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState("");
//   const pasteAreaRef = useRef(null);

//   useEffect(() => {
//     const handlePaste = (e) => {
//       if (e.clipboardData.files.length > 0) {
//         const file = e.clipboardData.files[0];
//         handleImageUpload({ target: { files: [file] } });
//       }
//     };
//     window.addEventListener("paste", handlePaste);
//     return () => window.removeEventListener("paste", handlePaste);
//   }, []);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Show preview
//     useEffect(() => {
//       return () => {
//         if (preview) URL.revokeObjectURL(preview);
//       };
//     }, [preview]);

//     // Prepare formData
//     const formData = new FormData();
//     formData.append("image", file);

//     setResult("Analyzing plant...");

//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/search/identify-plant",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       const cleaned = data.plant
//         .replace(/```json/gi, "")
//         .replace(/```/g, "")
//         .trim();

//       let parsed;
//       try {
//         parsed = JSON.parse(cleaned);
//       } catch (e) {
//         setResult("Could not identify plant");
//       return;
//       }

//       // Show only name
//       setResult(`${parsed.name}`);

//       // Send only name upward
//       setPlantNamePhoto(parsed.name);
      
//     } catch (err) {
//       setPlantNamePhoto("Harish");
//       setResult("Error: " + err.message);
//     }
//   };

//   // Reset function
//   const handleReset = () => {
//     setPreview(null);
//     setResult("");
//     setPlantNamePhoto("");
//   };

//   // return (
//   //   <div className="identify-container">
//   //     <span className="close-icon" onClick={handleReset}>
//   //         &times;
//   //     </span>
//   //     <h2 className="identify-title">🌿 Identify Plant</h2>
//   //     <label className="upload-box">
//   //       <input type="file" accept="image/*" onChange={handleImageUpload} />
//   //       <span>📸 Upload or Paste Image</span>
//   //     </label>
      

//   //      {preview && (
//   //       <div className="preview-wrapper">
//   //         <img src={preview} className="preview-img" alt="preview" />
          
//   //       </div>
//   //     )}

//   //     {result && <div className="result-box">{result}
//   //           </div>
//   //       }
//   //   </div>
//   // );

//   return (
//   <>
//     <label className="image-search-btn">
//       <input type="file" accept="image/*" className="image-search-input" onChange={handleImageUpload} />
      
//       {!preview && (
//       <img src={assets.searchByImg} alt="Search by image" className="img-search-icon" />
//       )}
//       {/* <span className="hover-text">Search by Image</span> */}
//     </label>
//     {preview && (
//         <div className="preview-wrapper">
//           <img src={preview} className="preview-img" alt="preview" />

//         {/* {result} */}
//         </div>
//       )}


//     {/* {result && <div className="result-box">{result}</div>} */}
//   </>
// );

// }
import React, { useState, useEffect } from "react";
import "./IdentifyPlant.css";
import { assets } from "../../frontend/src/assets/assets";

export default function IdentifyPlant({ setPlantNamePhoto }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

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
        ?.replace(/```json/gi, "")
        ?.replace(/```/g, "")
        ?.trim();

      const parsed = JSON.parse(cleaned);

      setPlantNamePhoto(parsed.name);

    } catch (err) {
      console.error(err);
      setPlantNamePhoto("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="image-search-btn">
      <input
        type="file"
        accept="image/*"
        className="image-search-input"
        onChange={handleImageUpload}
        disabled={loading}
      />

      {!preview && (
        <img
          src={assets.searchByImg}
          alt="Search by image"
          className="img-search-icon"
        />
      )}

      {preview && (
        <img src={preview} className="preview-img" alt="preview" />
      )}
    </label>
  );
}

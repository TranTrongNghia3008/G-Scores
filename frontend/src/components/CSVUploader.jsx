import { useRef, useState } from "react";
import { uploadCSV } from "./services/scoreService";
import { FiUpload, FiX, FiLoader } from "react-icons/fi";
import Card from "./ui/Card";

export default function CSVUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".csv")) {
      setFile(droppedFile);
      setStatus("");
    } else {
      setStatus("❌ Please upload a valid CSV file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("⏳ Uploading...");
    try {
      await uploadCSV(file);
      setStatus("✅ Upload successful!");
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setStatus(`❌ Upload failed: ${err.message}`);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setStatus("");
    if (fileInputRef.current) {
        fileInputRef.current.value = null; 
    }
    };


  const isUploading = status === "⏳ Uploading...";

  return (
    <Card title="CSV Uploader" icon={<FiUpload />}>
      <div className="p-6 border border-dashed border-gray-400 rounded-2xl bg-white shadow-md max-w-xl mx-auto">

        {file ? (
          <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
            <span className="text-gray-800 text-sm font-medium">
              📄 {file.name}
            </span>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
              title="Remove file"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            className={`cursor-pointer p-10 text-center rounded-xl transition border-2 border-dashed ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <p className="text-gray-700 font-semibold mb-2">
              Drag and drop CSV file here
            </p>
            <p className="text-sm text-gray-500">or click to select</p>
          </div>
        )}

        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={(e) => {
            const selected = e.target.files[0];
            if (selected && selected.name.endsWith(".csv")) {
              setFile(selected);
              setStatus("");
            } else {
              setStatus("❌ Please upload a valid CSV file.");
            }
          }}
          className="hidden"
        />

        <div className="mt-6 flex justify-center">
          {isUploading ? (
            <div className="flex justify-center items-center text-gray-600">
              <FiLoader className="animate-spin text-xl mr-2" />
              <span>Uploading...</span>
            </div>
          ) : (
            <button
              onClick={handleUpload}
              disabled={!file}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Upload CSV
            </button>
          )}
        </div>

        {status && !isUploading && (
          <p className="mt-4 text-sm text-gray-700 whitespace-pre-line">{status}</p>
        )}
      </div>
    </Card>
  );
}

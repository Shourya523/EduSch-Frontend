import { useState, useRef } from 'react';
import './AddFile.css';
import { UploadCloud } from 'lucide-react';

export default function AddFile() {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // --- Event Handlers ---

    // When a file is dragged into the drop zone
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    // When a file is dragged out of the drop zone
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    // This is necessary to allow the 'drop' event to fire
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // When a file is dropped onto the zone
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            // ==> TODO: Add your file handling logic here <==
            console.log("Files dropped:", files);
        }
    };

    // When a file is selected via the file dialog
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // ==> TODO: Add your file handling logic here <==
            console.log("Files selected:", files);
        }
    };

    // Manually trigger the hidden file input
    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="add-file-container">
            <h3>Upload Faculty Timetable</h3>
            <p className="description">Upload an Excel file containing faculty schedules</p>
            <div
                className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <UploadCloud size={48} className="upload-icon" />
                <p>Drag and drop your Excel file here, or <span className="browse-link">browse</span></p>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="file-input"
                    onChange={handleFileChange}
                    accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />

                <button
                    className="choose-file-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent the dropzone's click event from firing too
                        openFileDialog();
                    }}
                >
                    Choose File
                </button>
            </div>
        </div>
    );
}
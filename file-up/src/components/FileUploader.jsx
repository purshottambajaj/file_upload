import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a URL for previewing the selected file
    const preview = URL.createObjectURL(selectedFile);
    setPreviewUrl(preview);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'file_up'); // Replace with your Cloudinary preset name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzk8lfxrz/image/upload', // Replace with your Cloudinary cloud name
        formData
      );

      setUploadUrl(response.data.secure_url); // Store the uploaded file's URL
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" width="200" />}
      <button onClick={handleUpload}>Upload</button>
      
      {uploadUrl && (
        <div>
          <h3>Uploaded File:</h3>
          <img src={uploadUrl} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;

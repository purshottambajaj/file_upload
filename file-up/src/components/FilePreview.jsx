import React from 'react';

const FilePreview = ({ file }) => {
  const fileType = file.type;

  const renderPreview = () => {
    if (fileType.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt="Preview" width="300" />;
    } else if (fileType.startsWith('audio/')) {
      return <audio controls src={URL.createObjectURL(file)} />;
    } else if (fileType.startsWith('video/')) {
      return <video controls width="300" src={URL.createObjectURL(file)} />;
    } else if (fileType === 'application/pdf') {
      return <embed src={URL.createObjectURL(file)} width="300" height="400" type="application/pdf" />;
    } else {
      return <p>File format not supported</p>;
    }
  };

  return <div>{renderPreview()}</div>;
};

export default FilePreview;

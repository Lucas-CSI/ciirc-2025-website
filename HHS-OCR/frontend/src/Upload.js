import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, File, X, ArrowBigLeft } from 'lucide-react';
import icon from './icon.svg';

export default function MedicalFileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [teamName, setTeamName] = useState('');

  const handleBack = () => {
    window.location.href = "/"
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setUploadStatus(null);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (files.length === 0 || !teamName.trim()) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('teamName', teamName);
      files.forEach(({ file }) => {
        formData.append('files', file);
      });
      

      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus({ type: 'success', message: 'Files uploaded successfully' });
        setFiles([]);
      } else {
        setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
       <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center">
              <img src={icon} alt="Logo" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">US Department of Health and Human Services</h1>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <ArrowBigLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-4">
            <Upload className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Report a HIPPA Breach</h1>
          <p className="text-gray-600 text-lg">Upload related documents here</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <label htmlFor="team-name" className="block text-sm font-semibold text-gray-700 mb-2">
              Team Name
            </label>
            <input
              type="text"
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div
            className={`relative border-3 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Support for multiple file uploads
                </p>
              </div>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Files</h3>
              <div className="space-y-3">
                {files.map(({ id, name, size }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <File className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(id)}
                      className="ml-4 p-1 hover:bg-blue-100 rounded-full transition-colors flex-shrink-0"
                      disabled={uploading}
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadStatus && (
            <div
              className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
                uploadStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <p
                className={`text-sm font-medium ${
                  uploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {uploadStatus.message}
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={files.length === 0 || !teamName.trim() || uploading}
            className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all ${
              files.length === 0 || !teamName.trim() || uploading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-lg hover:shadow-xl'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your files are transmitted securely and comply with medical privacy standards
          </p>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Upload, House, Users, Shield, Clock, Database, Languages } from 'lucide-react';
import logoBIG from './logoBIG.png';
import icon from './icon.svg';

export default function MedicalHomePage() {
  const handleUploadClick = () => {
    window.location.href = '/upload';
  };

  const features = [
    {
      icon: House,
      title: 'About Us',
      description: 'Learn more about or contact the Office for Civil Rights.'
    },
    {
      icon: Upload,
      title: 'HIPAA Compliance',
      description: 'Report HIPPA Breaches'
    },
    {
      icon: Shield,
      title: 'Secure Uploading',
      description: 'Latest encryption standards are used to protect sensitive information'
    },
    {
      icon: Clock,
      title: 'Quick Upload',
      description: 'Upload breaches quickly'
    },
    {
      icon: Users,
      title: 'Fast Response',
      description: 'Our office will look at all reports within 24 hrs'
    },
    {
      icon: Languages,
      title: 'Other Languages',
      description: 'None as of now...'
    }
  ];

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
            onClick={handleUploadClick}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Upload className="w-5 h-5" />
            <span>Report a Breach</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Office for Civil Rights (OCR)
          </h2>
          <img src={logoBIG} alt="Logo" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
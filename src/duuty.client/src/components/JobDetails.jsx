import React from 'react';
import { 
  MapPinIcon, 
  ClockIcon, 
  CurrencyRupeeIcon 
} from '@heroicons/react/24/outline';
import ApplyNow from './ApplyNow'; // We'll create this component next

// Job Details Modal component
const JobDetails = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4">
            <p className="text-lg font-semibold">{job.jobTitle}</p>
            <p className="flex items-center text-gray-600 mt-1">
              <MapPinIcon className="h-5 w-5 mr-1" />
              {job.jobLocation}, {job.jobState}
            </p>
            <p className="flex items-center text-gray-600 mt-1">
              <ClockIcon className="h-5 w-5 mr-1" />
              Experience: {job.experience}
            </p>
            <p className="flex items-center text-gray-600 mt-1">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1" />
              {job.salaryRange.substring(0, 20)} per month
            </p>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-700 mt-1">{job.description}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Requirements</h3>
              <p className="text-gray-700 mt-1">{job.requirements}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Benefits</h3>
              <p className="text-gray-700 mt-1">{job.benefits}</p>
            </div>
            
            <div className="mt-6">
              <button className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-purple-700 transition">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
import React from 'react';
import { useNavigate } from 'react-router';

function PatientCard({ 
  name, 
  age, 
  gender, 
  consultant_doctor, 
  bill_number, 
  uhid_number, 
  room_number 
}) {
  const navigate = useNavigate();
  
  const moreDetails = () => {
    navigate(`/patientdetails?uhid=${uhid_number}`)
  }
  
  return (
    <div className="max-w-sm mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">{name}</h1>
        <p className="text-sm text-gray-500">{consultant_doctor ? `Consultant: ${consultant_doctor}` : 'Consultant: Not Assigned'}</p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">Bill Number:</span> {bill_number}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">UHID Number:</span> {uhid_number}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">Room Number:</span> {room_number}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">Age:</span> {age} years
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">Gender:</span> {gender}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button 
          onClick={moreDetails} 
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-xl hover:bg-teal-500 transition-all duration-300"
        >
          More Details
        </button>
      </div>
    </div>
  );
}

export default PatientCard;

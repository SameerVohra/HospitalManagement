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
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {name}
        </h1>
        <p className="text-sm text-gray-500">Consultant Doctor: {consultant_doctor}</p>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Bill Number:</span> {bill_number}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">UHID Number:</span> {uhid_number}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Room Number:</span> {room_number}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Age:</span> {age} years
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Gender:</span> {gender}
        </p>
      </div>
      <button onClick={moreDetails} className='rounded-xl p-2 bg-blue-500 text-white mt-4 hover:bg-cyan-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black transition-all font-semibold'>More Details</button>
    </div>
  );
}

export default PatientCard;

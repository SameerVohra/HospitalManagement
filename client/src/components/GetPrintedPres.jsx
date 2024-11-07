import axios from 'axios';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import link from "../assets/link.json";
import PatientCard from './PatientCard';
import { FaSearch } from 'react-icons/fa';

function GetPrintedPres() {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const [date, setDate] = useState(formatDate(new Date()));
  const [patients, setPatients] = useState();

  const onDateChange = (selectedDate) => {
    setDate(formatDate(selectedDate));
  };

  const handleFind = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${link.url}/get-pres?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data.presciption);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl p-10 space-y-8">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Search Patient by Date
        </h2>

        {/* Calendar Section */}
        <div className="flex justify-center">
          <Calendar
            onChange={onDateChange}
            value={new Date(date)}
            className="rounded-xl shadow-md border-2 border-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            onClick={handleFind}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out flex items-center gap-2"
          >
            <FaSearch size={20} />
            Find Patient
          </button>
        </div>
      </div>

      {/* Patient Cards - outside of calendar box */}
      {patients && patients.length > 0 ? (
        <div className="mt-8 flex justify-center space-x-6 overflow-x-auto p-4 bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg">
          {patients.map((patient, index) => (
            <PatientCard
              key={index}
              name={patient.name}
              age={patient.age}
              gender={patient.gender}
              consultant_doctor={patient.consultant_doctor}
              bill_number={patient.bill_number}
              uhid_number={patient.uhid_number}
              room_number={patient.room_number}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-lg text-gray-500">
          No patients found for this date.
        </div>
      )}
    </div>
  );
}

export default GetPrintedPres;

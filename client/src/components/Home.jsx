import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import url from '../assets/link.json';
import PatientCard from './PatientCard';
import { useNavigate } from 'react-router';

function Home() {
  const [searchName, setSearchName] = useState('');
  const [searchedPatients, setSearchedPatients] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = async () => {
      const data = await axios.get(`${url.url}/search-patient?name=${searchName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchedPatients(data.data.patients);
      console.log(data);
    };
    res();
  };

  const handleLogout = async () => {
    const devId = localStorage.getItem('deviceId');
    const email = localStorage.getItem('email');
    const data = await axios.put(`${url.url}/logout`, { email, deviceId: devId });
    if (data.status === 201) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('deviceId');
      navigate('/');
    }
  };

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50'>
        <div className='flex justify-between items-center w-full p-5 bg-white shadow-md'>
          <div className='flex gap-4'>
            <button
              className='px-4 py-2 rounded-full bg-cyan-300 hover:bg-blue-500 transition-all shadow-lg font-semibold'
              onClick={() => navigate('/add-patient')}
            >
              Add A New Patient
            </button>
            <button
              className='px-4 py-2 rounded-full bg-cyan-300 hover:bg-blue-500 transition-all shadow-lg font-semibold'
              onClick={() => navigate('/edit-patient')}
            >
              Edit Patient
            </button>
            <button
              className='px-4 py-2 rounded-full bg-cyan-300 hover:bg-blue-500 transition-all shadow-lg font-semibold'
              onClick={() => navigate('/discharge')}
            >
              Discharge Patient
            </button>
            <button className='px-4 py-2 rounded-full bg-cyan-300 hover:bg-blue-500 transition-all shadow-lg font-semibold'
              onClick={() => navigate('/get-prescriptions')}>
              Get Prescriptions
            </button>
          </div>
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all'
          >
            Logout
          </button>
        </div>

        <div className='w-full flex justify-center items-center p-5'>
          <form onSubmit={handleSearch} className='flex w-1/2'>
            <input
              type='text'
              value={searchName}
              onChange={(e) => setSearchName(e.currentTarget.value)}
              className='border-2 border-gray-300 w-full rounded-l-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Search'
            />
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg p-3 transition-all'
            >
              <SearchIcon />
            </button>
          </form>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-7 p-5'>
          {searchedPatients &&
            searchedPatients.map((patient, index) => (
              <PatientCard
                key={index}
                name={patient.name}
                age={patient.age}
                gender={patient.gender}
                consultant_doctor={patient.consultant_doctor}
                uhid_number={patient.uhid_number}
                room_number={patient.room_number}
                bill_number={patient.bill_number}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;

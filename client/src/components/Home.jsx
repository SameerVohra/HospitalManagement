import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import url from "../assets/link.json"
import PatientCard from './PatientCard';
import { useNavigate } from 'react-router';
function Home() {
  const [searchName, setSearchName] = useState("");
  const [searchedPatients, setSearchedPatients] = useState([]);
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = async() => {
      const data = await axios.get(`${url.url}/search-patient?name=${searchName}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setSearchedPatients(data.data.patients)
      console.log(data);
    }
    res();
  }

  return (
    <>
      <div className='min-h-dvh min-w-full flex flex-col justify-start items-center'>
        <div className='flex justify-center items-center flex-row gap-10'>
          <button className='p-3 rounded-3xl bg-cyan-300 hover:bg-blue-500 hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-black hover:text-white font-semibold' onClick={()=>navigate("/add-patient")}>Add A New Patient</button>
          <button className='p-3 rounded-3xl bg-cyan-300 hover:bg-blue-500 hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-black hover:text-white font-semibold' onClick={()=>navigate("/edit-patient")}> Edit Patient </button>
          <button className='p-3 rounded-3xl bg-cyan-300 hover:bg-blue-500 hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-black hover:text-white font-semibold' onClick={()=>navigate("/discharge")}> Discharge Patient </button>
        </div>
        <div className='w-full flex justify-center items-center flex-row p-5'>
          <input type='text' value={searchName} onChange={(e)=>setSearchName(e.currentTarget.value)} className='border-2 border-black w-1/2 rounded-xl p-4 text-xl' placeholder='Search'/>
          <button onClick={handleSearch}><SearchIcon/></button>
        </div>
        <div className='flex justify-center items-center flex-row gap-7 flex-wrap'>
          {searchedPatients && searchedPatients.map((patient, index)=>(
          <PatientCard key={index} name={patient.name} age={patient.age} gender={patient.gender} consultant_doctor={patient.consultant_doctor} uhid_number={patient.uhid_number} room_number={patient.room_number} bill_number={patient.bill_number}/>
          ))}
        </div>

      </div>
    </>
  )
}

export default Home

import React, { useState, useEffect } from 'react';
import Prescription from './Prescription';
import link from "../assets/link.json";
import axios from 'axios';

function AddPatient() {
  const [name, setName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [conDoc, setConDoc] = useState('');
  const [ipd, setIpd] = useState('');
  const [room, setRoom] = useState('');
  const [roomType, setRoomType] = useState('');
  const [patientStatus, setPatientStatus] = useState('');
  const [billDate, setBillDate] = useState('');
  const [admitDate, setAdmitDate] = useState('');
  const [billNo, setBillNo] = useState(null);
  const [uhid, setUhid] = useState(null);
  const [admitTime, setAdmitTime] = useState('');
  const [patientAdd, setPatientAdd] = useState(false);
  const [addBill, setAddBill] = useState(false);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");
  const [disc, setDisc] = useState("");
  const [addTrans, setAddTrans] = useState(false);
  const [amount, setAmount] = useState("");

  const categoryOptions = {
    Category1: ['Sub1', 'Sub2', 'Sub3'],
    Category2: ['SubA', 'SubB', 'SubC'],
    Category3: ['SubX', 'SubY', 'SubZ'],
    Category4: ['SubP', 'SubQ', 'SubR'],
  };

  const handleCategoryChange = (e) => {
    setCategory(e);
    setSubCategory('');
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAdmitDate(currentDate);
    setAdmitTime(currentTime);
    setBillDate(currentDate);
  }, []);

  const handlePatientAdd = async (e) => {
    e.preventDefault();
    setPatientAdd(true);
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(`${link.url}/add-patient`, {
        name, age, gender, address, mobile_number: mobile,
        consultant_doctor: conDoc, ipd_number: ipd, room_number: room,
        room_category: roomType, patient_status: patientStatus,
        bill_date: billDate, admit_date: admitDate, admit_time: admitTime,
        discharge_date: null, discharge_time: null, amt_payed:0, discount:0, guardian_name: guardianName
      }, { headers: { Authorization: `Bearer ${token}` } });

      setBillNo(data.bill_number);
      setUhid(data.uhid_number);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const date = new Date().toISOString().slice(0, 10);
      console.log(parseInt(unit), parseFloat(rate));
      const data = await axios.post(`${link.url}/add-bill`, {
        category,
        subcategory: subCategory,
        unit: parseInt(unit),
        rate: parseFloat(rate),
        bill_number: billNo,
        date,
      }, 
      { headers: { Authorization: `Bearer ${token}` } });

      console.log(data);
      setSubCategory("");
      setCategory("");
      setUnit("");
      setRate("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmountAdd = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const addAmt = async() => {
      const data = await axios.put(`${link.url}/add-amount`, {
        uhid: uhid,
        amount: parseFloat(amount),
        discount: parseFloat(disc)
      }, {headers: {Authorization: `Bearer ${token}`}})
      console.log(data);
    }
    addAmt();
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-cyan-50 p-6 space-x-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add New Patient</h2>

        <form className="space-y-4" onSubmit={handlePatientAdd}>
          <InputField label="Name" value={name} onChange={setName} placeholder="Enter patient name" />
          <InputField label="Guardian Name" value={guardianName} onChange={setGuardianName} placeholder="Guardian's name" />
          <InputField label="Age" type="number" value={age} onChange={setAge} placeholder="Enter age" />
          <SelectField label="Gender" value={gender} onChange={setGender} options={['Male', 'Female', 'Other']} />

          <InputField label="Address" value={address} onChange={setAddress} placeholder="Patient's address" />
          <InputField label="Mobile Number" type="tel" value={mobile} onChange={setMobile} placeholder="Enter mobile number" />

          <InputField label="Consulting Doctor" value={conDoc} onChange={setConDoc} placeholder="Doctor's name" />
          <InputField label="IPD Number" type="number" value={ipd} onChange={setIpd} placeholder="IPD number" />
          <InputField label="Room Number" type="number" value={room} onChange={setRoom} placeholder="Room number" />
          <SelectField label="Room Type" value={roomType} onChange={setRoomType} options={['General Ward', 'ICU', 'Private Ward', 'NICU']} />

          <InputField label="Patient Status" value={patientStatus} onChange={setPatientStatus} placeholder="Status" />
          <InputField label="Admit Date" type="date" value={admitDate} onChange={setAdmitDate} />
          <InputField label="Admit Time" type="time" value={admitTime} onChange={setAdmitTime} />
          <InputField label="Billing Date" type="date" value={billDate} onChange={setBillDate} />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold rounded-lg shadow-md"
          >
            Add Patient
          </button>
        </form>
        <div className='flex justify-between item-center'>
          <button
            className="p-4 rounded-xl bg-indigo-700 hover:bg-indigo-900 text-white hover:transition-all font-semibold"
            onClick={() => {
              setAddBill(!addBill)
              setAddTrans(false)}}
          >
            Add Bill Details
          </button>

          <button 
            className='p-4 rounded-xl bg-indigo-700 hover:bg-indigo-900 text-white hover:transition-all font-semibold' 
            onClick={()=>{
              setAddTrans(!addTrans)
              setAddBill(false);
            }}>
            Add Transaction
          </button>
        </div>

        {addTrans && (
        <form className='space-y-6 bg-gray-100 p-6 rounded-lg shadow-md' onSubmit={handleAmountAdd}>
            <h3 className='text-xl font-semibold text-gray-800'>Add a Transaction</h3>

            <InputField value={amount} onChange={(e)=>setAmount(e)} placeholder="Amount" label="Amount"/>
            <InputField value={disc} onChange={(e)=>setDisc(e)} placeholder="Discount" label="Discount"/>

            <button type='submit' 
              className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300'
            >
              Add Transaction
            </button>
          </form>
        )}

        {addBill && (
          <form className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Add Bill Details</h3>

            <SelectField 
              label="Category" 
              value={category} 
              onChange={handleCategoryChange} 
              options={Object.keys(categoryOptions)} 
            />

            {category && (
              <SelectField
                label="Sub Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e)}
                options={categoryOptions[category]}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <InputField 
                value={unit} 
                onChange={(e) => setUnit(e)} 
                placeholder="Unit" 
                label="Unit" 
              />
              <InputField 
                value={rate} 
                onChange={(e) => setRate(e)} 
                placeholder="Rate" 
                label="Rate" 
              />
            </div>
            <button 
              onClick={handleAddBill} 
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md 
                        hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
            >
              Add Bill
            </button>
          </form>
        )}
      </div>

    {patientAdd && (
        <Prescription
          name={name}
          guardianName={guardianName}
          age={age}
          gender={gender}
          address={address}
          mobile={mobile}
          conDoc={conDoc}
          ipd={ipd}
          room={room}
          roomType={roomType}
          patientStatus={patientStatus}
          billDate={billDate}
          admitDate={admitDate}
          admitTime={admitTime}
          billNo={billNo}
          uhid={uhid}
        />
      )}
    </div>
  );
}

function InputField({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddPatient; 

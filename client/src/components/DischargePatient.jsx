import React, { useState } from 'react';
import Prescription from './Prescription';
import link from "../assets/link.json";
import axios from 'axios';

function DischargePatient() {
  const [uhid, setUhid] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);
  const [billNo, setBillNo] = useState();
  const [amount, setAmount] = useState('');
  const [disc, setDisc] = useState('');
  const [addTrans, setAddTrans] = useState(false);

  const handleAmountAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `${link.url}/add-amount`,
        { uhid, amount: parseFloat(amount), discount: parseFloat(disc) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetTransactionForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDischarge = async () => {
    const token = localStorage.getItem("token");
    const discharge_date = new Date().toISOString().slice(0, 10);
    const discharge_time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      const data = await axios.put(
        `${link.url}/discharge`,
        { uhid, disDate: discharge_date, disTime: discharge_time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      if(data.status === 201){
        window.alert("Patient Discharged Successfully")
        setUhid();
        setShowPrescription(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setShowPrescription(true);
    try {
      const data = await axios.get(`${link.url}/patient-details?uhid=${uhid}`, { headers: { Authorization: `Bearer ${token}` } });
      setBillNo(data.data.patient.bill_number);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Discharge Patient</h2>
        <InputField value={uhid} onChange={setUhid} placeholder='Enter UHID' />
        <button
          type='submit'
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setAddTrans(!addTrans)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          disabled={!showPrescription}
        >
          {addTrans ? 'Cancel Transaction' : 'Add A New Transaction'}
        </button>
        <button
          onClick={handleDischarge}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          disabled={!showPrescription}
        >
          Discharge
        </button>
      </div>

      {addTrans && (
        <FormContainer title="Add Transaction" onSubmit={handleAmountAdd}>
          <InputField label="Amount" value={amount} onChange={setAmount} placeholder="Enter Amount" />
          <InputField label="Discount" value={disc} onChange={setDisc} placeholder="Enter Discount" />
          <FormButton label="Add Transaction" color="green" />
        </FormContainer>
      )}

      {showPrescription && <Prescription uhid={uhid} />}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        required
      />
    </div>
  );
}

function FormContainer({ title, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      {children}
    </form>
  );
}

function FormButton({ label, color }) {
  return (
    <button
      type="submit"
      className={`w-full bg-${color}-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-${color}-700 transition-all`}
    >
      {label}
    </button>
  );
}

export default DischargePatient;

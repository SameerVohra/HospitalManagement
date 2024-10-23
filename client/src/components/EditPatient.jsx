import React, { useState } from 'react';
import Prescription from './Prescription';
import axios from 'axios';
import link from '../assets/link.json';
import { FaFileInvoiceDollar, FaPlus, FaReceipt } from 'react-icons/fa';

function EditPatient() {
  const [uhid, setUhid] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);
  const [addBill, setAddBill] = useState(false);
  const [addTrans, setAddTrans] = useState(false);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [rate, setRate] = useState('');
  const [billNo, setBillNo] = useState('');
  const [amount, setAmount] = useState('');
  const [disc, setDisc] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const categoryOptions = {
    Category1: ['Sub1', 'Sub2', 'Sub3'],
    Category2: ['SubA', 'SubB', 'SubC'],
    Category3: ['SubX', 'SubY', 'SubZ'],
    Category4: ['SubP', 'SubQ', 'SubR'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPrescription(true);
    const token = localStorage.getItem('token');
    setError(''); // Reset error state

    try {
      const response = await axios.get(
        `${link.url}/patient-details?uhid=${uhid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBillNo(response.data.patient.bill_number);
      console.log(response);
    } catch (error) {
      setError('Error fetching patient details. Please try again.'); // Set error message
      console.error(error);
    }
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const date = new Date().toISOString().slice(0, 10);
    setError(''); // Reset error state

    try {
      await axios.post(
        `${link.url}/add-bill`,
        {
          category,
          subcategory: subCategory,
          unit: parseInt(unit),
          rate: parseFloat(rate),
          bill_number: billNo,
          date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetBillForm();
    } catch (error) {
      setError('Error adding bill. Please check your inputs.'); // Set error message
      console.error(error);
    }
  };

  const handleAmountAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setError(''); // Reset error state

    try {
      await axios.put(
        `${link.url}/add-amount`,
        { uhid, amount: parseFloat(amount), discount: parseFloat(disc) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetTransactionForm();
    } catch (error) {
      setError('Error adding amount. Please check your inputs.'); // Set error message
      console.error(error);
    }
  };

  const resetBillForm = () => {
    setCategory('');
    setSubCategory('');
    setUnit('');
    setRate('');
  };

  const resetTransactionForm = () => {
    setAmount('');
    setDisc('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-50 shadow-lg rounded-lg">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Search Patient Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit Patient Details</h2>
        <div className="flex items-center gap-4">
          <InputField
            label="UHID"
            value={uhid}
            onChange={(e) => {
              setUhid(e);
              setShowPrescription(false);
              setAddBill(false);
              setAddTrans(false);
            }}
            placeholder="Enter UHID"
          /> 
        </div>
        <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Search
          </button>
      </form>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 mb-5">
        <ActionButton
          label="Add Transaction"
          icon={<FaPlus />}
          color="green"
          onClick={() => {
            setAddBill(false);
            setAddTrans(!addTrans);
          }}
          disabled={!showPrescription}
        />
        <ActionButton
          label="Add Bill"
          icon={<FaFileInvoiceDollar />}
          color="indigo"
          onClick={() => {
            setAddTrans(false);
            setAddBill(!addBill);
          }}
          disabled={!showPrescription}
        />
      </div>

      {/* Add Bill Form */}
      {addBill && (
        <FormContainer title="Add Bill Details" onSubmit={handleAddBill}>
          <SelectField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e)}
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
            <InputField label="Unit" value={unit} onChange={(e) => setUnit(e)} placeholder="Enter Units" />
            <InputField label="Rate" value={rate} onChange={(e) => setRate(e)} placeholder="Enter Rate" />
          </div>
          <FormButton label="Add Bill" color="indigo" />
        </FormContainer>
      )}

      {/* Add Transaction Form */}
      {addTrans && (
        <FormContainer title="Add Transaction" onSubmit={handleAmountAdd}>
          <InputField label="Amount" value={amount} onChange={(e) => setAmount(e)} placeholder="Enter Amount" />
          <InputField label="Discount" value={disc} onChange={(e) => setDisc(e)} placeholder="Enter Discount" />
          <FormButton label="Add Transaction" color="green" />
        </FormContainer>
      )}

      {showPrescription && <Prescription uhid={uhid} />}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      />
    </div>
  );
}

function ActionButton({ label, icon, color, onClick, disabled }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : `bg-${color}-500 hover:bg-${color}-600 text-white`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon} {label}
    </button>
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

export default EditPatient;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import link from '../assets/link.json';
import { useReactToPrint } from 'react-to-print';

function Prescription({ uhid }) {
  const [billDetails, setBillDetails] = useState([]);
  const [error, setError] = useState(null);
  const [grossAmt, setGrossAmt] = useState(0);
  const [netAmt, setNetAmt] = useState(0);
  const [amtPayed, setAmtPayed] = useState(0);
  const [disc, setDisc] = useState(0);
  const [amtLeft, setAmtLeft] = useState(0);
  const [name, setName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [conDoc, setConDoc] = useState("");
  const [ipd, setIpd] = useState();
  const [room, setRoom] = useState();
  const [roomType, setRoomType] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [billDate, setBillDate] = useState();
  const [admitDate, setAdmitDate] = useState();
  const [admitTime, setAdmitTime] = useState();
  const [billNo, setBillNo] = useState();
  const [discharge_date, setDischarge_date] = useState();
  const [discharge_time, setDischarge_time] = useState();

  const contentRef = useRef();
  const handlePrint = useReactToPrint({contentRef});


const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${link.url}/patient-details?uhid=${uhid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const patient = response.data.patient;

        setName(patient.name);
        setGuardianName(patient.guardian_name);
        setAge(patient.age);
        setGender(patient.gender);
        setAddress(patient.address);
        setMobile(patient.mobile_number);
        setConDoc(patient.consultant_doctor);
        setIpd(patient.ipd_number);
        setRoom(patient.room_number);
        setRoomType(patient.room_category);
        setPatientStatus(patient.patient_status);
        setBillNo(patient.bill_number);
        setBillDate(formatDate(patient.bill_date));
        setAdmitDate(formatDate(patient.admit_date));
        setAdmitTime(patient.admit_time);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, [uhid]);

  

  useEffect(() => {
    const fetchBillDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        setError(null);
        const response = await axios.get(
          `${link.url}/patient-details?uhid=${uhid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const patient = response.data.patient;
        setAmtPayed(patient.amt_payed || 0);
        setDisc(patient.discount || 0);
        setBillDetails(patient.bill_details || []);
        setDischarge_date(patient.discharge_date || null);
        setDischarge_time(patient.discharge_time || null);

        const totalGross = patient.bill_details.reduce((total, category) => {
          const subTotal = category.subcategories.reduce(
            (subTotal, subC) => subTotal + subC.amount, 0
          );
          return total + subTotal;
        }, 0);

        setGrossAmt(totalGross);
        const calculatedNetAmt = totalGross - patient.discount;
        setNetAmt(calculatedNetAmt);
        setAmtLeft(calculatedNetAmt - patient.amt_payed);
      } catch (err) {
        console.error('Error fetching bill details:', err);
        setError('Failed to fetch bill details. Please try again.');
      }
    };

    fetchBillDetails();
  });


  return (
    <>
      <div
        ref={contentRef}
        className="min-h-screen w-full max-w-[850px] mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md print:max-w-full print:min-h-dvh print:p-2 print:border-none print:shadow-none"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            src={logo}
            alt="logo"
            className="h-24 w-24 rounded-full border-2 border-gray-300"
          />
          <h1 className="text-4xl text-gray-800 font-extrabold tracking-wide font-serif">
            Shree Ram Hospital
          </h1>
        </div>

        {/* Patient and Bill Details Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="border p-6 rounded-lg bg-gray-50 shadow-sm">
            <p className="text-lg">
              <span className="font-semibold">Patient Name:</span> {name} ({age}/{gender})
            </p>
            <p className="text-lg">
              <span className="font-semibold">Guardian Name:</span> {guardianName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Address:</span> {address}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Mobile:</span> {mobile}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Consultant:</span> {conDoc}
            </p>
            {discharge_date && discharge_time && (
              <>
                <p className="text-lg">
                  <span className="font-semibold">Discharge Date:</span> {formatDate(discharge_date)}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Discharge Time:</span> {discharge_time}
                </p>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="border p-6 rounded-lg bg-gray-50 shadow-sm">
            <p className="text-lg">
              <span className="font-semibold">Bill No.:</span> {billNo}
            </p>
            <p className="text-lg">
              <span className="font-semibold">UHID:</span> {uhid}
            </p>
            <p className="text-lg">
              <span className="font-semibold">IPD No.:</span> {ipd}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Room No.:</span> {room} ({roomType})
            </p>
            <p className="text-lg">
              <span className="font-semibold">Status:</span> {patientStatus}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Bill Date:</span> {billDate}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Admit Date:</span> {admitDate} at {admitTime}
            </p>
          </div>
        </div>

        {error && (
          <div className="text-red-500 font-semibold text-center mt-4">
            {error}
          </div>
        )}

        {/* Bill Details Table */}
        {billDetails.length > 0 && (
          <table className="w-full mt-8 border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Serial No.</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Unit</th>
                <th className="border px-4 py-2">Rate</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {billDetails.map((detail, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      colSpan={6}
                      className="border px-4 py-2 font-bold bg-gray-200"
                    >
                      {detail.category}
                    </td>
                  </tr>
                  {detail.subcategories.map((subc, idx) => (
                    <tr key={subc._id}>
                      <td className="border px-4 py-2">{idx + 1}</td>
                      <td className="border px-4 py-2">
                        {new Date(subc.date).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">{subc.subcategory}</td>
                      <td className="border px-4 py-2">{subc.unit}</td>
                      <td className="border px-4 py-2">{subc.rate}</td>
                      <td className="border px-4 py-2">{subc.amount}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {/* Bill Summary Section */}
        <div className="flex justify-between mt-6 p-4 bg-gray-100 rounded-md">
          <div>
            <h2 className="text-xl font-semibold">Gross Amount:</h2>
            <p className="text-2xl font-bold">₹{grossAmt}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Discount:</h2>
            <p className="text-2xl font-bold text-red-600">₹{disc}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Net Amount:</h2>
            <p className="text-2xl font-bold text-green-600">₹{netAmt}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Amount Paid:</h2>
            <p className="text-2xl font-bold text-blue-600">₹{amtPayed}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Amount Left:</h2>
            <p className="text-2xl font-bold text-orange-600">₹{amtLeft}</p>
          </div>
        </div>
        
      </div>
      <div className='flex justify-center mt-2'>
          <button
            onClick={handlePrint}
            className="bg-gray-500 text-white border-2 border-black rounded-xl p-2"
          >
            Print Prescription
          </button>
      </div>
    </>
  );
}

export default Prescription

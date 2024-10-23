import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import url from "../assets/link.json";
import axios from 'axios';
import Prescription from './Prescription';

function PatientDetails() {
  const location = useLocation();
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const uhid = queryParams.get("uhid");

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${url.url}/patient-details?uhid=${uhid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatientDetails(res.data.patient);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };
     fetchPatientDetails();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl text-gray-500 animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 font-semibold">{error}</div>;
  }

  const isDischarged = patientDetails?.discharge_date && patientDetails?.discharge_time;

  return (
    <>
      <Prescription uhid={uhid}/>
    </>
  );
}



export default PatientDetails;

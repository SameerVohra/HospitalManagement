import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import url from "../assets/link.json";
import axios from 'axios';
import { useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");
    const res = async() => {
      try {
        const data = await axios.post(`${url.url}/login`, {
          emailId: email,
          password: password
        })
        console.log(data);
        if(data.status===201){
          setPassword("");
          setEmail("");
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("email", data.data.emailId);
          navigate("/home")
        }
      } catch (error) {
        setErr(error.response.data);
        console.log(error);
      }
    }
    res();
  }

  return (
    <>
      <div className="min-h-screen min-w-full bg-gradient-to-r from-cyan-500 from-20% via-cyan-600 via-50% to-blue-700 to-90% flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-96 flex justify-center items-center flex-col shadow-2xl shadow-black">
          <img src={logo} alt="Logo" className='h-24 w-24 mb-4' />
          <h2 className="text-2xl font-semibold text-center mb-6">Shree Ram Hospital</h2>
          <form onSubmit={handleLogin}>
            {err && <h1 className='text-red-500 text-center text-lg font-semibold'>{err}</h1>}
            <div className="mb-4">
              <input
                value={email}
                type="text"
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6 relative">
              <input
                value={password}
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Home from "./components/Home.jsx"
import PatientDetails from "./components/PatientDetails.jsx"
import AddPatient from './components/AddPatient.jsx';
import EditPatient from './components/EditPatient.jsx'
import DischargePatient from './components/DischargePatient.jsx'

const route = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "",
        element: <Login/>
      },
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "patientdetails",
        element: <PatientDetails/>
      },
      {
        path: "add-patient",
        element: <AddPatient/>
      },
      {
        path: "edit-patient",
        element: <EditPatient/>
      },
      {
        path: "discharge",
        element: <DischargePatient/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={route} />
)

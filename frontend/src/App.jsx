import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLogin from "./Pages/UserLogin";
import Dashboard from './Pages/Dashboard';
import SearchResult from './Pages/SearchResult';
import UserProfile from './Pages/UserProfile';
import DoctorDashboard from './Pages/DoctorDashboard';
import BookingAppointment from './Pages/BookingAppointment';
import UserDetail from './Pages/UserDetail';
import DoctorDetail from './Pages/DoctorDetail';
import ClinicVerify from './Pages/ClinicVerify';

function App() {
  return (
    <BrowserRouter>
    {/* <UserDetail /> */}
    {/* <UserProfile/> */}
    {/* <DoctorDashboard />
    <SearchResult /> */}
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/doctordashboard' element={<DoctorDashboard />} />
        <Route path='/searchresult' element={<SearchResult />} />
        <Route path='/bookingappointment' element={<BookingAppointment />} />
        <Route path='/userdetail' element={<UserDetail />} />
        <Route path='/doctordetail' element={<DoctorDetail />} />
        <Route path='/clinicverify' element={<ClinicVerify />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
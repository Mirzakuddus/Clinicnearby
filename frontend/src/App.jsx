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
import ProtectedUserRoute from './Routes/ProtectedUserRoutes';
import ProtectedDoctorRoute from './Routes/ProtectedDoctorRoute';

function App() {
  return (
    <BrowserRouter>
    {/* <UserDetail /> */}
    {/* <UserProfile/> */}
    {/* <DoctorDashboard />
    <SearchResult /> */}
      <Routes>
        <Route path="/" element={
          <ProtectedUserRoute>
          <Dashboard/>
          </ProtectedUserRoute>} />

        <Route path="/userlogin" element={<UserLogin/>} />

        <Route path='/userprofile' element={
          <ProtectedUserRoute>
          <UserProfile />
          </ProtectedUserRoute>} />

        <Route path='/doctordashboard' element={
          <ProtectedDoctorRoute>
          <DoctorDashboard />
          </ProtectedDoctorRoute>} />
          
        <Route path='/searchresult' element={
          <ProtectedUserRoute>
          <SearchResult />
          </ProtectedUserRoute>} />

        <Route path='/bookingappointment' element={
          <ProtectedUserRoute>
          <BookingAppointment />
          </ProtectedUserRoute>} />
        <Route path='/userdetail' element={<UserDetail />} />
        <Route path='/doctordetail' element={<DoctorDetail />} />
        <Route path='/clinicverify' element={<ClinicVerify />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
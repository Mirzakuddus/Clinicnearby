import { Navigate } from "react-router-dom";

const ProtectedDoctorRoute = ({ children }) => {
  const token = sessionStorage.getItem("doctorToken");

  if (!token) {
    return <Navigate to="/userlogin" />;
  }

  return children;
};

export default ProtectedDoctorRoute;
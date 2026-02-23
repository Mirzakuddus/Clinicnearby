import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/userlogin" />;
  }

  return children;
};

export default ProtectedUserRoute;
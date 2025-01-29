import { useContext } from "react";
import AuthContext from "../../contexts/authContext/authContext";
import LoginPage from "../pages/auth/loginPage/LoginPage";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  return user?.phone ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoute;

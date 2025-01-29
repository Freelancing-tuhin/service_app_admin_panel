import React, { useContext, useState } from "react";
import LoginTop from "../../../../shared/loginTob/LoginTop";
import { EyeIcon, EyeSlashIcon, UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../../contexts/authContext/authContext";
import { api } from "../../../../../utils";

const LoginForm: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    const payload = {
      phone,
      password,
    };

    try {
      const response = await api.auth.AdminLogin(payload);
      console.log("===========>login", response);
      setUser(response);
      setPhone("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid phone or password. Please try again.");
    }
  };

  return (
    <div className="space-y-6 pb-5">
      <LoginTop />
      <div className="mt-5">
        <label className="text-sm mb-2 block text-start">User Phone</label>
        <div className="relative flex items-center">
          <input
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
            placeholder="Enter phone number"
          />
          <UserIcon className="w-[18px] h-[18px] text-gray-600 absolute right-4" />
        </div>
      </div>
      <div>
        <label className="text-sm mb-2 block text-start">Password</label>
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
            placeholder="Enter password"
          />
          {showPassword ? (
            <EyeSlashIcon
              className="w-[18px] h-[18px] text-gray-600 absolute right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeIcon
              className="w-[18px] h-[18px] text-gray-600 absolute right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="!mt-10">
        <button
          type="button"
          className="w-full mb-5 shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

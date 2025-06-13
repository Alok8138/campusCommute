import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import loginAnimation from "../animation/loginAnimation.gif"; // Corrected relative path

const Login = () => {
  const [enrollment, setEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { enrollment, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { name, enrollment, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex bg-white p-8 rounded-2xl shadow-lg w-[60%]">
        {/* Left Side - Animation */}
        <div className="w-1/2 flex justify-center items-center">
          <img src={loginAnimation} alt="Login Animation" className="w-96" />
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-1/2 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLoginForm ? "Log In" : "Sign Up"}
            </h2>
          </div>

          {!isLoginForm && (
            <>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="text"
                value={email}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          <label className="block text-gray-700 font-semibold">Enrollment ID</label>
          <input
            type="text"
            value={enrollment}
            className="w-full px-4 py-2 mb-3 border rounded-lg"
            onChange={(e) => setEnrollment(e.target.value)}
          />

          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            className="w-full px-4 py-2 mb-3 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-red-500 text-sm mb-3">{error}</p>

          <button
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <p
            className="text-blue-600 text-center mt-4 cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

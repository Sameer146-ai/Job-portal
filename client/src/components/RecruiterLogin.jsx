import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RecruiterLogin() {
  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  async function onSubmitHandler(e) {
    e.preventDefault();

    if (state == "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if (state === "login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          // console.log(data)
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const { data } = await axios.post(
          backendUrl + "/api/company/register",
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Popup Box */}
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 z-10"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Recruiter {state}
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Please sign in to continue
        </p>

        {/* Input Fields */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:border-blue-400 transition">
              <label
                htmlFor="image"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                  className="w-16 h-16 object-contain"
                />
                <p className="text-gray-600 text-sm font-medium text-center">
                  Upload Company <br /> Logo
                </p>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                />
              </label>
            </div>
          </>
        ) : (
          <>
            {state !== "login" && (
              <div className="flex items-center border rounded-lg px-3 py-2 gap-2 mb-3">
                <img src={assets.person_icon} alt="" className="w-5 h-5" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  placeholder="Company Name"
                  className="w-full outline-none"
                  required
                />
              </div>
            )}

            <div className="flex items-center border rounded-lg px-3 py-2 gap-2 mb-3">
              <img src={assets.email_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Email"
                className="w-full outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 gap-2 mb-4">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Password"
                className="w-full outline-none"
                required
              />
            </div>
          </>
        )}

        {/* Forgot Password */}
        {state === "login" && (
          <p className="text-sm text-blue-600 cursor-pointer hover:underline mb-4">
            Forgot Password?
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4"
        >
          {state === "login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {/* Toggle Login / Sign Up */}
        {state === "login" ? (
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default RecruiterLogin;

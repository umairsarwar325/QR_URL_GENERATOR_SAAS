import React, { useContext, useState } from "react";
import Confirmationimage from "../../assets/images/confirmimg.png";
import { QrCodeContext } from "../../store/Qr_Code_Generator_Store";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import axios from "axios";

const Logout = () => {
  const { showErrorModal, setShowErrorModal } = useContext(QrCodeContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/logout");
      if (response.data.logoutSuccess) {
        setLoading(false);
        navigate("/login");
      } else {
        setShowErrorModal({
          status: true,
          type: "error",
          message: response.data.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setShowErrorModal({
        status: true,
        type: "error",
        message: "Something went wrong. Plaese try again",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 pt-20">
      <div
        className={`bg-white p-8 rounded-lg shadow-xl flex items-center border-4 transition-all duration-300 transform "border-transparent"`}
        style={{ width: "90%", maxWidth: "700px", height: "400px" }}
      >
        <img
          src={Confirmationimage}
          alt="Logout Confirmation"
          className="w-1/2 h-auto object-contain mr-6"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-[#FF6F00] mb-4 text-center">
            Logout Confirmation
          </h2>
          <p className="text-gray-700 mb-6 text-center text-lg">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={handleLogout}
              className="bg-[#FF6F00] text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 shadow-md transform hover:scale-105"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
      {showErrorModal.status && <ErrorModal />}
    </div>
  );
};

export default Logout;

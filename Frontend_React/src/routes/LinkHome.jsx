import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { QrCodeContext } from "../store/Qr_Code_Generator_Store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "./login&signup_pages/ErrorModal";

const LinkHome = () => {
  const [shortLink, setShortLink] = useState("");
  const [showShortLink, setShowShortLink] = useState(false);
  const { longUrlS, setLongUrlS, setShowErrorModal, showErrorModal } =
    useContext(QrCodeContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setLongUrlS(data.longUrl);
      const response = await axios.post(
        "http://localhost:3000/api/shlink/shorten",
        data
      );
      if (response.data.authFailure) {
        setShowErrorModal({
          status: true,
          type: "error",
          message: response.data.message,
        });
        setLoading(false);
        navigate("/login");
      }
      if (response.data.urlSuccess) {
        setShortLink(response.data.shortUrl);
        setShowShortLink(true);
        setLoading(false);
      } else {
        setShowErrorModal({
          status: true,
          type: "error",
          message: response.data.message,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating QR code:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md">
      {/* Create New Section */}
      <h2 className="text-2xl font-bold mb-4">Create new</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="link" className="text-gray-700 font-semibold mb-2">
            Your link
          </label>
          <input
            {...register("longUrl", {
              required: { value: true, message: "Link field is required" },
            })}
            defaultValue={longUrlS}
            type="text"
            id="link"
            placeholder="https://example.com/myurl"
            className={`border rounded-lg w-full py-2 px-3 ${
              errors.longUrl
                ? "border-red-500 bg-red-100 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          {errors.text && <p className="text-red-500">{errors.text.message}</p>}
        </div>
        {/* Title input */}
        <div>
          <label htmlFor="title" className="text-gray-700 font-semibold mb-2">
            Title (optional)
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="link name"
            className={`border rounded-lg w-full py-2 px-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="text-orange-500 font-bold hover:underline"
            onClick={() => {
              setLink("");
              setTitle("");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 flex items-center mt-2"
            type="submit"
          >
            {loading ? "Creating short link..." : "Create your short link"}
            <span className="ml-2">&rarr;</span>
          </button>
        </div>

        {/* Show this section only after short link is generated */}
        {showShortLink && (
          <>
            {/* Generated short link */}

            <label
              htmlFor="shortLink"
              className="text-gray-700 font-semibold mb-2 mt-4"
            >
              Generated short link
            </label>
            <input
              type="text"
              id="shortLink"
              value={shortLink}
              readOnly
              className="form-control block w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100"
            />

            {/* QR code option */}
            <div className="flex items-center mb-4">
              {/* <label
                htmlFor="qrEnabled"
                className="ml-2 text-gray-700 font-semibold"
              > */}
              <Link
                to={"/home/qr"}
                className="flex items-center bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              >
                Generate a QR code to share anywhere
              </Link>

              {/* </label> */}
            </div>

            {/* Back and Share buttons */}
            <div className="flex justify-between items-center mt-4">
              <button className="flex items-center text-orange-500 hover:underline">
                {" "}
                &larr; Back{" "}
              </button>
              <button className="flex items-center bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                {" "}
                Share
                <span className="ml-2">&#x1F4E4;</span>
              </button>
            </div>
          </>
        )}
      </form>
      {showErrorModal.status && <ErrorModal />}
    </div>
  );
};

export default LinkHome;

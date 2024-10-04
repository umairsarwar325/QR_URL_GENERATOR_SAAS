import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import signupImage from "../../assets/images/register.png";
import ErrorModal from "./ErrorModal";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    // Simulated logic to check if the user is already registered
    const existingUser = fakeApiCheckForExistingUser("test@example.com"); 
    if (existingUser) {
      setIsModalOpen(true); 
    }
  }, []); 

  const onSubmit = (data) => {
    // Add your signup logic here with 'data.name', 'data.email', and 'data.password'
    console.log(data);
  };

  // Simulated API check for existing user
  const fakeApiCheckForExistingUser = (email) => {
    // Simulate a registered email
    const registeredEmails = ["test@example.com", "user@example.com"];
    return registeredEmails.includes(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00172E]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="w-69 h-69 rounded-lg" 
          />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-[#FF6F00] mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
                className={`w-full h-12 p-4 rounded border ${
                  errors.name
                    ? "border-red-500 bg-red-100 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-[#FF6F00] focus:border-[#FF6F00]"
                }`}
                style={{ backgroundColor: "#F9F9F9" }}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                className={`w-full h-12 p-4 rounded border ${
                  errors.email
                    ? "border-red-500 bg-red-100 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-[#FF6F00] focus:border-[#FF6F00]"
                }`}
                style={{ backgroundColor: "#F9F9F9" }}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full h-12 p-4 rounded border ${
                  errors.password
                    ? "border-red-500 bg-red-100 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-[#FF6F00] focus:border-[#FF6F00]"
                }`}
                style={{ backgroundColor: "#F9F9F9" }}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF6F00] text-white py-3 rounded-md hover:bg-orange-700 transition duration-300"
            >
              Sign Up
            </button>

          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#FF6F00] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {isModalOpen && (
        <ErrorModal
          message="This email is already registered. Please try a different one."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>

  );
};

export default SignUp;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  onAuthStateChanged,
  reload,
  signOut,
} from "firebase/auth";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState("");
  const [showResendButton, setShowResendButton] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Send email verification link
      await sendEmailVerification(userCredential.user);

      setVerificationMessage("Verification email sent. Please check your email and click on the verification link.");
      setShowResendButton(true);

      // Automatically refresh user state periodically
      const id = setInterval(async () => {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(id);
          navigate("/");
        }
      }, 1000);

      setIntervalId(id);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleResendVerification = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await sendEmailVerification(user);
      setVerificationMessage("New verification email sent. Please check your email and click on the verification link.");
    } catch (error) {
      console.error("Failed to send the verification email:", error);
    }
  };

  useEffect(() => {
    return () => {
      // Clear the interval when the component unmounts
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Create a password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
          {/* {showResendButton && (
            <button
              type="button"
              onClick={handleResendVerification}
              className="w-full mt-2 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
            >
              Resend Verification Link
            </button>
          )} */}
        </form>
        <p>{verificationMessage}</p>
        <span className="block text-center mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;

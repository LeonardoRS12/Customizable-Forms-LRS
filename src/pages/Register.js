import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      navigate("/login-signup");
    } catch (err) {
      console.error("Registration Error:", err.message);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container register-container animate-fade-in">
      <h2>Register</h2>
      {loading ? (
        <div className="spinner-border text-primary animate-fade-in" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control focus-effect"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control focus-effect"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle btn btn-outline-secondary hover-effect"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label>Confirm Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control focus-effect"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger error-message animate-slide-in">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
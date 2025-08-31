import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Spinner from "../../UiComponents/Spinner/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";

const Login = () => {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);
    const result = await loginUser(form);
    setIsLoading(false);

    if (result.success) {
      const redirectPath = location.state?.from?.pathname || "/profile";
      navigate(redirectPath, { replace: true });
    } else {
      if (result.needsVerification) {
        navigate("/verify-otp", { state: { email: result.email } });
      } else {
        setError(result.message || "Invalid credentials");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-slide">
        <h2 className="auth-title">Welcome Back</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="allItems-btn w-100" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
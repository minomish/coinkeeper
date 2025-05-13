import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

import "./RegisterPage.css";

const Register = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authStatus = Cookies.get('authStatus');
    setIsLoggingIn(authStatus === 'login');
  }, []);

  const toggleAuthMode = () => {
    setIsLoggingIn(prev => !prev);
    setError('');
  };

  const handleAuthAction = async () => {
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      const { data: users } = await axios.get("http://localhost:3001/users");

      if (isLoggingIn) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          Cookies.set('authStatus', 'login');
          Cookies.set('userEmail', user.email);
          Cookies.set('userId', user.id);

          // ✅ Обновляем Redux
          dispatch(login({
            id: user.id,
            email: user.email,
            balance: user.balance || 0
          }));

          navigate("/dashboard");
        } else {
          setError('Invalid email or password');
        }
      } else {
        const userExists = users.some(u => u.email === email);
        if (userExists) {
          setError('User already registered');
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const newUser = {
          email,
          password,
          balance: 0
        };

        const response = await axios.post("http://localhost:3001/users", newUser);

        Cookies.set('authStatus', 'login');
        Cookies.set('userEmail', response.data.email);
        Cookies.set('userId', response.data.id);

        // ✅ Обновляем Redux
        dispatch(login({
          id: response.data.id,
          email: response.data.email,
          balance: 0
        }));

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error during auth:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth">
      <h2 style={{ color: "white" }}>{isLoggingIn ? "Sign In" : "Register"}</h2>

      <div className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input_auth"
        />

        <input
          type="password"
          placeholder={isLoggingIn ? "Password" : "Enter password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input_auth"
        />

        {!isLoggingIn && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="input_auth"
          />
        )}

        <button onClick={handleAuthAction}>
          {isLoggingIn ? "Sign In" : "Register"}
        </button>

        {error && <p className="error">{error}</p>}

        <div>
          {isLoggingIn ? (
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={toggleAuthMode}>
                Register
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a href="#" onClick={toggleAuthMode}>
                Sign In
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

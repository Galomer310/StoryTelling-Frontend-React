import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const response = await fetch(
        "https://storytellingapp-backend-react.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Login failed");
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Store access token and update state
      localStorage.setItem("accessToken", data.accessToken);
      setIsLoggedIn(true);

      // Redirect to the user page after successful login
      navigate("/user");
    } catch (error) {
      alert("Error during login: " + (error as Error).message);
    }
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <button onClick={() => navigate("/user")}>Go to User Page</button>
        </div>
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Login;

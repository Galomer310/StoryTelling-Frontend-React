import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Registration failed");
        return;
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      alert("Error during registration: " + (error as Error).message);
    }
  };

  return (
    <div className="register-container">
      <p>Create an account to join the community!</p>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Register;

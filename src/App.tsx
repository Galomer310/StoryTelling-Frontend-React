import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserPage from "./pages/UserPage";
import CreateStory from "./pages/CreateStory";
import EditStory from "./pages/EditStory";
import "./style.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/create-story" element={<CreateStory />} />{" "}
        <Route path="/edit-story/:storyId" element={<EditStory />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;

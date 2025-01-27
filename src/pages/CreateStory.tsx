import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Story } from "../../types/types";

const CreateStory = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [story, setStory] = useState<Story | null>(null); // This will hold the created story data
  const navigate = useNavigate();

  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStory = { title, content };

    try {
      const response = await fetch(
        "https://storytellingapp-backend-react.onrender.com/api/stories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(newStory),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create story");
      }

      const data = await response.json();
      console.log("Story created successfully:", data);

      // Store the created story in the state
      setStory(data);
      navigate("/user");
    } catch (error) {
      console.error("Error during story creation:", error);
    }
  };

  return (
    <div className="create-story">
      <h2>Create New Story</h2>
      <form onSubmit={handleCreateStory}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Story</button>
      </form>

      {story && (
        <div>
          <h3>Story Created:</h3>
          <p>Title: {story.title}</p>
          <p>Content: {story.content}</p>
        </div>
      )}
      <button onClick={() => navigate("/user")}>Go to User Page</button>
    </div>
  );
};

export default CreateStory;

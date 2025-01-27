import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Story } from "../../types/types"; // Import the Story interface

const EditStory = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stories/${storyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error || "Failed to fetch story");
          return;
        }

        const data = await response.json();
        setStory(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        alert("Error fetching story: " + (error as Error).message);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/stories/${storyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update story");
        return;
      }

      navigate("/user"); // Navigate back to the user page
    } catch (error) {
      alert("Error saving changes: " + (error as Error).message);
    }
  };

  // Handle deleting the story
  const handleDeleteStory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/stories/${storyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete story");
        return;
      }

      navigate("/user"); // Navigate back to the user page after successful deletion
    } catch (error) {
      alert("Error deleting story: " + (error as Error).message);
    }
  };

  return (
    <div className="edit-story-container">
      <h2>Edit Story</h2>
      {story ? (
        <form onSubmit={handleSaveChanges}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Loading story...</p>
      )}
      <button className="delete-btn" onClick={handleDeleteStory}>
        Delete Story
      </button>
      <button onClick={() => navigate("/user")}>Go to User Page</button>
    </div>
  );
};

export default EditStory;
